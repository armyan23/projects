export class Enemy{
    constructor(territory,paint){
        this.width = 30
        this.height = 10
        // this.xCord = 10
        // this.yCord = 10
        this.color = "blue"
        this.territory =territory
        this.paint = paint
    }
    enemySee(){
        console.log(this.width)
        this.paint.fillStyle = this.color;
        this.paint.fillRect(260, 10, this.width, this.height);
    }

}


