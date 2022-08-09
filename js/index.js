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
                <p id="skill-duration-label">${skills[i].duration}</p>
            </div>
        `;
    };

    element = document.getElementById("skills");
    element.innerHTML = `
        ${skillObjs}   
    `;     
}

// Gets the skills i have inputted into the json file
let aboutme = fetch('./templates/aboutme.json')   
    .then(response => response.json())
    .then(json => parseAboutInfo(json));

// Parse the skills information into JS
async function parseAboutInfo(json){
    let about = json.AboutMe;
    let aboutObjs = "";

    for(let i = 0; i < about.length; i++){
        aboutObjs += `
            <div id="margin-slot">                
                <p id="aboutme-text">${about[i]}</p>
            </div>
        `;
    };

    let extraInfo = json.AboutMeTwo;
    let extraInfoObjs = "";

    for(let i = 0; i < extraInfo.length; i++){
        extraInfoObjs += `  
            <div id="margin-slot">   
                <p id="aboutme-text">${extraInfo[i]}</p>            
            </div>
        `;
    };

    element = document.getElementById("aboutme");
    element.innerHTML = `${aboutObjs}`;     

    element = document.getElementById("aboutmetwo");
    element.innerHTML = `${extraInfoObjs}`
}