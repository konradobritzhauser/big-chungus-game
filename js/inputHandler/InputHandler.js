export default class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown",this.keydownCallback);

    window.addEventListener("keyup", this.keyupCallback );
  }

  keydownCallback(e) {
    console.log("e", e);
    if (
      (e.key == "ArrowUp" ||
        e.key == "ArrowDown" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight") &&
      this.game.keys.indexOf(e.key) === -1
    ) {
      this.game.keys.push(e.key);
    } else if (e.key === "1") this.game.inGame.player.shootTop();
    else if (e.key == "2") this.game.inGame.player.shootSpread();
    else if (e.key == "3") this.game.inGame.player.enableReverse();
    else if (e.key == "d") this.game.debug = !this.game.debug;
    else if (e.key == "q" && this.game.inGame.player.chonkyMeter >= 50) {
      //spend chonky to enter dark mode
      this.game.inGame.player.chonkyMeter -= 50;
      this.game.inGame.player.enterDarkMode();
    }

    // console.log("this.game.keys", this.game.keys);
  }

  keyupCallback(e){
    
      // console.log("keyup");
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }

      // console.log("this.game.keys", this.game.keys);
    
  }

  removeEventListeners() {}
}
