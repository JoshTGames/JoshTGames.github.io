const carousel = document.querySelector('.carousel-content')

// POPULATE CAROUSEL WITH DATA
let carouselJsonData = ['/json/projects.json', '/json/skills.json'];
Promise.all(carouselJsonData.map(url => fetch(url).then(response => response.json())))
.then(jsons => generateCarousel(jsons))
.catch(error => console.error('Error:', error));
// --

function generateCarousel(json){
    let projectsJson = json[0];
    let projects = projectsJson.projects;

    let skillsJson = json[1];
    let skills = skillsJson.skills;
    projects.forEach(projectData => {
        if(!projectData.is_visible){ return; }
        let icons = ``;
        projectData.skills.forEach(skill => {
            icons += `<div class="card-skill-img"><img src="${skillsJson.icons + skills[skill].icon}" draggable="false"></div>`
        });

        carousel.innerHTML += `
        <li class="carousel-card">
            <a href="${projectsJson.pages + projectData.page}" class="carousel-card-image">
                <img src="${projectsJson.icons + projectData.icon}" draggable="false">
                <h2 class="carousel-card-title">${projectData.name}</h2>
                <div class="carousel-card-video">
                    <video autoplay muted loop>
                        <source src="${projectsJson.videos + projectData.video}" type="video/mp4">
                    </video>
                </div>
                <div class="carousel-card-brief"><p class="carousel-card-brief-text">${projectData.description}</p></div>
            </a>
            <span class="carousel-card-skills">${icons}</span>
        </li>
        `;
    });
    // BEHAVIOUR MANAGEMENT
    const carouselBtns = document.querySelectorAll('.carousel-button')
    cardWidth = carousel.parentElement.querySelector('.carousel-card').offsetWidth;
    // Infinite scrolling
    const cards = [...carousel.children];
    let cardsPerView = Math.round(carousel.offsetWidth / cardWidth);
    // Adds copies of the list to the start of the list when moving backwards
    cards.slice(-cardsPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    // Adds copies to the end of the list when moving forwards
    cards.slice(0, cardsPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });


    carouselBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carousel.scrollLeft += (btn.id == "left")? -cardWidth : cardWidth;
        });
    });
}

let timeout;
var cardWidth;
let isDragging = false;
let startHorizontal, startScrollLeft;
// Checks to see if mouse is down on the carousel, if it is then enable drag
const setDragging = (e) =>{ 
    isDragging = (e.type == "mousedown")? true: false; 
    if(!isDragging){
        carousel.classList.remove("dragging");
        return;
    }
   
    carousel.classList.add("dragging"); 
    // Records concurrent position
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

// Moves the carousel based on mouse position
const dragging = (e) =>{
    if(!isDragging){ return; } // If mouse is not down
    carousel.scrollLeft = startScrollLeft -  (e.pageX - startX);
}

const infiniteScroll = () => {
    // If at beginning, scroll to end
    if(Math.round(carousel.scrollLeft) <= 0){
        carousel.classList.add('no-smooth');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-smooth');
    }
    // If at end, scroll to beginning
    else if(Math.round(carousel.scrollLeft) >= Math.ceil(carousel.scrollWidth - carousel.offsetWidth)){
        carousel.classList.add('no-smooth');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-smooth');
    }

    // Rid of concurrent timer and set a new if cursor isn't above carousel
    clearTimeout(timeout);
    if(!carousel.parentElement.matches(":hover")){ autoPlay(); }
}

const autoPlay = () => {
    if(window.innerWidth < 800){ return; } // Stops autoplay on mobile devices
    timeout = setTimeout(() => carousel.scrollLeft += cardWidth, 5000); // Go up the list every x ms
}
autoPlay();

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mousedown', setDragging);
carousel.addEventListener('scroll', infiniteScroll);
document.addEventListener('mouseup', setDragging);
carousel.parentElement.addEventListener("mouseenter", () => clearTimeout(timeout));
carousel.parentElement.addEventListener("mouseleave", autoPlay);