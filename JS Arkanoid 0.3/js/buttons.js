export class Event{
    constructor(buttonStart,buttonPausa,player,ball,territory){
        this.buttonStart = buttonStart
        this.buttonPausa = buttonPausa
        this.player = player
        this.ball = ball
        this.territory = territory
        this.playPausa = false
        this.playerLose = false
    }
    startPosition(){
        this.player.playerSee()
        this.ball.ballSee()
    }
    starter(){
        this.buttonStart.addEventListener("click", function (e) {
            if(e.target.textContent == "Start" ){
                e.target.textContent = "Pausa"
                const  loop = () => {
                    if(this.playPausa || !stop) {
                        this.playPausa = !this.playPausa
                        return
                    }
                    if(this.playerLose) {
                        this.playerLose = !this.playerLose
                        e.target.textContent = "Start"
                        return
                    }
                   
                    this.ballLose()
                    this.ball.ballMove()
                    requestAnimationFrame(loop)
                }
                loop()
                this.player.playerMove()
            }else if(e.target.textContent == "Pausa"){
                this.playPausa = !this.playPausa
                e.target.textContent = "Start"
            }
        }.bind(this))
    }
    restarted(){
        this.buttonPausa.addEventListener("click",function(e) {
            if(e.target.textContent == "Restart"){
                this.startPosition()
            }
        }.bind(this))
    }
    ballLose(){
        if(this.ball.yCord > this.territory.height-22 && 
           (this.ball.xCord - this.player.xCord < 0 || this.ball.xCord - this.player.xCord > this.player.width)) {
                this.startPosition()
                // alert("You lose")
                this.playerLose = true
       }
   }
}