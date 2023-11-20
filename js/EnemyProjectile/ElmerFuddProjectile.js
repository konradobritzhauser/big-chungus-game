import EnemyProjectile from "./EnemyProjectile.js";


export default class ElmerFuddProjectile extends EnemyProjectile{
    constructor(game,x,y){
        super(game)
        this.game=game
        this.x=x
        this.y=y


        this.image = document.getElementById("bullet-cartoon");
        this.imageReflected = document.getElementById(
          "bullet-cartoon-right"
        );
        this.width = 960 * 0.2;
        this.height = 300 * 0.2;
        this.spriteWidth = 960;
        this.spriteHeight = 300;
        this.maxFrame = 120;
        this.animationSpeed = 1;
        this.damage=1
        this.speedX=-2
    }
} 