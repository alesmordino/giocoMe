import Level1 from "./Level1";

export default class Legenda extends Phaser.Scene{
    private continua :Phaser.GameObjects.Image;
    private esci: Phaser.GameObjects.Image;
    private base: Phaser.GameObjects.Image;

    private static level:integer;
    constructor(level:integer) {
        super({
        key: "Legenda",
        });

    }

    create(){
        this.scene.bringToTop();
        this.base=this.add.image(1024/2,300+15,"legenda").setOrigin(0.5,0.5).setDepth(12).setAlpha(1);

        
    };
}