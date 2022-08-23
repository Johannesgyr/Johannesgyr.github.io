export class Lock{
    level;
    pins;
    constructor(level){
        this.level = level;
        this.pins = new Array(level);
        for (let i = 0; i < level; i++) {
            this.pins[i] = new Pin();        
     }
    }
    get level(){
        return this.level;
    }
}

class Pin{
    XPos;
    YPos;
    constructor(){
        this.XPos = getRandomInt(-90, 90);
        this.YPos = getRandomInt(90, 270);
    }
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min)
}

