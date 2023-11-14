fetch('/json/aboutme.json')
    .then(response => response.json())
    .then(json => generateProfiles(json));

function generateProfiles(jsonData){
    const profileInfo = document.querySelectorAll('.profile-info-text');
    profileInfo.forEach(info => {
        jsonData[info.id].forEach(index => { info.innerHTML += `<p>${index}</p>`});
    });

    const socials = document.querySelector('.socials');
    jsonData["socials"].social_data.forEach(index => {
        socials.innerHTML += `<a href="${index.url}" target="_blank" rel="noopener noreferrer" class="social-icon"><img src = ${jsonData["socials"].icons+index.icon} alt="${index.name}"></a>`
    });
}