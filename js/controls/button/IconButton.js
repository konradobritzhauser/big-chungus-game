import Button from "./Button.js";


export default class IconButton extends Button{

    constructor(game, x, y, width, height,image) {
        super(game);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image=image
       
      }
    
      
}