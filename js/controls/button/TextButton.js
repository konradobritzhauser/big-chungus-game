import Button from "./Button.js";

export default class TextButton extends Button {
  constructor(game, x, y, width, height, text) {
    super(game);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.backgroundColor = "rgba(0,0,0,0)";
    this.textColor = "white";
  }

  draw(context) {
    context.fillStyle = this.backgroundColor;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.save()
    context.fillStyle = this.textColor;
    context.font = `20px Beyonders`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.text, this.x+this.width/2, this.y + this.height/2);

    context.restore()
  }
}
