let canvasActive = false;
let canvas = document.getElementById("can")
let ctx = canvas.getContext("2d")
ctx.font = "13px Arial"

let pinSound = new Audio('assets/pin.mp3')



canvas.addEventListener("click", (event) => {
    if(!canvasActive){
        canvas.requestPointerLock()
    }
})

document.addEventListener('pointerlockchange', (event) =>{
    canvasActive = !canvasActive;
})

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min)

}


const marginOfError = 500;
const borderSize = 2500;

let sweetSpotFound = false;
let currentX = 0;
let currentY = 0;
let sweetSpotX = getRandomInt(-borderSize, borderSize);
let sweetSpotY = getRandomInt(-borderSize, borderSize);
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
        ctx.fill();
        ctx.fillText("Current X: " + currentX, 10, 20)
        ctx.fillText("Current Y: " + currentY, 10, 40)
        ctx.fillText("Target X: " + sweetSpotX, 10, 80)
        ctx.fillText("Target Y: " + sweetSpotY, 10, 100)
    }
})

document.addEventListener("keydown", (event)=>{
    if(sweetSpotFound && (event.key == 'f' || event.key == 'F')){
        pinSound.play();
    }
})




