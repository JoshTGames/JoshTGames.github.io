// Gets the skills i have inputted into the json file
let skills = fetch('./templates/skills.json')   
    .then(response => response.json())
    .then(json => parseSkillsInfo(json));

// Parse the skills information into JS
async function parseSkillsInfo(json){
    let skills = json.Skills;
    let skillObjs = "";

    for(let i = 0; i < skills.length; i++){
        skillObjs += `
            <div id="margin-slot">
                <img src=${skills[i].icon} alt=${skills[i].technology} width="80" height="80">
                <p id="skill-label">${skills[i].technology}</p>
                <p id="skill-duration-label">${skills[i].duration}</p>
            </div>
        `;
    };

    element = document.getElementById("skills");
    element.innerHTML = `
        ${skillObjs}   
    `;     
}

// Gets the aboutme text i have inputted into the json file
let aboutme = fetch('./templates/aboutme.json')   
    .then(response => response.json())
    .then(json => parseAboutInfo(json));

function calculateAge(date){
    let age = new Date(Date.now()).getUTCFullYear() - new Date(date.getTime()).getUTCFullYear();
    return age    
}

// Parse the about me text into JS
async function parseAboutInfo(json){
    let about = json.AboutMe;
    let aboutObjs = "";    

    let dob = json.Settings.DOB;
    let age = calculateAge(new Date(dob.Year, dob.Month, dob.Day))
    
    for(let i = 0; i < about.length; i++){
        let msgArray = about[i].split(" ");
        let ageIndex = msgArray.indexOf("${age}");
        if(ageIndex >0){
            msgArray[ageIndex] = age;
            about[i] = msgArray.join(" ");
        }

        aboutObjs += `
            <div id="margin-slot">  
                <div id ="text">              
                <p id="aboutme-text">${about[i]}</p>
                </div>
            </div>
        `;
    };

    let extraInfo = json.AboutMeTwo;
    let extraInfoObjs = "";

    for(let i = 0; i < extraInfo.length; i++){
        extraInfoObjs += `  
            <div id="margin-slot">   
                <div id ="text">   
                    <p id="aboutme-text">${extraInfo[i]}</p>            
                </div>
            </div>
        `;
    };

    element = document.getElementById("aboutme");
    element.innerHTML = `${aboutObjs}`;     

    element = document.getElementById("aboutmetwo");
    element.innerHTML = `${extraInfoObjs}`
}

// Gets the projects i have inputted into the json file
let projects = fetch('./templates/projects.json')   
    .then(response => response.json())
    .then(json => parseProjectsInfo(json));

// Parse the projects information into JS
async function parseProjectsInfo(json){
    let projects = json.Projects;    
    let projectObjs = "";
    
    for(let i = 0; i < projects.length; i++){
        if(!projects[i].ishighlighted){ continue; }
        
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
    
    element = document.getElementById("main-content-highlights");
    element.innerHTML += `
        <div id="projects-container">
            ${projectObjs}
        </div>          
    `;     
}