import Player from "../../js/objects/Player.js";

let score, tiempo;

export default class Level1 extends Phaser.Scene{
    constructor(){
        super('Level1');
    }
    init(data){
        score = data.score;
        tiempo = data.tiempo;
    }
    create(){
        const map = this.make.tilemap({key: 'map_level1'});
        const tiledBackgrounds = map.addTilesetImage("backgrounds_atlas", "tiledBackgrounds");
        const tiledPlataformas = map.addTilesetImage('lands_atlas', 'tiledLands');
        // const objectsLayer = map.getObjectLayer("Objetos");
        const objectsLayer = map.getObjectLayer("Objetos");

        map.createLayer('Sky', tiledBackgrounds, 0, 0)
        const plataforms = map.createLayer('Plataforms', tiledPlataformas, 0 ,0);

        plataforms.setCollisionByProperty({collides: true});

        const {x, y} = map.findObject('Objetos', (obj) => obj.name === 'player');
        const player = new Player(this, x, y, 'player-idle');

        this.physics.add.collider(player, plataforms);
    }
    update(){
        
    }
}