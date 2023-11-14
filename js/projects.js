// Load required json files
let projectJsonData = ['/json/projects.json', '/json/skills.json'];
Promise.all(projectJsonData.map(url => fetch(url).then(response => response.json())))
.then(jsons => generateProjects(jsons))
.catch(error => console.error('Error:', error));
// --

function generateProjects(jsonData){
    const container = document.querySelector('.project-container');
    const projectsData = jsonData[0];
    const projects = projectsData.projects

    const skillsData = jsonData[1];
    const skills = skillsData.skills;

    let containerHTML = ``;
    projects.forEach(project => {
        if(!project.is_visible){ return; }
        let icons = ``;
        project.skills.forEach(skill => {
            icons += `<div class="card-skill"><img src="${skillsData.icons + skills[skill].icon}" draggable="false"></div>`
        });
        
        containerHTML += `
            <li class="card">
                <a href="${projectsData.pages + project.page}" class="card-image">
                    <img src="${projectsData.icons + project.icon}" draggable="false">
                    <h2 class="card-title">${project.name}</h2>
                    <div class="card-video">
                        <video autoplay muted loop>
                            <source src="${projectsData.videos + project.video}" type="video/mp4">
                        </video>
                    </div>
                    <div class="card-brief"><p class="card-brief-text">${project.description}</p></div>
                </a>
                <span class="card-skills">${icons}</span>
            </li>
        `;
    });
    container.innerHTML = containerHTML;
}