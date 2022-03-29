import {Territory} from "./territory.js"
import {Buttom} from "./buttons.js"
import {Snake} from "./snake.js"

let startPausa = false
let startInterval = undefined
let lose = false
Territory.creatTable()

Snake.startSnake()

// Start
document.getElementById("startBtn").addEventListener("click",function(e) {
    Buttom.pausa()
    
  
    window.addEventListener("keydown",function(e){
        if(e.key === "ArrowUp"){
            Snake.upSnake()
        }
        if(e.key === "ArrowDown"){
            Snake.downSnake()
        }
        if(e.key === "ArrowRight"){
            Snake.rightSnake()
        }
        if(e.key === "ArrowLeft"){
            Snake.leftSnake()
        }
        
    })
    startInterval = setInterval(function(){
        Snake.moveSnake()   
        if(Snake.lose) {
            Buttom.start()
            Snake.lose = !Snake.lose
            clearInterval(startInterval)
        }
        if(startPausa ) startPausa = !startPausa
        
        
    },300)
         
})


// Pausa
document.getElementById("pausaBtn").addEventListener("click",function(e) {
    Buttom.start()
    clearInterval(startInterval)
})


// RESTART
document.getElementById("restartBtn").addEventListener("click",function(e) {
    Buttom.restart(Snake,startInterval,startPausa)
})
