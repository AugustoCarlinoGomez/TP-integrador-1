export default class LevelCompletedScene extends Phaser.Scene {
  constructor() {
    super("level-completed-scene");
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Título
    this.add.text(400, 120, "NIVEL COMPLETADO", {
      fontSize: "56px",
      fill: "#00ff00",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Botón SIGUIENTE NIVEL
    const nextButton = this.add.rectangle(300, 360, 220, 60, 0x4444ff);
    nextButton.setStrokeStyle(3, 0xffffff);
    nextButton.setInteractive({ useHandCursor: true });

    this.add.text(300, 360, "SIGUIENTE NIVEL", {
      fontSize: "24px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    nextButton.on("pointerover", () => {
      nextButton.setFillStyle(0x3333dd);
    });
    nextButton.on("pointerout", () => {
      nextButton.setFillStyle(0x4444ff);
    });

    // Botón ELEGIR NIVEL
    const selectButton = this.add.rectangle(500, 360, 220, 60, 0xff8800);
    selectButton.setStrokeStyle(3, 0xffffff);
    selectButton.setInteractive({ useHandCursor: true });

    this.add.text(500, 360, "ELEGIR NIVEL", {
      fontSize: "24px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    selectButton.on("pointerdown", () => {
      this.scene.start("level-select-scene");
    });

    selectButton.on("pointerover", () => {
      selectButton.setFillStyle(0xff7700);
    });
    selectButton.on("pointerout", () => {
      selectButton.setFillStyle(0xff8800);
    });
  }
}
