export default class Button {
    constructor(game, type) {
      this.game = game;
      this.type = type;
      this.game.clickableElements.push(this);
    }
    update() {
      //HANDLE BEHAVIOR WHEN CLICKED
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    mousedown() {
      if (
        this.type == buttonTypes.ARROW_UP ||
        this.type == buttonTypes.ARROW_RIGHT ||
        this.type == buttonTypes.ARROW_DOWN ||
        this.type == buttonTypes.ARROW_LEFT
      ) {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: this.type }));
      }else if(this.type==buttonTypes.ACTION_1)window.dispatchEvent(new KeyboardEvent("keydown", { key: '1' }));
       else if(this.type==buttonTypes.ACTION_2)window.dispatchEvent(new KeyboardEvent("keydown", { key: '2' }));
       else if(this.type==buttonTypes.ACTION_3)window.dispatchEvent(new KeyboardEvent("keydown", { key: '3' }));
       else if(this.type==buttonTypes.SPECIAL_ACTION_1)window.dispatchEvent(new KeyboardEvent("keydown", { key: 'q' }));
      
    }
    mouseup() {
      if (
        this.type == buttonTypes.ARROW_UP ||
        this.type == buttonTypes.ARROW_RIGHT ||
        this.type == buttonTypes.ARROW_DOWN ||
        this.type == buttonTypes.ARROW_LEFT
      ) {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: this.type }));
      }
    }
  }