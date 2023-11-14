// Set page title
const pageTitle = document.querySelector('.title');
document.querySelector('.page-title').innerHTML = pageTitle.innerHTML;

// Load required json files
let projectJsonData = ['/json/projects.json', '/json/skills.json'];
Promise.all(projectJsonData.map(url => fetch(url).then(response => response.json())))
.then(jsons => generatePage(jsons))
.catch(error => console.error('Error:', error));
// --




function generatePage(json){
    const overviewContainer = document.querySelector('.page-icon');

    const projectData = json[0];
    const skillData = json[1];

    let containerHTML = ``;
    projectData.projects.forEach(project => {
        // Ensures that only the page with the correct code gets loaded
        if(project.short_hand_code != pageTitle.id){ return; }

        let icons = ``;
        project.skills.forEach(skill => {
            icons += `<div class="project-card-skill"><img src="${skillData.icons + skillData.skills[skill].icon}" draggable="false"></div>`
        });

        containerHTML += `
            <div class="project-card">
                <div class="project-card-image">
                    <img src="${projectData.icons + project.icon}" draggable="false">
                </div>
                <span class="project-card-skills">${icons}</span>
            </div>
        `;
    });
    overviewContainer.innerHTML = containerHTML;
}
