import Player from "../../js/objects/Player.js";
import isGameOver from "../../js/functions/isGameOver.js";

let score,
    tiempo,
    gameOver,
    cursors,
    player,
    textScore,
    textTime,
    zanahorias,
    bombas;
export default class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3");
    }
    init(data) {
        score = data.score;
        tiempo = data.tiempo;
        gameOver = data.gameOver;
    }
    create() {
        const map = this.make.tilemap({ key: "map_level3" });
        const tiledBackgrounds = map.addTilesetImage(
            "backgrounds_atlas",
            "tiledBackgrounds"
        );
        const tiledPlataformas = map.addTilesetImage(
            "lands_atlas",
            "tiledLands"
        );
        const objectsLayer = map.getObjectLayer("Objetos");

        map.createLayer("Sky", tiledBackgrounds, 0, 0);
        const cerditoObj = map.findObject(
            "Objetos",
            (data) => data.name === "cerdito"
        );
        const cerdito = this.physics.add.sprite(
            cerditoObj.x,
            cerditoObj.y,
            "obj_cerdito"
        );
        cerdito.setCollideWorldBounds(true);
        this.tweens.add({
            targets: cerdito,
            x: 200,
            duration: 1500,
            ease: "Sine.easeInOut",
            repeat: -1,
            yoyo: true,
        });
        const plataforms = map.createLayer(
            "Plataforms",
            tiledPlataformas,
            0,
            0
        );

        plataforms.setCollisionByProperty({ collides: true });

        cursors = this.input.keyboard.createCursorKeys();

        //Player
        const { x, y } = map.findObject(
            "Objetos",
            (obj) => obj.name === "player"
        );

        player = new Player(this, x, y, "player-idle");

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
        zanahorias = this.physics.add.group();

        objectsLayer.objects.forEach((objs) => {
            console.log(objs);
            switch (objs.type) {
                case "zanahorias":
                    zanahorias.create(objs.x, objs.y, "obj_zanahoria");
                    break;
            }
        });
        bombas = this.physics.add.group();

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
            callback: this.onSeconds,
            callbackScope: this,
            loop: true,
        });
        this.physics.add.collider(player, plataforms);
        this.physics.add.collider(zanahorias, plataforms);
        this.physics.add.collider(bombas, plataforms);

        this.physics.add.collider(cerdito, plataforms);
        this.physics.add.overlap(
            player,
            zanahorias,
            this.collectCarrot,
            null,
            this
        );
        this.physics.add.overlap(player, bombas, this.hitBomba, null, this);

        this.physics.add.overlap(player, cerdito, this.isWin, null, this);
        this.initSounds();
    }
    update() {
        if (gameOver) {
            this.deathSFX.play();
            this.sound.removeByKey("music");
            isGameOver(this, { score, tiempo, gameOver }, player);
            return;
        }
        if (cursors.left.isDown) {
            player.runLeft();
        } else if (cursors.right.isDown) {
            player.runRight();
        } else {
            player.setVelocityX(0);
            player.anims.play("idle", true);
        }
        if (cursors.up.isDown && player.body.blocked.down) {
            player.saltar(this.jumpSoundSFX);
        }
    }

    collectCarrot(player, carrot) {
        carrot.disableBody(true, true);
        score += 15;
        textScore.setText(`Puntos: ${score}`);

        bombas.createMultiple({ key: "bomba", repeat: 1 });
        bombas.children.iterate((bomb) => {
            bomb.setScale(0.5).refreshBody();
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.setX(Phaser.Math.FloatBetween(100, 700));
            bomb.allowGravity = false;
        });
    }
    hitBomba(player, bomba) {
        player.setTint(0xff0000);
        bomba.setTint(0xff0000);
        gameOver = true;
    }
    onSeconds() {
        tiempo -= 1;
        textTime.setText(`Tiempo: ${tiempo}`);
        if (tiempo <= 0) {
            gameOver = true;
        }
    }
    isWin() {
        if (zanahorias.countActive(true) === 0) {
            this.passLevelSFX.play();
            this.sound.removeByKey("music");
            this.scene.start("Win", {
                score: score,
                tiempo: tiempo,
                gameOver: gameOver,
            });
        }
    }
    initSounds(volume = 0.3) {
        this.sound.volume = volume;
        this.sound.add("music", { loop: true, volume: 0.2 }).play();
        this.jumpSoundSFX = this.sound.add("jumpSound");
        this.passLevelSFX = this.sound.add("passLevel");
        this.deathSFX = this.sound.add("death");
    }
}
