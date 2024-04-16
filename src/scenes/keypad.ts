
export default class Keypad extends Phaser.Scene{

    private base: Phaser.GameObjects.Image;
    private static level:integer;
    constructor(level:integer) {
        super({
        key: "Keypad",
        });
        
    }

    preload() {}

    create(){ 
        this.scene.bringToTop();
        this.base=this.add.image(1024/2,300+15,"base").setOrigin(0.5,0.5).setDepth(12).setAlpha(1)
    };

    update(time: number, delta: number): void {
    };
}