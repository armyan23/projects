import {Snake} from "./snake.js"

export class Buttom{
    static  pausaBtn = document.getElementById("pausaBtn")
    static startBtn = document.getElementById("startBtn")
    static restartBtn= document.getElementById("restartBtn")
    constructor(){

    }
    static pausa(){
        Buttom.startBtn.style.visibility = "hidden"
        this.pausaBtn.style.visibility = "visible"
    }  
    static start(){
        Buttom.pausaBtn.style.visibility = "hidden"
        this.startBtn.style.visibility = "visible"
    }
    static restart(Snake,startInterval,startPausa){
        this.start(this.pausaBtn)
        Snake.restartSnake()
        clearInterval(startInterval)
        startPausa = !startPausa
    }
    
}