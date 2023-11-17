export default class InputHandler {
    constructor(game) {
      this.game = game;

      window.addEventListener("keydown", (e) => {
        // console.log("e", e);
        if (
          (e.key == "ArrowUp" ||
            e.key == "ArrowDown" ||
            e.key == "ArrowLeft" ||
            e.key == "ArrowRight") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === "1") this.game.player.shootTop();
        else if (e.key == "2") this.game.player.shootSpread();
        else if (e.key == "3") this.game.player.enableReverse();
        else if (e.key == "d") this.game.debug = !this.game.debug;
        else if (e.key == "q" && this.game.player.chonkyMeter >= 50) {
          //spend chonky to enter dark mode
          this.game.player.chonkyMeter -= 50;
          this.game.player.enterDarkMode();
        }

        // console.log("this.game.keys", this.game.keys);
      });

      window.addEventListener("keyup", (e) => {
        // console.log("keyup");
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }

        // console.log("this.game.keys", this.game.keys);
      });

      // window.addEventListener("mousedown", (e) => {
      //   console.log("mouse down event", e);
      //   this.game.mousedown = true;
      // });

      // window.addEventListener("mousemove", (e) => {
      //   // console.log('mouse move event', e)
      // });

      // window.addEventListener("mouseup", (e) => {
      //   // console.log('mouse up event', e)
      // });
    }
  }