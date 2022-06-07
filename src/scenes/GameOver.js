let score, tiempo, gameOver, keyR;
export default class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }
    init(data){
        score = data.score;
        tiempo = data.tiempo;
        gameOver = data.gameOver;
    }
    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.text(400, 300, `Perdiste! \nTus puntos son: ${score}\nTu tiempo: ${tiempo}`).setOrigin(0.5)
        this.add.text(400, 400, `Presionar "R" para volver al principal`).setOrigin(0.5)
    }
    update(){
        if(keyR.isDown){
            gameOver = false;
            this.scene.start("Menu");
        }
    }
}