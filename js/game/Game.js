import InGame from "../InGame/InGame.js";
import MainMenu from "../mainMenu/MainMenu.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.clickableElements = [];
    this.lastClickBox = { width: 20, height: 20, x: 0, y: 0 };
    this.inGame = null;

    this.mainMenu = new MainMenu(this);

    

    console.log("constructed main game menu");
  }

  update(deltaTime) {
    if (this.inGame) {
      this.inGame.update(deltaTime);
    }

    //MAIN MENU
    this.mainMenu.update();
  }

  draw(context) {
    if (this.inGame) {
      this.inGame.draw(context);
    }else{
      this.mainMenu.draw(context);

    }

    context.fillRect(
      this.lastClickBox.x,
      this.lastClickBox.y,
      this.lastClickBox.width,
      this.lastClickBox.height
    );
  }

  startGame() {
    this.inGame = new InGame(this,this.width, this.height);
  }
  pauseGame() {
    this.inGame.paused = true;
  }
  unpauseGame() {
    this.inGame.paused = false;
  }
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
