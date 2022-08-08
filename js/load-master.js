// Gets all the data corrosponding to the master-page
let masterpage = fetch('./templates/masterpage.json')   
    .then(response => response.json())
    .then(json => parsePageInfo(json));


// generates a html main from json
function generateMain(data){
    element = document.getElementById("head");    
    element.innerHTML += `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href=${data.favicon}>
        <script src=${data.fontawesomekit} crossorigin="anonymous"></script>               
    `;

    element = document.getElementById("title");
    element.innerHTML = data.title + element.innerHTML;
}

// generates a html header from json
function generateHeader(data){
    // Gets the header ID from html files
    element = document.getElementById("header");    
    element.innerHTML = `
        <link rel="stylesheet" href="/css/header.css">
        <style>
            img {
            border-radius: 8px;
            }        
        </style>
    `;
    // Iterates through each page and appends it onto the html element
    let buttons = "";
    for(let i = 0; i < data.sitepages.length; i++){
        buttons += `
            <li class="navbar-btn">
                <a href=${data.sitepages[i].redirect} class="button">${data.sitepages[i].pagename}</a>
            </li>
        `;
    };

    // Initialises the main part of the header    
    element.innerHTML += `
        <nav class="navbar">
            <div class="navbar-container">
                <span class="navbar-siteidentity">
                    <a href="/" id="navbar-logo"><img src = ${data.siteicon} alt="Home Page" width=60" height="60"></a>
                    <div class="navbar-siteidentity-text">
                        <a class="navbar-siteidentity-title" href="/">${data.sitetitle}</a>
                        <p class="navbar-siteidentity-description">${data.sitebrief}</p>
                    </div>                
                </span>            
                    
                <div class="navbar-toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <ul class="navbar-menu">
                ${buttons}
                </ul>
            </div>
        <nav> 
    `;      
}

// generates a html footer from json
function generateFooter(data){   
    // Gets the header ID from html files
    element = document.getElementById("footer");    
    element.innerHTML = `
        <link rel="stylesheet" href="/css/footer.css">
        <div id="site-footer">
            <hr>
            <p id="footer-text">${data.text}</p>
        </div>
    `;
}

// Parse the header information into JS
async function parsePageInfo(json){
    generateMain(json.Main);
    generateHeader(json.Header);    
    generateFooter(json.Footer);
}