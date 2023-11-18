const sleep = ms => new Promise(r => setTimeout(r, ms));


let orangeBall = {};


let blueBall = {};


function randomBallsPosition() {
    let areaHeight = document.getElementById("anim").offsetHeight;
    let areaWidth = document.getElementById("anim").offsetWidth;
    
    orangeBallYSpeed = -Math.max(0.1, Math.random());
    orangeBall = {y:areaHeight-25,
        x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth)),
        ySpeed: orangeBallYSpeed,
        xSpeed: (Math.round(Math.random()) * 2 - 1) * (1 - orangeBallYSpeed**2)
    };
    
    blueBallYSpeed = Math.max(0.1, Math.random());
    blueBall = {y:5,
        x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth)),
        ySpeed: blueBallYSpeed,
        xSpeed: (Math.round(Math.random()) * 2 - 1) * (1 - blueBallYSpeed**2)
    };
    
    const orangeBallElement = document.getElementById("orange-ball");
    const blueBallElement = document.getElementById("blue-ball");

    orangeBallElement.style.bottom = orangeBall.y + "px";
    orangeBallElement.style.left = orangeBall.x + "px";
    
    blueBallElement.style.bottom = blueBall.y + "px";
    blueBallElement.style.left = blueBall.x + "px";
}

function showReload() {
    document.getElementById("controls-reload-button").classList.remove("hidden");
    document.getElementById("controls-start-button").classList.add("hidden");
}

async function animation() {
    const orangeBallElement = document.getElementById("orange-ball");
    const blueBallElement = document.getElementById("blue-ball");

    while(true) {
        await sleep(10);

        let areaHeight = document.getElementById("anim").offsetHeight;
        let areaWidth = document.getElementById("anim").offsetWidth;

        if(orangeBall.y > areaHeight/2 && blueBall.y > areaHeight/2 || orangeBall.y+20 < areaHeight/2 && blueBall.y+20 < areaHeight/2) {
            showReload();
            if(orangeBall.y > areaHeight/2 && blueBall.y > areaHeight/2) {
                window.dispatchEvent(new CustomEvent("balls-in-upper-half"));
            }
            if(orangeBall.y+20 < areaHeight/2 && blueBall.y+20 < areaHeight/2) {
                window.dispatchEvent(new CustomEvent("balls-in-lower-half"));
            }
            break;
        }

        const distanceBetweenBalls = Math.sqrt(((orangeBall.y)-(blueBall.y))**2 + ((orangeBall.x)-(blueBall.x))**2);
        if(distanceBetweenBalls <= 20) {
            orangeBall.ySpeed = -orangeBall.ySpeed;
            orangeBall.xSpeed = -orangeBall.xSpeed;

            blueBall.ySpeed = -blueBall.ySpeed;
            blueBall.xSpeed = -blueBall.xSpeed;

            window.dispatchEvent(new CustomEvent("balls-collision"));
        }

        orangeBall.ySpeed = 5 > orangeBall.y || orangeBall.y > areaHeight-25 ? -orangeBall.ySpeed : orangeBall.ySpeed;
        orangeBall.y = Math.max(5, Math.min(areaHeight-25, orangeBall.y));
        orangeBall.y += orangeBall.ySpeed;

        orangeBall.xSpeed = 5 > orangeBall.x || orangeBall.x > areaWidth-25 ? -orangeBall.xSpeed : orangeBall.xSpeed;
        orangeBall.x = Math.max(5, Math.min(areaWidth-25, orangeBall.x));
        orangeBall.x += orangeBall.xSpeed;

        window.dispatchEvent(new CustomEvent("orange-ball-move"));

        blueBall.ySpeed = 5 > blueBall.y || blueBall.y > areaHeight-25 ? -blueBall.ySpeed : blueBall.ySpeed;
        blueBall.y = Math.max(5, Math.min(areaHeight-25, blueBall.y));
        blueBall.y += blueBall.ySpeed;

        blueBall.xSpeed = 5 > blueBall.x || blueBall.x > areaWidth-25 ? -blueBall.xSpeed : blueBall.xSpeed;
        blueBall.x = Math.max(5, Math.min(areaWidth-25, blueBall.x));
        blueBall.x += blueBall.xSpeed;

        window.dispatchEvent(new CustomEvent("blue-ball-move"));

        orangeBallElement.style.bottom = orangeBall.y + "px";
        orangeBallElement.style.left = orangeBall.x + "px";
        
        blueBallElement.style.bottom = blueBall.y + "px";
        blueBallElement.style.left = blueBall.x + "px";
    }
}

function reload() {
    document.getElementById("controls-reload-button").classList.add("hidden");
    document.getElementById("controls-start-button").classList.remove("disabled");
    document.getElementById("controls-start-button").classList.remove("hidden");

    randomBallsPosition();

    window.dispatchEvent(new CustomEvent("reload-click"));
}

document.getElementById("controls-reload-button").onclick = reload;

document.getElementById("controls-start-button").addEventListener("click", animation);
document.getElementById("controls-start-button").addEventListener("click", () => {
    document.getElementById("controls-start-button").classList.add("disabled");
    window.dispatchEvent(new CustomEvent("start-click"));
});

function toggleWorkShow() {
    const window = document.getElementById("work");
    window.classList.toggle("hidden")
}

document.getElementById("show-window-button").addEventListener("click", toggleWorkShow);
document.getElementById("show-window-button").addEventListener("click", randomBallsPosition);
document.getElementById("show-window-button").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("play-click"));
});

document.getElementById("controls-close-button").addEventListener("click", toggleWorkShow);
document.getElementById("controls-close-button").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("close-click"));
});

async function sendEventOnServer(event, eventNum) {
    const formData = new FormData();
    formData.append("data", `${eventNum} ${event}`);
    const response = await fetch("/writeEvent.php", {method:"POST",
        body:formData
    });
    console.log(response);
}

async function writeEventToLocalStorage(event, eventNum) {
    const data = JSON.parse(localStorage.getItem("data"));
    data.data.push(eventNum, event, new Date().toLocaleTimeString());
    localStorage.setItem("data", JSON.stringify(data));
}

window.addEventListener("load", () => {
    const data = {data:[]};
    localStorage.setItem("data", JSON.stringify(data));
});

let eventNum = 1;
async function logEvent(event) {
    const type = event.type;
    sendEventOnServer(type, eventNum);
    writeEventToLocalStorage(type, eventNum);

    displayEvent(type, eventNum);

    eventNum++;
}

window.addEventListener("wall-collision", logEvent);
window.addEventListener("balls-collision", logEvent);
window.addEventListener("blue-ball-move", logEvent);
window.addEventListener("orange-ball-move", logEvent);
window.addEventListener("play-click", logEvent);
window.addEventListener("start-click", logEvent);
window.addEventListener("reload-click", logEvent);
window.addEventListener("close-click", logEvent);
window.addEventListener("balls-in-upper-half", logEvent);
window.addEventListener("balls-in-lower-half", logEvent);

function displayEvent(event, eventNum) {
    const eventDisplayer = document.getElementById("controls-event-display");
    eventDisplayer.innerText = `${eventNum} ${event}`
}