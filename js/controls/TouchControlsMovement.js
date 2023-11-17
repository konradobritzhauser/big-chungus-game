import { buttonTypes } from "../constants/buttons.js";
import MoveButton from "./button/MoveButton.js";

export default class TouchControlsMovement {
  constructor(game) {
    this.moveControlsAnchorX = 220;
    this.moveControlsAnchorY = 750;
    this.arrowKeyUp = new MoveButton(
      game,
      buttonTypes.ARROW_UP,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyRight = new MoveButton(
      game,
      buttonTypes.ARROW_RIGHT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyDown = new MoveButton(
      game,
      buttonTypes.ARROW_DOWN,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
    this.arrowKeyLeft = new MoveButton(
      game,
      buttonTypes.ARROW_LEFT,
      this.moveControlsAnchorX,
      this.moveControlsAnchorY
    );
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
  }
}
