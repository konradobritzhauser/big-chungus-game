import { buttonTypes } from "../../constants/buttons.js";
import Button from "./Button.js";

export default class ActionButton extends Button {
    constructor(game, buttonType, anchorX, anchorY) {
      super(game, buttonType);
      this.width = 150;
      this.height = 150;
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      this.type = buttonType;

      this.margin=20
      if (buttonType == buttonTypes.ACTION_1) {
        this.x = this.anchorX +this.width*2+this.margin*2
        this.y = this.anchorY
        this.image = document.getElementById("action1");
      } else if (buttonType == buttonTypes.ACTION_2) {
        this.x = this.anchorX + this.width+this.margin
        this.y = this.anchorY;
        this.image = document.getElementById("action2");
      } else if (buttonType == buttonTypes.ACTION_3) {

        this.x = this.anchorX 
        this.y = this.anchorY 
        this.image = document.getElementById("action3");
      } else if (buttonType == buttonTypes.SPECIAL_ACTION_1) {
        console.log("starting special action button");
        this.x = this.anchorX +this.width*2+this.margin*2
        this.y = this.anchorY -this.height-this.margin
        this.image = document.getElementById("specialAction1");
      } 
    }
  }