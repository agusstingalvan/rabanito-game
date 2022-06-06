import Player from "../../js/objects/Player.js";

let score, tiempo, cursors, player, textScore, textTime, scene;
export default class LevelContainer {
    constructor(scene, data) {
        score = data.score;
        tiempo = data.tiempo;   
        scene = scene  
    }
    create() {
        const map = scene.make.tilemap({ key: "map_level1" });
        const tiledBackgrounds = map.addTilesetImage(
            "backgrounds_atlas",
            "tiledBackgrounds"
        );
        const tiledPlataformas = map.addTilesetImage(
            "lands_atlas",
            "tiledLands"
        );

        map.createLayer("Sky", tiledBackgrounds, 0, 0);
        const plataforms = map.createLayer(
            "Plataforms",
            tiledPlataformas,
            0,
            0
        );

        plataforms.setCollisionByProperty({ collides: true });

        cursors = this.input.keyboard.createCursorKeys();

        textScore = this.add
            .text(780, 10, "Puntos: 0", {
                font: "18px Arial",
                backgroundColor: "#0f3f30",
                padding: 5,
            })
            .setOrigin(1, 0);

        textTime = this.add
            .text(20, 10, `Tiempo: ${tiempo}`, {
                font: "13px Arial",
                backgroundColor: "#0f3f30",
                padding: 5,
            })
            .setOrigin(0, 0);

        this.time.addEvent({
            delay: 1000,
            callback: this.reloj,
            callbackScope: this,
            loop: true,
        });

        //Player
        const spawnPlayer = map.findObject(
            "Objetos",
            (obj) => obj.name === "player"
        );

        player = new Player(this, spawnPlayer.x, spawnPlayer.y, "player-idle");

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player-run", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        player.anims.play("idle");

        this.physics.add.collider(player, plataforms);
    }
    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160).setFlipX(true);
            player.anims.play("run", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160).setFlipX(false);
            player.anims.play("run", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("idle", true);
        }
        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-260);
        }

    }


    reloj() {
        tiempo -= 1;
        textTime.setText(`Tiempo: ${tiempo}`);
    }
}
