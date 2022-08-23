import {Lock} from '/Lock.js'
const lDisplay = document.getElementById("levelDisplay");
const select = document.getElementById("difficultySelecter");

const timer = 10; //seconds
let playerLevel = 3; //set by player
let lock = new Lock(playerLevel);

for (let i = 0; i < playerLevel; i++) {
    const element = playerLevel  
}

select.addEventListener("change", (event) => {
    playerLevel = event.target.value;
    lock = new Lock(playerLevel);
    resetPins();
    generateLockDisplay();
});

let canvasActive = false;
let canvas = document.getElementById("can");
let ctx = canvas.getContext("2d");
ctx.font = "13px Arial";

let pinSound = new Audio('assets/pin.mp3');
let breakSound = new Audio('assets/break.mp3');
let unlockSound = new Audio('assets/unlock.mp3');



document.addEventListener('pointerlockchange', (event) =>{
    canvasActive = !canvasActive;
})

const marginOfError = 25;

let sweetSpotXFound = false;
let sweetSpotYFound = false;
let currentPin = 0;

let sweetSpotX = lock.pins[0].XPos;
let sweetSpotY = lock.pins[0].YPos;

let thetaRight = 0
let thetaLeft = 90;

let rightLocked = false;
let leftLocked = false;

const r = 250;
const x = 300;
const y = x;
canvas.addEventListener("mousemove", (event) =>{
    if(canvasActive){
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(x, y, 150, 0, 2 * Math.PI);
        ctx.moveTo(x, x-150)
        ctx.lineTo(x, x+150)
        ctx.stroke();

        //right side line
        if(event.movementX > 0 && !rightLocked){
            thetaRight = incrementAngle(thetaRight, 90);
        }else if(event.movementX < 0 && !rightLocked){
            thetaRight = decrementAngle(thetaRight, -90)
        }

        sweetSpotXFound = checkSweetSpot(thetaRight, sweetSpotX);
        if(sweetSpotXFound){
            ctx.strokeStyle = 'red';
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + r * Math.cos(Math.PI * thetaRight/180.0), y + r * Math.sin(Math.PI * thetaRight/180.0))
        ctx.stroke();
        ctx.strokeStyle = 'black';
        //left side line
        if(event.movementY < 0 && !leftLocked){
            thetaLeft = incrementAngle(thetaLeft, 270)
        }else if(event.movementY > 0 && !leftLocked){
            thetaLeft = decrementAngle(thetaLeft, 90)
        }
        sweetSpotYFound = checkSweetSpot(thetaLeft, sweetSpotY);
        if(sweetSpotYFound){
            ctx.strokeStyle = 'red';
        }
        ctx.beginPath();
        ctx.moveTo(x, x)
        ctx.lineTo(x + r * Math.cos(Math.PI * thetaLeft/180.0), y + r * Math.sin(Math.PI * thetaLeft/180.0))
        ctx.stroke();

        

    }
})

function incrementAngle(angle, limit){
    let newAngle = angle + 1;
    if(newAngle > limit){
        return angle;
    }
    return newAngle;
}
function decrementAngle(angle, limit){
    let newAngle = angle - 1;
    if(newAngle < limit){
        return angle;
    }
    return newAngle;
}

function checkSweetSpot(currentAngle, currentSweetspot){
    if(currentAngle - currentSweetspot < marginOfError && currentAngle - currentSweetspot > -marginOfError){
        return true;
    }else{
        return false;
    }
}

document.addEventListener("keydown", (event)=>{
    if(event.key == 'f' || event.key == 'F'){
        if(sweetSpotXFound && sweetSpotYFound){
            moveNextPin();
            //next pin or next lock
        }else{
            resetPins();
        }
        leftLocked = false;
        rightLocked = false;
        sweetSpotXFound = false;
    }

})

canvas.addEventListener("click", (event) => {
    if(!canvasActive){
        canvas.requestPointerLock()
    }else{
        if(event.button == 0){
            leftLocked = !leftLocked;
        }
        if(event.button == 2){
            rightLocked = !rightLocked;
        }
    }
})

function getNewLock(level){
    lock = new Lock(level)
}

let timeHolder = document.getElementById("timeHolder");
let counter;
let inter;
function moveNextPin(){
    if(currentPin == 0){
        counter = 0;
        inter = setInterval(() => {
            counter = counter + 0.1;
            timeHolder.innerText = stripNumber(timer-counter);
            if(counter >= 10){
                timeHolder.innerText = "x"
                resetPins();
            }
        }, 100);
    }
    document.getElementById(currentPin).innerText = "✔️";
    currentPin++;
    if(currentPin == lock.level){
        unlockSound.play();
        getNewLock(playerLevel);
        currentPin = 0;
        generateLockDisplay();
        clearInterval(inter);
        timeHolder.innerText = "x";
    }else{
        pinSound.play();

    }
    
    reDrawCanvas();
    updateSweetspot();
}

function stripNumber(number){
    return parseFloat(number).toPrecision(2)
}

function resetPins(){
    currentPin = 0;
    breakSound.play();
    reDrawCanvas();
    updateSweetspot();
    rightLocked = false;
    leftLocked = false;
    generateLockDisplay();
    clearInterval(inter);
    timeHolder.innerText = "x"

}

function updateSweetspot(){
    sweetSpotX = lock.pins[currentPin].XPos;
    sweetSpotY = lock.pins[currentPin].YPos;
}

function reDrawCanvas(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 150, 0, 2 * Math.PI);
    ctx.moveTo(x, x-150)
    ctx.lineTo(x, x+150)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, x);
    ctx.lineTo(x + r * Math.cos(Math.PI * thetaRight/180.0), y + r * Math.sin(Math.PI * thetaRight/180.0))
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, x)
    ctx.lineTo(x + r * Math.cos(Math.PI * thetaLeft/180.0), y + r * Math.sin(Math.PI * thetaLeft/180.0))
    ctx.stroke();
}

function generateLockDisplay(){
    lDisplay.innerHTML = '';
    for (let i = 0; i < playerLevel; i++) {
        let pinDisplay = document.createElement("li");
        pinDisplay.id = i;
        pinDisplay.textContent = "⬛";
        lDisplay.appendChild(pinDisplay);
        
    }

}

generateLockDisplay();
