import { buttonTypes } from "../constants/buttons.js";
import TextButton from "../controls/button/TextButton.js";
export default class MainMenu {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;

    this.backgroundImage = document.getElementById("main-menu-background");

    this.mainMenuMusic = document.getElementById("main-menu-music");

    this.startGameBtn = new TextButton(
      this.game,
      120,
      200,
      250,
      200,
      "Start Game"
    );
    this.mainMenuMusic.play();
    this.startGameBtn.mousedown = () => {
      this.mainMenuMusic.pause();
      this.game.startGame();
    };
  }

  update() {}

  draw(context) {

    

    context.drawImage(
      this.backgroundImage,
      0,
      0,
      this.game.width,
      this.game.height
    );
    this.startGameBtn.draw(context);

    context.save()
    context.fillStyle = "white";
    context.font = `50px Beyonders`;
    // context.textAlign = "center";
    // context.textBaseline = "middle";
    context.fillText("Big Chungus: The Game", 140,250);
    context.restore()
  }
}
