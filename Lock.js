export class Lock{
    level;
    pins;
    constructor(level, borderSize){
        this.level = level;
        this.pins = new Array(level);
        for (let i = 0; i < level; i++) {
            this.pins[i] = new Pin(borderSize);        
     }
    }
    get level(){
        return this.level;
    }
}

class Pin{
    XPos;
    YPos;
    constructor(borderSize){
        this.XPos = getRandomInt(-borderSize, borderSize);
        this.YPos = getRandomInt(-borderSize, borderSize);
    }
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min)
}

