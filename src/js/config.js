import Level1 from "../scenes/levels/Level1.js";
import Level2 from "../scenes/levels/Level2.js";
import Level3 from "../scenes/levels/Level3.js";
import Menu from "../scenes/Menu.js";
import Preloading from "../scenes/Preloading.js";
import Win from "../scenes/Win.js";



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
    scene: [Menu, Preloading, Level1, Level2, Level3, Win]
}