// Creates unity instance inside the page
async function createUnityInstance(){
    element = document.getElementById("unity-container");
    element.innerHTML += `
        <div id="unity-warning"></div>
        <canvas id="unity-canvas" width=854 height=480></canvas>
        <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
        </div>
        </div>       
    `;     
}
createUnityInstance();