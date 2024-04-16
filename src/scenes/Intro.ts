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
    let bg=this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      music.destroy();
      this.scene.start("Level1");
    });

    let music: Phaser.Sound.BaseSound=this.sound.add("music0",{loop:true,volume:0.4});
    music.play();
    this.logo=this.add.image(this.game.canvas.width/2-9,130,"logo-game").setScale(0.85).setDepth(1);
    this.playText=this.add.text(this.game.canvas.width/2-5,230,"PREMI SULLA PORTA",{fontSize:"34px"})
    .setColor("#cccc98")
    .setFontStyle("bold")
    .setDepth(1)
    .setOrigin(0.5,-10.5)
    .setInteractive()
    .on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      music.destroy();
      this.scene.start("Level1");
    });

  }


  update(time: number, delta: number): void {
    let bg=this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      this.scene.start("Level1");
    });
  }

}

