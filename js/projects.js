// Gets the projects i have inputted into the json file
let projects = fetch('./templates/projects.json')   
    .then(response => response.json())
    .then(json => parseProjectsInfo(json));

// Parse the projects information into JS
async function parseProjectsInfo(json){
    let projects = json.Projects;    
    let projectObjs = "";
    
    for(let i = 0; i < projects.length; i++){
        let tags = `
            <p class="tag" id="tag-project-engine">${projects[i].tags.engine}</p>
            <p class="tag" id="tag-project-language">${projects[i].tags.language}</p>
            <p class="tag" id="tag-project-madeat">${projects[i].tags.madeat}</p>
        `;

        projectObjs += `
        <div id="projects-content">
        <a href= ${projects[i].page}>
            <div id="projects-card">
                <div id="projects-img">
                    <img src=${projects[i].icon}>
                </div>
                <div id="projects-title">${projects[i].name}</div>
                <div id="projects-description">${projects[i].description}</div>                     
            </div>
            
        </a>
        <div id="tags">${tags}</div>
        </div>
        `;
    }
    
    element = document.getElementById("main-content-projects");
    element.innerHTML += `
        <div id="projects-container-grid">
            ${projectObjs}
        </div>          
    `;     
}