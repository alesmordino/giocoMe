import Level1 from "./Level1";
import Level2 from "./Level2";
import PortaScene from "./PortaScene";

export default class Intro extends Phaser.Scene {

  private logo:Phaser.GameObjects.Image;
  private playText:Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Intro",
    });
  }

  create() {
    this.scene.add("PortaScene", PortaScene);
    let bg =this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on(
      "pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      if(Level2.music.isPlaying)
        Level2.music.stop();
      if(Level1.music.isPlaying)
        Level1.music.stop();

      this.scene.start("PortaScene");
    });
   /*  this.playText=this.add.text(this.game.canvas.width/2-5,230,"PREMI SULLA PORTA",{fontSize:"40px"})
    .setColor("#e6080f")
    .setFontStyle("bold")
    .setDepth(1)
    .setOrigin(0.5,-8)
    .setInteractive()
    .on("pointerdown",()=>{
      console.log("play");
      if(Level2.music.isPlaying)
        Level2.music.stop();
      if(Level1.music.isPlaying)
        Level1.music.stop();

      this.scene.start("PortaScene");
    }); */

    this.logo=this.add.image(this.game.canvas.width/2-9,60,"logo-game").setScale(0.23).setDepth(1).setOrigin(0.5);

  }


  update(time: number, delta: number): void {
    let bg=this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      this.scene.start("PortaScene");
    });
  }

}