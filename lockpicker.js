let canvasActive = false;
let canvas = document.getElementById("can")
let ctx = canvas.getContext("2d")
ctx.font = "13px Arial"



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


let currentX = 0;
let currentY = 0;
let sweetSpotX = getRandomInt(-2500, 2500);
let sweetSpotY = getRandomInt(-2500, 2500);
canvas.addEventListener("mousemove", (event) =>{
    if(canvasActive){
        if(event.movementX < 0){
            currentX = Math.max(-2500, currentX + event.movementX)
        }else if(event.movementX > 0){
            currentX = Math.min(2500, currentX + event.movementX)
        }
        if(event.movementY < 0 ){
            currentY = Math.max(-2500, currentY + event.movementY);
        }else if(event.movementY > 0){
            currentY = Math.min(2500, currentY + event.movementY)
        }
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
        ctx.fillText("Current X: " + currentX, 10, 20)
        ctx.fillText("Current Y: " + currentY, 10, 40)
        ctx.fillText("Target X: " + sweetSpotX, 10, 80)
        ctx.fillText("Target Y: " + sweetSpotY, 10, 100)
    }
})

document.addEventListener("keydown", (event)=>{
    if(event.key == 'f' || event.key == 'F'){
        
    }
})




