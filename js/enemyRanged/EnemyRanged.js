import EnemyProjectile from "../EnemyProjectile/EnemyProjectile.js";


export default class EnemyRanged {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.markedForDeletion = false;
      this.frameX = 0;
      this.frameY = 0;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);

      this.xStationary = false;

      this.projectiles = [];
      this.shootTimer = 0;
      this.shootInterval = 5000;
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
      if (this.shootTimer > this.shootInterval && this.xStationary) {
        this.shootTimer = 0;
        this.shoot();
      } else {
        this.shootTimer += deltaTime;
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
        Math.floor(this.frameX) * this.imageWidth,
        Math.floor(this.frameY) * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      //ENEMY LIFE TEXT
      context.fillStyle = "black";
      context.font = "20px Helve";
      // context.fillText(this.lives, this.x, this.y);

      //Enemy projectiles
      // this.projectiles.forEach((projectile) => {
      //   projectile.draw(context);
      // });
    }

    shoot() {
      this.projectiles.push(this.instantiateNewProjectile())
    }
  }