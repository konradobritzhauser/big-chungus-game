

export default class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 65;
      this.fontFamily = "Helvetica";
      this.color = "white";

     
    }

    draw(context) {
      context.save();

      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = "black";
      context.font = this.fontSize + "px" + this.fontFamily;

      //score
      context.fillText("Score: " + this.game.score, 20, 40);

      //ammo
      for (let i = 0; i < this.game.ammo; i++) {
        context.fillStyle="yellow"
        context.fillRect(20 + 10 * i, 50, 5, 40);
      }

      //timer
      const formattedTime = this.game.gameTime * 0.001;
      context.fillText(`Timer: ${formattedTime.toFixed(1)}`, 20, 100);

      //HEALTH
      context.fillText("Health", 20, 130);
      for (let i = 0; i < this.game.player.health; i++) {
        context.fillStyle="red"
        context.fillRect(20 + 10 * i, 140, 5, 30);
      }

      //CHUNKY LEVEL
      context.font = `20px serif`;
      context.fillText(
        "Chonky Meter: " + this.game.player.chonkyMeter,
        20,
        195
      );

      //game over messages
      if (this.game.gameOver) {
        context.textAlign = "center";
        let message1;
        let message2;
        if (this.game.score >= this.game.winningScore) {
          message1 = "You Win!";
          message2 = "Well done!";
        } else {
          message1 = "You Lose!";
          message2 = "Try again next time!";
        }
        context.font = `50px ${this.fontFamily}`;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 40
        );
        context.font = `25px ${this.fontFamily}`;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        );
      }

      context.restore();
    }
  }