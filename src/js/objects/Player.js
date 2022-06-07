export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        console.log("Se crea el player");

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(0.5);
    }
    runRight(){
        this.setVelocityX(160).setFlipX(false);
        this.anims.play("run", true);
    }
    runLeft(){
        this.setVelocityX(-160).setFlipX(true);
        this.anims.play("run", true);
    }
    saltar(sound){
        sound.play();
        this.setVelocityY(-260);
    }
}
