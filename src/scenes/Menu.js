import Button from "../js/components/Button.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.image(
            "bg_menu",
            "public/assets/images/Backgrounds/MenuBackground.png"
        );
    }
    create() {
        this.add.image(400, 300, "bg_menu");
        new Button(
            this,
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 + 100,
            "Jugar",
            () => this.scene.start("Preloading")
        );

    }
}
