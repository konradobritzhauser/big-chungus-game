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
  // let startMusic = function () {
  //   let audioTag = this.document.getElementById("main-menu-music");
  //   audioTag.play();
  //   window.removeEventListener("click", startMusic);
  // };
  // this.document.getElementById("main-menu-music").play();
  // this.window.addEventListener("click", startMusic);

  class Particle {}

  class Layer {}

  class Background {}

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

        if (element.disabled == true) {
            //check if button is disabled
            console.log("clicked on button but disabled");

            return;
          }

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

  //CLICK FOR DESKTOP
  const isMobile = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  if (!isMobile()) {
    this.addEventListener("click", (e) => {
      console.log("Canvas clicked");
      console.log("e", e);

      //get canvas current scale size
      let canvasDOMRectList = canvas.getClientRects();
      let canvasRealWidth = canvasDOMRectList[0].width;
      let canvasRealHeight = canvasDOMRectList[0].height;
      console.log("canvasRealWidth", canvasRealWidth);
      console.log("canvasRealHeight", canvasRealHeight);

      let mouseX = e.x;
      let mouseY = e.y;
      // let event=await e.touches[0]
      // let mouseX = e.changedTouches[0].clientX;
      // let mouseY = e.changedTouches[0].clientY;

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
        let isClicked = this.game.checkCollision(
          element,
          this.game.lastClickBox
        );
        if (isClicked) {
          console.log(element, "is clicked");
          if (element.disabled == true) {
            //check if button is disabled
            console.log("clicked on button but disabled");

            return;
          } else {
            element.mousedown();
          }
        }
      });
    });
  }

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

  //manage in game

  //overall game
  const game = new Game(canvas.width, canvas.height);
  window.game = game;
  let lastTime = 0;
  

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

  // this.setTimeout(()=>{
  // game.startGame()
  // },2000)
});
