export class Ball{
    constructor(territory,paint,player,enemyL){
        this.width = 10
        this.height = this.width
        this.territory = territory
        this.player = player
        this.paint = paint
        this.enemyL = enemyL
        this.xCord = territory.width/2
        this.yCord = territory.height-21;  
        this.xStart = territory.width/2;
        this.yStart = territory.height-21;    
        this.upDown = 2
        this.leftRight = 2
    }
    ballSee(x = this.xStart,y = this.yStart){
        if(x == this.xStart && y == this.yStart) {
            this.xCord = this.territory.width/2
            this.yCord = this.territory.height-21; 
            this.upDown = 2
            this.leftRight = 2
        }
        this.paint.clearRect(0, -10,this.territory.width,this.territory.height)
        this.paint.fillStyle = "red";
        this.paint.beginPath();
        this.paint.arc(x,  y, this.width, 0, 2 * Math.PI, false);
        this.paint.fill();
        this.enemyL.enemySee()
    } 
    ballMove() {
        if (this.yCord - this.height< 0 || this.yCord > this.territory.height-22){
            this.upDown *= -1
        }
        if (this.xCord - this.width < 0 || this.xCord > this.territory.width-10){
            this.leftRight *= -1
        }
        this.xCord +=  this.leftRight
        this.yCord +=  this.upDown
        this.ballSee(this.xCord,this.yCord)
    }
}