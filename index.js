const sleep = ms => new Promise(r => setTimeout(r, ms));

async function animation() {
    const areaHeight = document.getElementById("anim").offsetHeight;
    const areaWidth = document.getElementById("anim").offsetWidth;
    
    let orangeBallYSpeed = -Math.max(0.1, Math.random());
    const orangeBall = {y:areaHeight-25,
        x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth)),
        ySpeed: orangeBallYSpeed,
        xSpeed: (Math.round(Math.random()) * 2 - 1) * (1 - orangeBallYSpeed**2)
    };
    
    let blueBallYSpeed = Math.max(0.1, Math.random());
    const blueBall = {y:5,
        x:Math.max(5, Math.min(areaWidth-25, Math.random()*areaWidth)),
        ySpeed: blueBallYSpeed,
        xSpeed: (Math.round(Math.random()) * 2 - 1) * (1 - blueBallYSpeed**2)
    };
    
    const orangeBallElement = document.getElementById("orange-ball");
    const blueBallElement = document.getElementById("blue-ball");

    console.log(orangeBall.y);
    console.log(blueBall.y);
    orangeBallElement.style.bottom = orangeBall.y + "px";
    orangeBallElement.style.left = orangeBall.x + "px";
    
    blueBallElement.style.bottom = blueBall.y + "px";
    blueBallElement.style.left = blueBall.x + "px";

    while(true) {
        await sleep(10);

        if(orangeBall.y > areaHeight/2 && blueBall.y > areaHeight/2 || orangeBall.y < areaHeight/2 && blueBall.y < areaHeight/2) {
            break;
        }

        const distanceBetweenBalls = Math.sqrt(((orangeBall.y-10)-(blueBall.y-10))**2 + ((orangeBall.x+10)-(blueBall.x+10))**2);
        if(distanceBetweenBalls <= 20) {
            orangeBall.ySpeed = -orangeBall.ySpeed;
            orangeBall.xSpeed = -orangeBall.xSpeed;

            blueBall.ySpeed = -blueBall.ySpeed;
            blueBall.xSpeed = -blueBall.xSpeed;
        }

        orangeBall.ySpeed = 5 > orangeBall.y || orangeBall.y > areaHeight-25 ? -orangeBall.ySpeed : orangeBall.ySpeed;
        orangeBall.y += orangeBall.ySpeed;

        orangeBall.xSpeed = 5 > orangeBall.x || orangeBall.x > areaWidth-25 ? -orangeBall.xSpeed : orangeBall.xSpeed;
        orangeBall.x += orangeBall.xSpeed;

        blueBall.ySpeed = 5 > blueBall.y || blueBall.y > areaHeight-25 ? -blueBall.ySpeed : blueBall.ySpeed;
        blueBall.y += blueBall.ySpeed;

        blueBall.xSpeed = 5 > blueBall.x || blueBall.x > areaWidth-25 ? -blueBall.xSpeed : blueBall.xSpeed;
        blueBall.x += blueBall.xSpeed;

        orangeBallElement.style.bottom = orangeBall.y + "px";
        orangeBallElement.style.left = orangeBall.x + "px";
        
        blueBallElement.style.bottom = blueBall.y + "px";
        blueBallElement.style.left = blueBall.x + "px";
    }
}

function toggleWorkShow() {
    const window = document.getElementById("work");
    window.classList.toggle("hidden")
    animation();
}

document.getElementById("show-window-button").onclick = toggleWorkShow;
document.getElementById("controls-close-button").onclick = toggleWorkShow;