import { globalVariables } from "../js/globalVariables.js";

export default class Preloading extends Phaser.Scene {
    constructor() {
        super("Preloading");
    }
    preload() {
        this.load.image(
            "bg_sky",
            "public/assets/images/Backgrounds/BackgroundCielo.png"
        );
        this.load.tilemapTiledJSON(
            "map_level1",
            "public/assets/tilemaps/Level1.json"
        );
        this.load.tilemapTiledJSON(
            "map_level2",
            "public/assets/tilemaps/Level2.json"
        );
        this.load.tilemapTiledJSON("map_level3", "public/assets/tilemaps/Level3.json")
        this.load.image(
            "tiledBackgrounds",
            "public/assets/tilemaps/atlas/backgrounds_atlas.png"
        );

        this.load.image(
            "tiledLands",
            "public/assets/tilemaps/atlas/lands_atlas.png"
        );
        this.load.image(
            "obj_zanahoria",
            "public/assets/images/Items/Zanahoria.png"
        );
        this.load.image(
            "obj_cerdito",
            "public/assets/images/Items/Cerdito.png"
        );
        this.load.spritesheet(
            "player-run",
            "public/assets/images/Player/RunSheet.png",
            { frameWidth: 64, frameHeight: 64 }
        );
        this.load.spritesheet(
            "player-idle",
            "public/assets/images/Player/IdleSheet.png",
            { frameWidth: 64, frameHeight: 64 }
        );
        this.load.image('bomba', 'public/assets/images/Items/Bomba.png');

        this.load.audio("music", "public/assets/sounds/Music.mp3");
        this.load.audio("jumpSound", "public/assets/sounds/Jump.mp3");
        this.load.audio("passLevel", "public/assets/sounds/passLevel.mp3");
        this.load.audio("death", "public/assets/sounds/death.mp3");
    }
    create() {
        this.add.image(400, 300, "bg_sky");
        this.add
            .text(400, 300, "Cargando...", {
                fontFamily: "Arial",
                fontSize: "25px",
                color: "white",
            })
            .setOrigin(0.5);
        setTimeout(()=>{
            this.scene.start("Level1", globalVariables);
        }, 3000)
    }
}
