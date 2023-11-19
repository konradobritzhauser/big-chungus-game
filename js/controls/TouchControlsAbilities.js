import { buttonTypes } from "../constants/buttons.js";
import ActionButton from "./button/ActionButton.js";

export default class TouchControlsAbilities{
    constructor(game) {
      this.controlsAnchorX = 1400;
      this.controlsAnchorY = 850;
      this.action1 = new ActionButton(
        game.outerGame,
        buttonTypes.ACTION_1,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
      this.action2 = new ActionButton(
        game.outerGame,
        buttonTypes.ACTION_2,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
      this.action3 = new ActionButton(
        game.outerGame,
        buttonTypes.ACTION_3,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
       this.specialAction1 = new ActionButton(
        game.outerGame,
        buttonTypes.SPECIAL_ACTION_1,
        this.controlsAnchorX,
        this.controlsAnchorY
      );
     
      this.buttonsArr=[this.action1,this.action2,this.action3,this.specialAction1]
    }

    update() {}
    draw(context) {
      context.fillRect(
        this.controlsAnchorX,
        this.controlsAnchorY,
        10,
        10
      );
      this.action1.draw(context);
      this.action2.draw(context);
      this.action3.draw(context);
      this.specialAction1.draw(context)
    }

    disableControls(){
      this.buttonsArr.forEach(button=>{
        button.disabled=true
      })
    }
    enableControls(){
        this.buttonsArr.forEach(button=>{
          button.disabled=false
        })
    }
  }