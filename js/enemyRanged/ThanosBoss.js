import ElmerFuddProjectile from "../EnemyProjectile/ElmerFuddProjectile.js";
import ThanosBossProjectile from "../EnemyProjectile/ThanosBossProjectile.js";
import { ENEMY_TYPE } from "../constants/enemyTypes.js";
export default class ThanosBoss {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.image = document.getElementById("thanos2");
    this.width = 498;
    this.height = 280;

    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    
    this.maxFrame = 379;
    this.animationSpeed = 0.5;
    this.isAnimated = true;

    
    this.xStationary = false;

    this.projectiles = [];
    this.burstPhaseTimer = 0;
    this.burstPhaseInterval = 8000;

    this.burstProjectileTimer = 0;
    this.burstProjectileInterval = 500;
    this.burstNumShots=0
    this.burstMaxShots=5



    this.speedX = -1;
    this.speedY = -1.5;

    this.lives = 500;
    this.score = this.lives;

    this.type=ENEMY_TYPE.BOSS

    
  }

  update(deltaTime) {
    //Move into screen and then stop
    if (this.x > this.game.width - this.game.width * 0.1 - this.width) {
      //enemy not in screen
      this.x += this.speedX;
    } else {
      this.xStationary = true;
      this.y += this.speedY;
      //reverse direciton when it gets close to border
      if (this.y > this.game.height * 0.9) {
        this.speedY = this.speedY * -1;
      } else if (this.y < this.game.height * 0.05) {
        this.speedY = this.speedY * -1;
      }
      //Enemy is in screen and should now move up and down
    }

    //sprite animation
    if (this.isAnimated && this.frameX < this.maxFrame) {
      this.frameX += 1 * this.animationSpeed;
    } else this.frameX = 0;

    //Shooting mechanic

    
    if (this.burstPhaseTimer > this.burstPhaseInterval && this.xStationary) {
        console.log('burst phase timer is bigger')
      //inside burst phase
      if(this.burstProjectileTimer>this.burstProjectileInterval){
        console.log('in burst phase')
        if(this.burstNumShots<this.burstMaxShots){
            console.log('shooting')
            this.shoot()
            this.burstProjectileTimer=0
            this.burstNumShots++
            //shooting burst shot
        }else{
            console.log('burst phase finished')
            //burst is finished
            this.burstNumShots=0
            this.burstProjectileTimer=0
        this.burstPhaseTimer = 0;

        }
        
      }else{
        this.burstProjectileTimer+=deltaTime
        
      }
    } else {
      this.burstPhaseTimer += deltaTime;
    }

    //Enemy projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      Math.floor(this.frameX) * this.width,
      Math.floor(this.frameY) * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    //ENEMY LIFE TEXT
    context.fillStyle = "black";
    context.font = "20px Helve";
    context.fillText(this.lives, this.x, this.y);

    //Enemy projectiles
    // this.projectiles.forEach((projectile) => {
    //   projectile.draw(context);
    // });
  }

  instantiateNewProjectile(){
    return new ThanosBossProjectile(game,this.x,this.y)

  }

  shoot() {
    this.projectiles.push(
      this.instantiateNewProjectile(),
    );
  }

  shootBeam() {
    let beamWidth = 498;
    let beamHeight = 234;
    let beamMaxFrame = 90;
    let beamImage = document.getElementById("thanos-boss-beam");
  }
}
