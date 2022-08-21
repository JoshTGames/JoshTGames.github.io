// Gets all the data corrosponding to the master-page
let masterpageLinks = fetch('/templates/masterpage.json')   
    .then(response => response.json())
    .then(json => parseFooterInfo(json));

async function parseFooterInfo(json){
    let data = json.Footer;

    let socialHeadings = [];
    let socialData = []
    for(let i = 0; i < data.sitesocials.length; i++){
        let socialType = data.sitesocials[i].socialtype
        if(socialHeadings.includes(socialType)){ continue; }        
        socialHeadings.push(socialType);
        socialData.push(`<h2 id="section-heading">${data.sitesocials[i].socialtype}</h2>`)
    }

    let buttons = "";
    for(let i = 0; i < data.sitesocials.length; i++){
        let section = socialHeadings.indexOf(data.sitesocials[i].socialtype);
        socialData[section] += `        
            <a href=${data.sitesocials[i].link} target="_blank" rel="noopener noreferrer" class="pagebutton">
                <img src = ${data.sitesocials[i].icon} alt=${data.sitesocials[i].type} width=32" height="32" class="socialimg">
                <p class="socialtypelabel">${data.sitesocials[i].type}</p>
            </a>
        `;
    };

    // Gets the header ID from html files
    element = document.getElementById("main-content-links");    
    element.innerHTML += `                
        <div id="site-links">            
            ${socialData.join(" ")}            
        </div>
    `;
}