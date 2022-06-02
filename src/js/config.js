import Level1 from "../scenes/levels/Level1.js";
import Menu from "../scenes/Menu.js";
import Preloading from "../scenes/Preloading.js";



export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },
    scene: [Menu, Preloading, Level1]
}