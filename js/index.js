// Gets all the data corrosponding to the master-page
let skills = fetch('./templates/skills.json')   
    .then(response => response.json())
    .then(json => parseSkillsInfo(json));


// Parse the skills information into JS
async function parseSkillsInfo(json){
    let skills = json.Skills;
    let skillObjs = "";

    for(let i = 0; i < skills.length; i++){
        skillObjs += `
            <div id="skill-slot">
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