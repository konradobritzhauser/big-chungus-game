import InGame from "../InGame/InGame.js";
import Level1 from "../InGame/Level1.js";
import MainMenu from "../mainMenu/MainMenu.js";
const ROUTES = {
  MAIN_MENU: "MAIN_MENU",
  IN_GAME: "IN_GAME",
};

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.clickableElements = [];
    this.lastClickBox = { width: 20, height: 20, x: 0, y: 0 };
    this.inGame = null;

    this.mainMenu = new MainMenu(this);
    this.debug = false;
    this.keys = [];

    this.currentRoute = null;

    console.log("constructed main game menu");

    this.goToMainMenu();
    window.game=this



    //  START MUSIC
    // play on first click to screen
    const getCurrentAudioTag=()=>{
      let startingAudioTag;
      if (this.currentRoute == ROUTES.MAIN_MENU)
        startingAudioTag = this.mainMenu.mainMenuMusic;
      else if (this.currentRoute == ROUTES.IN_GAME)
        startingAudioTag = this.inGame.inGameMusic;
      return startingAudioTag
    }
    let startMusic = ()=> {
      getCurrentAudioTag().play();
      window.removeEventListener("click", startMusic);
    };
    getCurrentAudioTag().play();
    window.addEventListener("click", startMusic);


    //manage fps timer
    this.currentFps=0;
    this.fpsSecondTimer=0;
    this.numFramesPassed=0
  }

  update(deltaTime) {
    //manage fps
    this.fpsSecondTimer+=deltaTime
    this.numFramesPassed++
    if(this.fpsSecondTimer>=1000){
      //calculate fps
      this.currentFps=this.numFramesPassed
      this.fpsSecondTimer=0
      this.numFramesPassed=0

    }

    //

    if (this.currentRoute == ROUTES.IN_GAME) {
      if(this.inGame)this.inGame.update(deltaTime);
    } else if (this.currentRoute == ROUTES.MAIN_MENU) {
      //MAIN MENU
      this.mainMenu.update();
    }

    //handle routing
  }

  draw(context) {

    if (this.inGame) {
      this.inGame.draw(context);
    } else {
      this.mainMenu.draw(context);
    }

    context.save()
    context.fillStyle = this.textColor;
    context.font = `20px Beyonders`;
    context.fillText(`FPS: ${this.currentFps}`,this.width-150,40)
    context.restore()

    context.fillRect(
      this.lastClickBox.x,
      this.lastClickBox.y,
      this.lastClickBox.width,
      this.lastClickBox.height
    );
  }

  goToMainMenu() {
    this.mainMenu.mainMenuMusic.currentTime = 0;
    this.mainMenu.mainMenuMusic.play();
    this.currentRoute = ROUTES.MAIN_MENU;
  }
  startGame() {
    this.inGame = new Level1(this, this.width, this.height);
    this.inGame.inGameMusic.currentTime = 0;
    this.inGame.inGameMusic.play();
    this.mainMenu.hide();
    this.currentRoute = ROUTES.IN_GAME;
  }
  quitGame() {
    this.inGame.inGameMusic.pause();
    this.mainMenu.show();
    this.inGame = null;
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
