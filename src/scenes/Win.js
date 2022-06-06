let score, tiempo, gameOver, keyR;
export default class Win extends Phaser.Scene{
    constructor(){
        super("Win");
    }
    init(data){
        score = data.score;
        tiempo = data.tiempo;
        gameOver = data.gameOver
    }
    create(){
        this.add.text(400, 300, `Ganaste! \nTus puntos son: ${score}`);
        this.add.text(0, 0, `Presionar "R" para volver al principal`);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(keyR.isDown){
            this.scene.start("Menu");
        }
    }
}