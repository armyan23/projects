"use strict"
import {Event} from './buttons.js';
import {Player} from './player.js';
import {Ball} from './ball.js';
import {Enemy} from './enemy.js';



//Canvas
const canvas = document.getElementsByTagName("canvas")[0]

//Button
const startBtn = document.getElementsByClassName("buttonStart")[0]
const restartBtn = document.getElementsByClassName("buttonRestart")[0]

// Enemy 
const enemyOne = canvas.getContext("2d")
const enemyFirst = new Enemy(canvas,enemyOne)



// Player
const playerPaint = canvas.getContext("2d")
const playerFirst = new Player(canvas,playerPaint)

// Ball
const ballPaint = canvas.getContext("2d")
const ballFirst = new Ball(canvas,ballPaint,playerFirst,enemyFirst)

ballFirst.ballSee()


// Event 
const startGame = new Event(startBtn,restartBtn,playerFirst,ballFirst, canvas)
const restartGame = new Event(startBtn,restartBtn,playerFirst,ballFirst,canvas)

playerFirst.playerSee()

//Start and Restart
startGame.starter()
restartGame.restarted()
restartGame. ballLose()


