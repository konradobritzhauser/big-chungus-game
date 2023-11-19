import { buttonTypes } from "../../constants/buttons.js";

export default class Button {
  constructor(game, type, image) {
    this.game = game;
    this.type = type;
    this.game.clickableElements.push(this);
    this.disabled = false;
    if (image) this.image = image;
  }

  update() {
    //HANDLE BEHAVIOR WHEN CLICKED
  }
  draw(context) {

    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    if(this.game.debug)context.strokeRect(this.x, this.y, this.width, this.height);

  }

  mousedown() {
    if (
      this.type == buttonTypes.ARROW_UP ||
      this.type == buttonTypes.ARROW_RIGHT ||
      this.type == buttonTypes.ARROW_DOWN ||
      this.type == buttonTypes.ARROW_LEFT
    ) {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: this.type }));
    } else if (this.type == buttonTypes.ACTION_1)
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "1" }));
    else if (this.type == buttonTypes.ACTION_2)
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "2" }));
    else if (this.type == buttonTypes.ACTION_3)
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "3" }));
    else if (this.type == buttonTypes.SPECIAL_ACTION_1)
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "q" }));
    else if (this.type == buttonTypes.ARROW_UP_RIGHT) {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_UP })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_RIGHT })
      );
    } else if (this.type == buttonTypes.ARROW_DOWN_RIGHT) {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_DOWN })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_RIGHT })
      );
    } else if (this.type == buttonTypes.ARROW_DOWN_LEFT) {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_DOWN })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_LEFT })
      );
    } else if (this.type == buttonTypes.ARROW_UP_LEFT) {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_UP })
      );
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: buttonTypes.ARROW_LEFT })
      );
    }
  }
  mouseup() {
    if (
      this.type == buttonTypes.ARROW_UP ||
      this.type == buttonTypes.ARROW_RIGHT ||
      this.type == buttonTypes.ARROW_DOWN ||
      this.type == buttonTypes.ARROW_LEFT
    ) {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: this.type }));
    } else if (this.type == buttonTypes.ARROW_UP_RIGHT) {
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_UP })
      );
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_RIGHT })
      );
    } else if (this.type == buttonTypes.ARROW_DOWN_RIGHT) {
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_DOWN })
      );
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_RIGHT })
      );
    } else if (this.type == buttonTypes.ARROW_DOWN_LEFT) {
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_DOWN })
      );
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_LEFT })
      );
    } else if (this.type == buttonTypes.ARROW_UP_LEFT) {
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_UP })
      );
      window.dispatchEvent(
        new KeyboardEvent("keyup", { key: buttonTypes.ARROW_LEFT })
      );
    }
  }
}
