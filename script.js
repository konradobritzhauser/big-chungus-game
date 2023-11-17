import { buttonTypes, keyStrings } from "./js/constants/buttons.js";
import Game from "./js/game/Game.js";


window.addEventListener("load", function () {
  //canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;

  //START MUSIC
  //play on first click to screen
  let startMusic=function(){
    let audioTag=this.document.getElementById("inGameMusic")
    audioTag.play()
    window.removeEventListener('click',startMusic)
  }
this.document.getElementById("inGameMusic").play()
  this.window.addEventListener('click',startMusic)
  this.window.addEventListener('keydown',startMusic)
  
  
  

  

  class Particle {}

  

  
  

  

  
  

  

  class Layer {}

  class Background {}

  const game = new Game(canvas.width, canvas.height);
  window.game = game;
  let lastTime = 0;

  //ADD CLICK BEHAVIOR

  canvas.addEventListener("touchstart", (e) => {
    console.log("Canvas clicked");
    console.log("e", e);

    //get canvas current scale size
    let canvasDOMRectList = canvas.getClientRects();
    let canvasRealWidth = canvasDOMRectList[0].width;
    let canvasRealHeight = canvasDOMRectList[0].height;
    console.log("canvasRealWidth", canvasRealWidth);
    console.log("canvasRealHeight", canvasRealHeight);

    // let mouseX = e.x;
    // let mouseY = e.y;
    // let event=await e.touches[0]
    let mouseX = e.changedTouches[0].clientX;
    let mouseY = e.changedTouches[0].clientY;

    console.log("mouseX", mouseX);
    console.log("mouseY", mouseY);

    let scaledX = (mouseX * canvas.width) / canvasRealWidth;
    console.log("scaledX", scaledX);

    let scaledY = (mouseY * canvas.height) / canvasRealHeight;
    console.log("scaledY", scaledY);

    this.game.lastClickBox.x = scaledX;
    this.game.lastClickBox.y = scaledY;

    // let clickBox = this.game.clickBox;
    // console.log("clickBox.x", clickBox.x);
    // console.log("clickBox.y", clickBox.y);

    let clickableElements = this.game.clickableElements;
    clickableElements.forEach((element) => {
      let isClicked = this.game.checkCollision(element, this.game.lastClickBox);
      if (isClicked) {
        console.log(element, "is clicked");
        element.mousedown();
        let touchIdentifier = e.changedTouches[0].identifier;

        const handleTouchEnd = (e) => {
          //get canvas current scale size
          console.log("handling touchend");

          // let mouseX = e.x;
          // let mouseY = e.y;
          console.log("e", e);
          console.log("element", element);
          console.log(
            "touchend change identifier",
            e.changedTouches[0].identifier
          );

          //IF CORRECT TOUCH EVENT
          if (e.changedTouches[0].identifier == touchIdentifier) {
            console.log("click for ended for", element);
            element.mouseup();
            canvas.removeEventListener("touchend", handleTouchEnd);
          }
        };
        //add and remove touchend event listener
        canvas.addEventListener("touchend", handleTouchEnd);
      }
    });
  });

  //KEEP TO MAKE IT GLOBAL. HAS ISSUE WHEN THERE ARE MULTIPLE TOUCHES AT THE SAME TIME
  // canvas.addEventListener("touchend", (e) => {
  //   //get canvas current scale size
  //   let canvasDOMRectList = canvas.getClientRects();
  //   let canvasRealWidth = canvasDOMRectList[0].width;
  //   let canvasRealHeight = canvasDOMRectList[0].height;
  //   console.log("canvasRealWidth", canvasRealWidth);
  //   console.log("canvasRealHeight", canvasRealHeight);

  //   // let mouseX = e.x;
  //   // let mouseY = e.y;
  //   console.log('e', e)
  //   let mouseX = e.changedTouches[0].clientX
  //   let mouseY = e.changedTouches[0].clientY

  //   console.log("mouseX", mouseX);
  //   console.log("mouseY", mouseY);

  //   let scaledX = (mouseX * canvas.width) / canvasRealWidth;
  //   console.log("scaledX", scaledX);

  //   let scaledY = (mouseY * canvas.height) / canvasRealHeight;
  //   console.log("scaledY", scaledY);

  //   // this.game.lastClickBox.x = scaledX;
  //   // this.game.lastClickBox.y = scaledY;

  //   // let clickBox = this.game.clickBox;
  //   // console.log("clickBox.x", clickBox.x);
  //   // console.log("clickBox.y", clickBox.y);

  //   let clickableElements = this.game.clickableElements;
  //   clickableElements.forEach((element) => {
  //     let isClicked = this.game.checkCollision(element, this.game.lastClickBox);
  //     if (isClicked) {
  //       console.log(element, "is clicked");
  //       //trigger click method
  //       element.mouseup();
  //     }
  //   });
  // });

  //animate loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log('deltaTime', deltaTime)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
