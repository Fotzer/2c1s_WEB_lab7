function animation() {
    const areaHeight = document.getElementById("anim").offsetHeight;
    
    const areaWidth = document.getElementById("anim").offsetWidth;
    const orangeBall = {y:areaHeight-25,x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth))};
    const blueBall = {y:5,x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth))};
    
    const orangeBallElement = document.getElementById("orange-ball");
    const blueBallElement = document.getElementById("blue-ball");

    console.log(orangeBall.y);
    console.log(blueBall.y);
    orangeBallElement.style.bottom = orangeBall.y + "px";
    orangeBallElement.style.left = orangeBall.x + "px";
    
    blueBallElement.style.bottom = blueBall.y + "px";
    blueBallElement.style.left = blueBall.x + "px";
}

function toggleWorkShow() {
    const window = document.getElementById("work");
    window.classList.toggle("hidden")
    animation();
}

document.getElementById("show-window-button").onclick = toggleWorkShow;
document.getElementById("controls-close-button").onclick = toggleWorkShow;