import { buttonTypes } from "../constants/buttons.js";
import MoveButton from "./button/MoveButton.js";

export default class TouchControlsMovement {
  constructor(game) {
    this.moveControlsAnchorX = 220;
    this.moveControlsAnchorY = 750;
    this.arrowKeyUp = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_UP,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyRight = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_RIGHT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyDown = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_DOWN,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyLeft = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_LEFT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyUpRight = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_UP_RIGHT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyDownRight = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_DOWN_RIGHT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyDownLeft = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_DOWN_LEFT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyUpLeft = new MoveButton(
      game.outerGame,
      buttonTypes.ARROW_UP_LEFT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );

    this.buttonsArr=[this.arrowKeyDown,this.arrowKeyDownLeft,this.arrowKeyDownRight,this.arrowKeyLeft,this.arrowKeyRight,this.arrowKeyUp,this.arrowKeyUpLeft,this.arrowKeyUpRight]
  }

  update() {}
  draw(context) {
    context.fillRect(
      this.moveControlsAnchorX,
      this.moveControlsAnchorY,
      10,
      10
    );
    this.arrowKeyUp.draw(context);
    this.arrowKeyRight.draw(context);
    this.arrowKeyDown.draw(context);
    this.arrowKeyLeft.draw(context);
    this.arrowKeyUpRight.draw(context);
    this.arrowKeyDownRight.draw(context);
    this.arrowKeyDownLeft.draw(context);
    this.arrowKeyUpLeft.draw(context);
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
