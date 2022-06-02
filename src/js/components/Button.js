export default class Button {
    constructor(scene, x, y, text, callback) {
        scene.add
            .text(x, y, text, {
                fontFamily: "Arial",
                fontSize: "32px",
                color: "white",
                fontStyle: "bold",
                backgroundColor: "white",
                color: "black",
                padding: 10,
            })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on("pointerdown", () => callback());
    }
}
