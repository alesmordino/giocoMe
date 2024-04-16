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

  preload() {
  }
  create() {
    let bg=this.add.image(0, 0,"principale").setOrigin(0,0).setDepth(0).setDisplaySize(this.game.canvas.width, this.game.canvas.height).setInteractive().on("pointerdown",()=>{
      console.log("premi sulla porta per iniziare ");
      music.destroy();
      this.scene.start("Level1");
    });
;
    let music: Phaser.Sound.BaseSound=this.sound.add("music0",{loop:true,volume:0.4});
    music.play();
    this.logo=this.add.image(this.game.canvas.width/2-9,130,"logo-game").setScale(0.85).setDepth(1);
    this.playText=this.add.text(this.game.canvas.width/2-5,230,"PREMI SULLA PORTA",{fontSize:"34px"})
    .setColor("White")
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

  createCredits(){
    this.creditsText.setInteractive(false);
    let base:Phaser.GameObjects.Image=this.add.image(this.game.canvas.width/2,300,"credits").setOrigin(0.5,0.5).setDepth(12).setInteractive().on("pointerdown",()=>{
      base.destroy();
      this.creditsText.setInteractive(true);
    });       
  }

  createHow(){
    this.howToPlayText.setInteractive(false);
    let base:Phaser.GameObjects.Image=this.add.image(this.game.canvas.width/2,300,"comeGiocare").setOrigin(0.5,0.5).setDepth(12).setInteractive().on("pointerdown",()=>{
      base.destroy();
      this.howToPlayText.setInteractive(true);
    });       
  }

  update(time: number, delta: number): void {

  }

}

