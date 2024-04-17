import Player from "../components/Player";
import PauseHud from "./PauseHud";
import Keypad from "./keypad";
export default class Level1 extends Phaser.Scene {
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
    private keyEsc: any;
    private initialAlpha: number = 0.5;
    private elapsedTime: number = 0;
    constructor() {
        super({
            key: "Level1",
        });
    }

    preload() {
        PauseHud.setLevel(1);
        this.scene.setVisible(true, "Level1");
        this.scene.setVisible(true, "Keypad");
        this.scene.add("Keypad", Keypad);
        this.player = new Player({ scene: this, x: 55, y: 55, key: "player" });
        this.physics.add.existing(this.player);
        Level1.music = this.sound.add("music0", { loop: true, volume: 0.3 });
        Level1.music.play();
        this.map = this.make.tilemap({ key: "level-1" });
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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

        this.tileset = this.map.addTilesetImage("tilemap-extruded");
        this.layer = this.map
            .createLayer("world", this.tileset, 0, 0)
            .setDepth(3)
            .setAlpha(1);
        this.layer2 = this.map
            .createLayer("collisions", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layerEnd = this.map
            .createLayer("end", this.tileset, 0, 0)
            .setDepth(1)
            .setAlpha(1);
        this.layer2.setCollisionByProperty({ collide: true });
        this.layerEnd.setCollisionByProperty({ collide: true });
        this.createCollider();
         // Imposta l'opacità iniziale dei layer della mappa
         this.layer.setAlpha(this.initialAlpha);
         this.layer2.setAlpha(this.initialAlpha);
         this.layerEnd.setAlpha(this.initialAlpha);

        this.scene.launch("Overlay");
    }

    create() {
        console.log("create:Level1");
        this.add.image(1024, 0, "log").setOrigin(1, 0).setDepth(14).setScale(0.3).setAlpha(1).setScrollFactor(0);
        
    }

    createCollider() {
        // Collider per il layer di collisione generale
        this.physics.add.collider(this.player, this.layer2, (_player: any, _tile: any) => {
            // Azioni quando il giocatore collide con il layer "collisions"
        }, undefined, this);
       // Collider per il layer "end"
this.physics.add.collider(this.player, this.layerEnd, (_player: any, _tile: any) => {
    this.scene.launch('Keypad');
    console.log("hitted end");
    Level1.completed= true;
}, undefined, this);

// Aggiungi un listener per l'evento 'wake' sulla scena del tastierino
this.scene.get('Keypad').events.on('wake', () => {
    // Rimuovi la scena corrente dallo schermo
    this.scene.remove('Keypad');

});
    }

    update(time: number, delta: number): void {
         // Incrementa il tempo trascorso
         this.elapsedTime += delta;

         // Esegui un'azione ogni tot millisecondi
         if (this.elapsedTime >= 1000) {
             // Aumenta l'opacità dei layer della mappa
             this.layer.setAlpha(Math.min(1, this.layer.alpha + 3));
             this.layer2.setAlpha(Math.min(1, this.layer2.alpha + 3));
             this.layerEnd.setAlpha(Math.min(1, this.layerEnd.alpha + 3));
 
             // Resetta il tempo trascorso
             this.elapsedTime = 0;
         }

        if (Keypad.success) {
            Keypad.success = false;
            // Carica il livello successivo
            this.player.setX(55);
            this.player.setY(55);
            this.scene.stop('Level1');
            Level1.music.destroy();
            this.scene.run('Intro');
        }else{
            if(Level1.completed && Keypad.currentNumber != "10" && Keypad.isEnter){
                this.player.setX(55);
                this.player.setY(55);
                this.scene.stop('Keypad');
                Keypad.isEnter = false;
                Keypad.currentNumber = '';
            }
        }
      
        this.player.update(time, delta);

        if (this.keyEsc.isDown) {
            this.player.pause = true;
            Level1.music.stop()
            this.scene.launch("PauseHud");
            this.scene.pause();
            this.time.addEvent({
                delay: 100, loop: false, callback: () => {
                    this.player.pause = false;
                }, callbackScope: this
            });
        }
    }
}
