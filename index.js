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


async function animation() {
    const orangeBallElement = document.getElementById("orange-ball");
    const blueBallElement = document.getElementById("blue-ball");

    while(true) {
        await sleep(10);

        let areaHeight = document.getElementById("anim").offsetHeight;
        let areaWidth = document.getElementById("anim").offsetWidth;

        if(orangeBall.y > areaHeight/2 && blueBall.y > areaHeight/2 || orangeBall.y+20 < areaHeight/2 && blueBall.y+20 < areaHeight/2) {
            break;
        }

        const distanceBetweenBalls = Math.sqrt(((orangeBall.y)-(blueBall.y))**2 + ((orangeBall.x)-(blueBall.x))**2);
        if(distanceBetweenBalls <= 20) {
            orangeBall.ySpeed = -orangeBall.ySpeed;
            orangeBall.xSpeed = -orangeBall.xSpeed;

            blueBall.ySpeed = -blueBall.ySpeed;
            blueBall.xSpeed = -blueBall.xSpeed;
        }

        orangeBall.ySpeed = 5 > orangeBall.y || orangeBall.y > areaHeight-25 ? -orangeBall.ySpeed : orangeBall.ySpeed;
        orangeBall.y = Math.max(5, Math.min(areaHeight-25, orangeBall.y));
        orangeBall.y += orangeBall.ySpeed;

        orangeBall.xSpeed = 5 > orangeBall.x || orangeBall.x > areaWidth-25 ? -orangeBall.xSpeed : orangeBall.xSpeed;
        orangeBall.x = Math.max(5, Math.min(areaWidth-25, orangeBall.x));
        orangeBall.x += orangeBall.xSpeed;

        blueBall.ySpeed = 5 > blueBall.y || blueBall.y > areaHeight-25 ? -blueBall.ySpeed : blueBall.ySpeed;
        blueBall.y = Math.max(5, Math.min(areaHeight-25, blueBall.y));
        blueBall.y += blueBall.ySpeed;

        blueBall.xSpeed = 5 > blueBall.x || blueBall.x > areaWidth-25 ? -blueBall.xSpeed : blueBall.xSpeed;
        blueBall.x = Math.max(5, Math.min(areaWidth-25, blueBall.x));
        blueBall.x += blueBall.xSpeed;

        orangeBallElement.style.bottom = orangeBall.y + "px";
        orangeBallElement.style.left = orangeBall.x + "px";
        
        blueBallElement.style.bottom = blueBall.y + "px";
        blueBallElement.style.left = blueBall.x + "px";
    }
}

document.getElementById("controls-start-button").onclick = animation;

function toggleWorkShow() {
    const window = document.getElementById("work");
    window.classList.toggle("hidden")
}

document.getElementById("show-window-button").addEventListener("click", toggleWorkShow);
document.getElementById("show-window-button").addEventListener("click", randomBallsPosition);

document.getElementById("controls-close-button").onclick = toggleWorkShow;