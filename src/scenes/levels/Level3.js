import Player from "../../js/objects/Player.js";

let score, tiempo, gameOver, cursors, player, textScore, textTime;
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
        const cerditoObj = map.findObject("Objetos", (data)=> data.name === "cerdito");
        const cerdito = this.physics.add.sprite(cerditoObj.x, cerditoObj.y, "obj_cerdito");
        cerdito.setCollideWorldBounds(true);
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
        const zanahorias = this.physics.add.group();

        objectsLayer.objects.forEach((objs) => {
            console.log(objs);
            switch (objs.type) {
                case "zanahorias":
                    zanahorias.create(objs.x, objs.y, "obj_zanahoria");
                    break;
            }
        });
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
        this.physics.add.collider(player, plataforms);
        this.physics.add.collider(zanahorias, plataforms);
        this.physics.add.collider(cerdito, plataforms);
        this.physics.add.overlap(player, zanahorias, this.collectCarrot, null, this);
        this.physics.add.overlap(player, cerdito, this.isWin, null, this);

        
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

        // setTimeout(()=>{
        // this.scene.start("Win", { score: score, tiempo: tiempo, gameOver: gameOver });
            
        // }, 1000)        
    }

    collectCarrot(player, carrot) {
        carrot.disableBody(true, true);
        score += 15;
        textScore.setText(`Puntos: ${score}`);
    }

    reloj() {
        tiempo -= 1;
        textTime.setText(`Tiempo: ${tiempo}`);
        if(tiempo === 0){
            gameOver = true;
        }
    }
    isWin(){
        this.scene.start("Win", { score: score, tiempo: tiempo, gameOver: gameOver });
    }
}
