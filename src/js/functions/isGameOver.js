export default function isGameOver(scene, data, player){
    scene.physics.pause();
    player.setTint(0xff0000);
    scene.scene.start("GameOver", data);
    return;
}