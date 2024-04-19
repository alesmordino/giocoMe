import Player from "../components/Player";
import Intro from "./Intro";

export default class Level3 extends Phaser.Scene { 
    private mainCam: Phaser.Cameras.Scene2D.Camera;
    private player: Player;
    private log :Phaser.GameObjects.Image;
    public static music: Phaser.Sound.BaseSound;
    public static completed: boolean;
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private layer2: Phaser.Tilemaps.TilemapLayer;
    private layerEnd: Phaser.Tilemaps.TilemapLayer;
    static isCompleted: boolean;

    constructor() {
        super({
            key: "Level3",
        });
    }

    preload() {
      
        
        this.player = new Player({ scene: this, x: 55, y: 55, key: "player" });
       
        this.physics.add.existing(this.player);
        this.map = this.make.tilemap({ key: "level-3" });

        this.mainCam = this.cameras.main;
        this.mainCam.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );
        this.mainCam.startFollow(this.player);
        this.physics.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );
        this.tileset = this.map.addTilesetImage("tilemap-extruded.png");
        this.layer = this.map
            .createLayer("world", this.tileset, 0, 0)
            .setDepth(3)
            .setAlpha(1);
        this.layer2 = this.map
            .createLayer("collisions", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);

        //this.layerEnd = this.map.createLayer("end", this.tileset, 0, 0).setDepth(1).setAlpha(1);

        this.layer2.setCollisionByProperty({ collide: true });
        //this.layerEnd.setCollisionByProperty({ collide: true });

        this.createCollider();
        
    }
    create(){
        console.log("create:Level2");
        this.add.image(1024, 0, "log").setOrigin(1, 0).setDepth(14).setScale(0.3).setAlpha(1).setScrollFactor(0);

    }
    createCollider() {
        // Collider per il layer di collisione generale
        this.physics.add.collider(this.player, this.layer2, (_player: any, _tile: any) => {
            // Azioni quando il giocatore collide con il layer "collisions"
        }, undefined, this);
       // Collider per il layer "end"
this.physics.add.collider(this.player, this.layerEnd, (_player: any, _tile: any) => {
    console.log("hitted end");
    Level3.completed= true;
}, undefined, this);


    }
    update(time: number, delta: number): void {
     if(Level3.isCompleted){
        console.log("o fratm")
     }
    }
}