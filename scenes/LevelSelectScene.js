export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("level-select-scene");
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Título
    this.add.text(400, 80, "SELECCIÓN DE NIVEL", {
      fontSize: "56px",
      fill: "#00ff00",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Posiciones de los botones
    const buttonPositions = [
      { x: 200, level: 1 },
      { x: 400, level: 2 },
      { x: 600, level: 3 },
    ];

    buttonPositions.forEach((pos) => {
      // Crear botón
      const button = this.add.rectangle(pos.x, 300, 120, 120, 0x4444ff);
      button.setStrokeStyle(3, 0xffffff);
      button.setInteractive({ useHandCursor: true });

      // Número del nivel
      this.add.text(pos.x, 300, pos.level.toString(), {
        fontSize: "72px",
        fill: "#ffffff",
        fontStyle: "bold",
        align: "center",
      }).setOrigin(0.5);

      // Efectos del botón
      button.on("pointerover", () => {
        button.setFillStyle(0x3333dd);
      });

      button.on("pointerout", () => {
        button.setFillStyle(0x4444ff);
      });

      // Acción del botón
      if (pos.level === 1) {
        button.on("pointerdown", () => {
          this.scene.start("game-scene");
        });
      }
      // Los botones 2 y 3 no hacen nada
    });

    // Botón VOLVER AL INICIO
    const homeButton = this.add.rectangle(400, 500, 200, 50, 0xff8800);
    homeButton.setStrokeStyle(2, 0xffffff);
    homeButton.setInteractive({ useHandCursor: true });

    this.add.text(400, 500, "VOLVER AL INICIO", {
      fontSize: "22px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    homeButton.on("pointerdown", () => {
      this.scene.start("menu-scene");
    });

    homeButton.on("pointerover", () => {
      homeButton.setFillStyle(0xff7700);
    });

    homeButton.on("pointerout", () => {
      homeButton.setFillStyle(0xff8800);
    });
  }
}
