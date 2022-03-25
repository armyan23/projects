export class Player{
    constructor(territory,paint){
        this.territory = territory
        this.width = 100
        this.xCord = this.territory.width/2-50
        this.xStart = (this.territory.width-this.width)/2
        this.paint = paint

        }
    playerSee(positionX = this.xStart){
        if(positionX == this.xStart) this.xCord = this.territory.width/2-50
        this.paint.clearRect(0,this.territory.height-10,this.territory.width,this.territory.height)
        this.paint.fillStyle = "#3cd63c";
        this.paint.fillRect(positionX,this.territory.height-10,this.width,7);
    }
    playerMove(){
        window.addEventListener("keydown",function(e) {
            if(e.key == "ArrowRight" && this.width + this.xCord < this.territory.width){
                this.xCord +=10
                this.playerSee(this.xCord)
            }else if(e.key == "ArrowLeft" && this.xCord > 0){
                this.xCord -=10
                this.playerSee(this.xCord)
            }
        }.bind(this))
    }
}

