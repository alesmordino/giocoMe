import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import { GameData } from "./GameData";
import LevelSelection from "./scenes/LeverSelection";
import Level1  from "./scenes/Level1";
import PauseHud from "./scenes/PauseHud";

window.addEventListener("load", () => {

  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      Intro,
      Level1,
      PauseHud,
    ],

    physics: {
      default: "arcade",
      arcade: {
        debug: GameData.globals.debug
      }
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  const game = new Phaser.Game(config);


});
