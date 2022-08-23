import {Lock} from '/Lock.js'

let canvasActive = false;
let canvas = document.getElementById("can");
let ctx = canvas.getContext("2d");
ctx.font = "13px Arial";

let pinSound = new Audio('assets/pin.mp3');
let breakSound = new Audio('assets/break.mp3');


canvas.addEventListener("click", (event) => {
    if(!canvasActive){
        canvas.requestPointerLock()
    }
})

document.addEventListener('pointerlockchange', (event) =>{
    canvasActive = !canvasActive;
})

const marginOfError = 500;
const borderSize = 2500;

let sweetSpotFound = false;
let currentX = 0;
let currentY = 0;
let lock = new Lock(1, borderSize)

let sweetSpotX = lock.pins[0].XPos;
let sweetSpotY = lock.pins[0].YPos;

let thetaRight = 0
let thetaLeft = 90;
canvas.addEventListener("mousemove", (event) =>{
    if(canvasActive){
        if(event.movementX < 0){
            currentX = Math.max(-borderSize, currentX + event.movementX)
        }else if(event.movementX > 0){
            currentX = Math.min(borderSize, currentX + event.movementX)
        }
        if(event.movementY < 0 ){
            currentY = Math.max(-borderSize, currentY + event.movementY);
        }else if(event.movementY > 0){
            currentY = Math.min(borderSize, currentY + event.movementY)
        }
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
        if(currentX - sweetSpotX < marginOfError && currentX - sweetSpotX > -marginOfError && currentY - sweetSpotY < marginOfError && currentY - sweetSpotY > -marginOfError){
            sweetSpotFound = true;
            console.log("bingo")
            ctx.fillStyle = "red";

        }else{
            sweetSpotFound = false;
            ctx.fillStyle = "black";
        }
        /*
        ctx.fill();
        ctx.fillText("Current X: " + currentX, 10, 20)
        ctx.fillText("Current Y: " + currentY, 10, 40)
        ctx.fillText("Target X: " + sweetSpotX, 10, 80)
        ctx.fillText("Target Y: " + sweetSpotY, 10, 100)
        */
        ctx.beginPath();
        ctx.arc(400, 400, 150, 0, 2 * Math.PI);
        ctx.moveTo(400, 250)
        ctx.lineTo(400, 550)

        let r = 250;
        let x = 400;
        let y = 400;
        //right side line
        if(event.movementX > 0){
            thetaRight = incrementAngle(thetaRight, 90);
        }else if(event.movementX < 0){
            thetaRight = decrementAngle(thetaRight, -90)
        }

        if(event.movementY > 0){
            thetaLeft = incrementAngle(thetaLeft, 270)
        }else if(event.movementY < 0){
            thetaLeft = decrementAngle(thetaLeft, 90)
        }
        ctx.moveTo(400, 400)
        ctx.lineTo(x + r * Math.cos(Math.PI * thetaRight/180.0), y + r * Math.sin(Math.PI * thetaRight/180.0))
        //left side line
        ctx.moveTo(400, 400)
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

document.addEventListener("keydown", (event)=>{
    if(event.key == 'f' || event.key == 'F'){
        if(sweetSpotFound){
            pinSound.play()
            //next pin or next lock
        }else{
            breakSound.play();
            //reset pins
        }
    }

})




