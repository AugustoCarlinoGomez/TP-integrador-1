export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over-scene");
  }

  init(data) {
    // Recibir datos del juego anterior
    this.finalScore = data.score || 0;
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Título GAME OVER
    this.add.text(400, 120, "GAME OVER", {
      fontSize: "72px",
      fill: "#ff0000",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Mostrar puntuación
    this.add.text(400, 220, "Score: " + Math.floor(this.finalScore), {
      fontSize: "48px",
      fill: "#ffff00",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Botón REINTENTAR
    const retryButton = this.add.rectangle(300, 380, 180, 60, 0x00ff00);
    retryButton.setStrokeStyle(3, 0xffffff);
    retryButton.setInteractive({ useHandCursor: true });

    this.add.text(300, 380, "REINTENTAR", {
      fontSize: "24px",
      fill: "#1a1a2e",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    retryButton.on("pointerdown", () => {
      this.scene.start("game-scene");
    });

    retryButton.on("pointerover", () => {
      retryButton.setFillStyle(0x00cc00);
    });

    retryButton.on("pointerout", () => {
      retryButton.setFillStyle(0x00ff00);
    });

    // Botón ELEGIR NIVEL
    const levelButton = this.add.rectangle(500, 380, 180, 60, 0x4444ff);
    levelButton.setStrokeStyle(3, 0xffffff);
    levelButton.setInteractive({ useHandCursor: true });

    this.add.text(500, 380, "ELEGIR NIVEL", {
      fontSize: "24px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    levelButton.on("pointerdown", () => {
      this.scene.start("level-select-scene");
    });

    levelButton.on("pointerover", () => {
      levelButton.setFillStyle(0x3333dd);
    });

    levelButton.on("pointerout", () => {
      levelButton.setFillStyle(0x4444ff);
    });
  }
}
