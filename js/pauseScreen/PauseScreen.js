import TextButton from "../controls/button/TextButton.js"

export default class PauseScreen{
    constructor(game){
        this.game=game
        this.width=this.game.width
        this.height=this.game.height

        this.isShown=false

        this.resumeBtn=new TextButton(this.game,this.width/2-100,this.height/2-100,150,90,"Resume")
        this.resumeBtn.mousedown=()=>{
            this.game.inGame.unpauseGame()
            this.hide()
        }
        this.resumeBtn.disabled=true

        this.quitGameBtn= new TextButton(this.game,this.width/2-100,this.height/2,200,90,"Quit Game")
        this.quitGameBtn.mousedown=()=>{
            this.game.quitGame()
            this.hide()
        }
        this.quitGameBtn.disabled=true


        this.buttonsArr=[this.quitGameBtn,this.resumeBtn]


        

    }

    update(){
        
    }
    draw(context){
        if(this.isShown==false)return
        //black overlay
        context.globalAlpha = 0.4;
        context.fillStyle="rgba(0,0,0)"
        context.fillRect(0,0,this.width,this.height)
        context.globalAlpha = 1.0;

        this.resumeBtn.draw(context)
        this.quitGameBtn.draw(context)
    }

    show(){
        this.isShown=true
        this.resumeBtn.disabled=false
        this.quitGameBtn.disabled=false
    }

    hide(){
        this.isShown=false
        this.resumeBtn.disabled=true
        this.quitGameBtn.disabled=true

    }
}