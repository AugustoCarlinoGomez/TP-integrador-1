export default class GameWonScene extends Phaser.Scene {
  constructor() {
    super("game-won-scene");
  }

  init(data) {
    // Recibir datos del juego anterior
    this.finalScore = data.score || 0;
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Título FIN DEL JUEGO
    this.add.text(400, 120, "¡FIN DEL JUEGO!", {
      fontSize: "72px",
      fill: "#00ff00",
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

    // Botón ELEGIR NIVEL
    const levelButton = this.add.rectangle(300, 380, 180, 60, 0x4444ff);
    levelButton.setStrokeStyle(3, 0xffffff);
    levelButton.setInteractive({ useHandCursor: true });

    this.add.text(300, 380, "ELEGIR NIVEL", {
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

    // Botón VOLVER AL INICIO
    const menuButton = this.add.rectangle(500, 380, 180, 60, 0xff8800);
    menuButton.setStrokeStyle(3, 0xffffff);
    menuButton.setInteractive({ useHandCursor: true });

    this.add.text(500, 380, "VOLVER AL INICIO", {
      fontSize: "20px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    menuButton.on("pointerdown", () => {
      this.scene.start("menu-scene");
    });

    menuButton.on("pointerover", () => {
      menuButton.setFillStyle(0xff7700);
    });

    menuButton.on("pointerout", () => {
      menuButton.setFillStyle(0xff8800);
    });
  }
}
