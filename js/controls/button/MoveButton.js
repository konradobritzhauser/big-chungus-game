import { buttonTypes } from "../../constants/buttons.js";
import Button from "./Button.js";

export default class MoveButton extends Button {
    constructor(game, buttonType, anchorX, anchorY) {
      super(game, buttonType);
      this.width = 150;
      this.height = 150;
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      this.type = buttonType;

      if (buttonType == buttonTypes.ARROW_UP) {
        this.x = this.anchorX - this.width / 2;
        this.y = this.anchorY - this.height;
        this.image = document.getElementById("arrow-key-up");
      } else if (buttonType == buttonTypes.ARROW_RIGHT) {
        this.x = this.anchorX + this.width / 2;
        this.y = this.anchorY;
        this.image = document.getElementById("arrow-key-right");
      } else if (buttonType == buttonTypes.ARROW_DOWN) {

        this.x = this.anchorX - this.width / 2;
        this.y = this.anchorY + this.height;
        this.image = document.getElementById("arrow-key-down");
      } else if (buttonType == buttonTypes.ARROW_LEFT) {
        this.x = this.anchorX - this.width - this.width / 2;
        this.y = this.anchorY;
        this.image = document.getElementById("arrow-key-left");
      }else if (buttonType==buttonTypes.ARROW_UP_RIGHT){
        this.x = this.anchorX + this.width / 2;
        this.y = this.anchorY - this.height
        this.image = document.getElementById("arrow-key-up-right");
      }else if (buttonType==buttonTypes.ARROW_DOWN_RIGHT){
        this.x = this.anchorX + this.width / 2;
        this.y = this.anchorY + this.height;
        this.image = document.getElementById("arrow-key-down-right");
      }else if (buttonType==buttonTypes.ARROW_DOWN_LEFT){
        this.x = this.anchorX - this.width - this.width / 2;
        this.y = this.anchorY + this.height;
        this.image = document.getElementById("arrow-key-down-left");
      }else if (buttonType==buttonTypes.ARROW_UP_LEFT){
        this.x = this.anchorX - this.width - this.width / 2;
        this.y = this.anchorY - this.height
        this.image = document.getElementById("arrow-key-up-left");
      }
    }
  }
