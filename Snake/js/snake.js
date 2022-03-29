
import {Territory} from "./territory.js"
// import {Cake} from "./cake.js"

export class Snake{
    static square = Territory.sizeTable
    static abs = Math.floor((Territory.sizeTable*Territory.sizeTable)/2)
    static startPosition = [this.abs-1,this.abs,this.abs+1]
    static interval = 1
    static lose = false
    static cakePasitoion = Math.floor(Math.random()*this.square*this.square)
    static point = 0
    
    constructor(){

    }

    static newCake(){
        let td = document.getElementsByTagName("td")
        td[this.cakePasitoion].style.backgroundColor = "#f9896b";
    }


    static eatingSnake(){
        if(Snake.startPosition.at(-1) == this.cakePasitoion){
            let random = Math.floor(Math.random()*this.square*this.square);
            // this.newCake()
            Snake.cakePasitoion = random
            this.point++
            let pointSnake = document.getElementById("point")
            pointSnake.textContent = `Point ${this.point}`
            this.startPosition.push(Snake.startPosition.at(-1))
        }
    }
    static startSnake(){
        Snake.loseWall()
        
        Snake.newCake()
        let td = document.querySelectorAll("td")
        for(let i of Snake.startPosition){
            td[i].style.backgroundColor = "#85cfea"
        }
        Snake.eatingSnake()
     
    }
    static moveSnake(){
        let td = document.querySelectorAll("td")
        for(let i of this.startPosition){
            if(i == this.startPosition.at(-1) + this.interval){
                Snake.loseSnake(true)
            }
        }
        Snake.startPosition.push(this.startPosition.at(-1) + this.interval)
        
        let delet = Snake.startPosition.shift(0)
        td[delet].style.backgroundColor = "white"
        Snake.startSnake() 
       
    }
    static restartSnake(){
        let td = document.querySelectorAll("td")
        for(let i of this.startPosition){
        td[i].style.backgroundColor = "white"
        }
        this.interval = 1
        
        td[this.startPosition.at(-1) + this.interval-this.interval].style.backgroundColor = "white"
        Snake.startPosition = [this.abs-1,this.abs,this.abs+1]
        Snake.startSnake()
    }


    static upSnake(){
        this.interval = -this.square
    }
    static downSnake(){
        this.interval = this.square
    }
    static rightSnake(){
        this.interval = 1
    } 
    static leftSnake(){
        this.interval = -1
    }
    static loseWall(){
        let td = document.querySelectorAll("td")
        if((this.startPosition.at(-1) < 0||this.startPosition.at(-1) > this.square*this.square) ||
        ((this.interval == -1 || this.interval == 1) && td[this.startPosition.at(-1)].parentElement  != 
        td[this.startPosition.at(-2)].parentElement)){
            Snake.loseSnake()
        }
    }
    static loseSnake(bool = false){
        if(bool){
            let td = document.querySelectorAll("td")
            td[this.startPosition.at(-1)].style.backgroundColor = "white"
        }

        this.interval = 0
        this.lose = !this.lose
        Snake.startPosition.pop(this.startPosition.at(-1))
        Snake.restartSnake()
        alert(`You lose(      your point ${this.point}`)
        this.point = 0
        let pointSnake = document.getElementById("point")
        Snake.startPosition = [this.abs-1,this.abs,this.abs+1]
        pointSnake.textContent = `Point ${this.point}`

    }
    

}