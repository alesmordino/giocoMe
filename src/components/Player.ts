import IPlayer from "./IPlayer";
import Level1 from "../scenes/Level1";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
    private _config: genericConfig;
    private _scene: Level1;
    public _body: Phaser.Physics.Arcade.Body;
    public _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _velocity: number = 200;
    public pause: boolean;
    public jmp: boolean;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    public static music: Phaser.Sound.BaseSound;
    private jumpSound: Phaser.Sound.BaseSound;
    private walkSound: Phaser.Sound.BaseSound;

    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { key: "move", frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 8, yoyo: false, repeat: -1 },
        { key: "idle", frames: [9], frameRate: 1, yoyo: false, repeat: -1 }
    ];

    public right: boolean;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y + 20, params.key);
        this._config = params;
        this.create();
        this.createAnimations();
        this.jumpSound = this.scene.sound.add("jump", { loop: false, volume: 0.8 });
        this.walkSound = this.scene.sound.add("walk", { loop: false, volume: 0.5 });
    }

    create() {
        this.jmp = true;
        this.right = true;
        this._scene = <Level1>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setAllowGravity(true).setAccelerationY(130).setGravityY(300);
        this._body.setCollideWorldBounds(true).setSize(32, 64);
        this._body.setOffset(0, 0);
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        this.setDepth(10).setScale(0.75);
        this.pause = false;
        this.keyA = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this._scene.add.existing(this);
    }

    createAnimations() {
        this._animations.forEach(element => {
            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("player", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                }
                this.anims.create(_animation);
            }
        });
    }

    update(time: number, delta: number) {
        if (this.scene != undefined && !this.pause) {
            if ((this._cursors.left.isDown || this.keyA.isDown) && !this.walkSound.isPlaying) {
                this.walkSound.play();
            } else if ((this._cursors.right.isDown || this.keyD.isDown) && !this.walkSound.isPlaying) {
                this.walkSound.play();
            } else if (!(this._cursors.left.isDown || this._cursors.right.isDown || this.keyA.isDown || this.keyD.isDown) && this.walkSound.isPlaying) {
                this.walkSound.stop();
            }

            if (this._cursors.up.isDown && this.jmp && !this.pause) {
                this.jmp = false;
                this._body.setVelocityY(-300);
                this.jumpSound.play();
            }

            if (!this._cursors.up.isDown)
                this.jmp = true;

            if (!this._cursors.left.isDown && !this._cursors.right.isDown && !this.keyA.isDown && !this.keyD.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown) {
                this._body.setVelocityX(0);
                this.anims.play('idle', true);
            } else {
                if (this._cursors.left.isDown || this.keyA.isDown) {
                    this._body.setOffset(5, 0);
                    this._body.setAccelerationY(130);
                    this.right = false;
                    this.setFlipX(true);
                    this.anims.play('move', true);
                    this._body.setVelocityX(-this._velocity);
                }

                if (this._cursors.right.isDown || this.keyD.isDown) {
                    this._body.setOffset(0, 0);
                    this._body.setAccelerationY(130);
                    this.right = true;
                    this.setFlipX(false);
                    this.anims.play('move', true);
                    this._body.setVelocityX(this._velocity);
                }
            }
        }
    }
}
