// Load required json files
let jsonURLs = ['/json/master.json', '/json/projects.json', '/json/skills.json'];
Promise.all(jsonURLs.map(url => fetch(url).then(response => response.json())))
.then(jsons => generateMain(jsons))
.catch(error => console.error('Error:', error));
// --

function generateMain(data){
    // Generate Tab Info
    element = document.getElementById("head");    
    element.innerHTML += `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href=${data[0].favicon}">                  
    `;

    element = document.querySelector(".title");
    element.innerHTML = data[0].title + " || " + element.innerHTML;
    // ---

    // Iterate through each project, collecting all the skills that have been used to make the projects
    let skills = [];
    for(let i = 0; i < data[1].projects.length; i++){
        if(!data[1].projects[i].is_visible){ continue; }
        for(let x = 0; x < data[1].projects[i].skills.length; x++){
            if(skills.includes(data[1].projects[i].skills[x])){ continue; }
            skills.push(data[1].projects[i].skills[x]);
        }
    }

    // Iterate through each skill and give it an image
    let skillImages = ``;
    for(let i = 0; i < skills.length; i++){
        let skillType = skills[i];
        skillType = skillType.charAt(0).toUpperCase() + skillType.slice(1);
        skillImages += `
            <div class="skill-obj">
                <img src=${data[2].icons + data[2].skills[skills[i]].icon} class="skill-img" alt="${skills[i]}" width=40px height=40px>
                <div class="skill-text">
                    <p class="skill-type">${skillType}</p>
                    <p class="skill-duration">${data[2].skills[skills[i]].duration}+ Years</p>
                </div>
            </div>
        `;
    }
    
    // Generate Header
    element = document.getElementById("header");
    element.innerHTML += `
        <div class="page-section">
            <span id="header-section">
                <video id="header-video" autoplay muted loop>
                    <source src="/content\\videos\\${data[0].banner_video_name}" type="video/mp4">
                </video>
                <a href="/" id="site-logo"><img src = ${data[0].site_icon} alt="Home" draggable="false"></a>
                <div id="header-splitter">
                    <a href="/" id="site-identity">
                        <h1 id="site-title-label" class="site-title">${data[0].site_title}</h1>
                        <h2 id="site-title-type" class="site-title">${data[0].site_type}</h2>
                    </a>
                    <hr id="header-line">
                    <span id="header-skills-list">${skillImages}</span>
                </div>
            </span>
        </div>
    `;
}