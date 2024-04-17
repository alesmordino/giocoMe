import IPlayer from "./IPlayer";
//Importiamo la scena di gameplay in modo da potervi accedere
import Level1 from "../scenes/Level1";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
	private _config: genericConfig;
	//riferimento alla scena dove il nostro game object verrà inserito
	private _scene: Level1;
	//variabile locale di tipo arcade.body per poter accedere ai metodi del Body
	// descritti nel capitolo 7
	public _body: Phaser.Physics.Arcade.Body;
	//variabile locale per la gestione dei tasti cursore come visto nel capitolo 6
	public _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	//variabile locale per impostare la velocità del body
	private _velocity: number =500;
    public pause:boolean;
    //public jmp:boolean;
    private keyA:Phaser.Input.Keyboard.Key;
    private keyD:Phaser.Input.Keyboard.Key;

	//array di oggetti per la creazione dell’animazione
	private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
	{ key: "move", frames: [0, 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15], frameRate: 10, yoyo: false, repeat: -1 },
	{ key: "idle", frames: [0], frameRate: 1, yoyo: false, repeat: -1 }
	];

    public right:boolean;

    constructor(params: genericConfig) {
            super(params.scene, params.x, params.y+20, params.key);
                this._config = params;
                //richiamiamo il metodo create nel quale sono inserite alcune
                // inizializzazioni della nostra classe custom
                this.create();
                //richiamiamo un metodo locale per implementare le animazioni dello
                // sprite
                this.createAnimations();
            }

            create() {
                // Imposta il riferimento alla scena
                this._scene = <Level1>this._config.scene;
            
                // Abilita la fisica per il giocatore e ottieni il suo corpo fisico
                this._scene.physics.world.enable(this);
                this._body = <Phaser.Physics.Arcade.Body>this.body;
            
                // Imposta la gravità a zero per il corpo del giocatore
                this._body.setAllowGravity(false);
            
                // Imposta la collisione con i bordi del mondo di gioco
                this._body.setCollideWorldBounds(true);
            
                // Imposta le dimensioni e l'offset del corpo del giocatore
                this._body.setSize(32, 60);
                this._body.setOffset(0, 0);
            
                // Crea i tasti cursore per il movimento
                this._cursors = this._scene.input.keyboard.createCursorKeys();
                this.keyA = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                this.keyD = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            
                // Aggiunge il giocatore alla scena
                this._scene.add.existing(this);
            
                // Imposta altre proprietà del giocatore
                this.setDepth(10).setScale(0.85);
                this.pause = false;
            
                // Crea le animazioni per il giocatore
                this.createAnimations();
            }
            
	
	createAnimations() {
		//creazione dell’animazione come visto nei capitoli precedenti
		this._animations.forEach(element => {
		
			if (!this._scene.anims.exists(element.key)) {
				let _animation:Phaser.Types.Animations.Animation={
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("player", { frames: element.frames }),
                    frameRate:element.frameRate,
                    yoyo:element.yoyo,
                    repeat:element.repeat
                }
                this.anims.create(_animation);
			}
		});

	}
    update(time: number, delta: number) {
        if(this.scene!=undefined&&!this.pause){
            if (this._cursors.left.isDown) {
                this._body.setOffset(5,0);
                this._body.setAccelerationY(0);
                this.right=false;
                this.setFlipX(true);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityX(-this._velocity);
                }
            //se il il cursore destro è premuto
            if (this._cursors.right.isDown) {
                this._body.setOffset(0,0);               
                this._body.setAccelerationY(0);
                this.right=true;
                this.setFlipX(false);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità x in modo da far muovere il player
                this._body.setVelocityX(this._velocity);
            }
            
            //se il il cursore in alto è premuto
            if (this._cursors.up.isDown) {
                this._body.setAccelerationY(130);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità y in modo da far muovere il player
                this._body.setVelocityY(-this._velocity);
                this.anims.play('idle', true);
            }
            
             //se il il cursore in basso è premuto
             if (this._cursors.down.isDown) {
                this._body.setAccelerationY(-130);
                //effettua il play dell'animazione
                this.anims.play('move', true);
                //setta la velocità y in modo da far muovere il player
                this._body.setVelocityY(this._velocity);
                this.anims.play('idle', true);
            }

            if (!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown&&!this.keyA.isDown&&!this._cursors.space.isDown&&!this.keyD.isDown) {                  
                this._body.setVelocityX(0);  
                this._body.setVelocityY(0);
              
                this.anims.play('idle', true);
            }
        }
    }

}
