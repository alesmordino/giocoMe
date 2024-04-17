export default class Intro extends Phaser.Scene {

  private logo:Phaser.GameObjects.Image;
  private playText:Phaser.GameObjects.Text;
  private creditsText:Phaser.GameObjects.Text;
  private howToPlayText:Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Intro",
    });
  }

  create() {
    
    let bg =this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on(
      "pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      this.scene.start("Level1");
    });
    this.playText=this.add.text(this.game.canvas.width/2, this.game.canvas.height - 100,"PREMI PER ENTRARE",{fontSize:"40px"}).setColor("#cccc98")
    .setDepth(1)
    .setFont('bold')
    .setOrigin(0.5,0.5).on("pointerdown",()=>{
      console.log("play");
      this.scene.start("Level1");
    });
    
    
    this.logo=this.add.image(this.game.canvas.width/2-9,130,"logo-game").setScale(0.85).setDepth(1);


  }


  update(time: number, delta: number): void {
    let bg=this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      this.scene.start("Level1");
    });
  }

}

