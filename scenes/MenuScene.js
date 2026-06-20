export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu-scene");
  }

  create() {
    // Fondo
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

    // Título
    this.add.text(400, 100, "JUEGO", {
      fontSize: "72px",
      fill: "#00ff00",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    // Botón JUGAR
    const playButton = this.add.rectangle(400, 300, 200, 60, 0x00ff00);
    playButton.setStrokeStyle(3, 0xffffff);
    playButton.setInteractive({ useHandCursor: true });

    this.add.text(400, 300, "JUGAR", {
      fontSize: "32px",
      fill: "#1a1a2e",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    playButton.on("pointerdown", () => {
      this.scene.start("level-select-scene");
    });

    playButton.on("pointerover", () => {
      playButton.setFillStyle(0x00cc00);
    });

    playButton.on("pointerout", () => {
      playButton.setFillStyle(0x00ff00);
    });

    // Botón CONTROLES
    const controlsButton = this.add.rectangle(400, 420, 200, 60, 0x4444ff);
    controlsButton.setStrokeStyle(3, 0xffffff);
    controlsButton.setInteractive({ useHandCursor: true });

    this.add.text(400, 420, "CONTROLES", {
      fontSize: "28px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);

    controlsButton.on("pointerdown", () => {
      this.showControls();
    });

    controlsButton.on("pointerover", () => {
      controlsButton.setFillStyle(0x3333dd);
    });

    controlsButton.on("pointerout", () => {
      controlsButton.setFillStyle(0x4444ff);
    });
  }

  showControls() {
    // Crear overlay semitransparente
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setDepth(100);

    // Crear caja de controles
    this.add.rectangle(400, 300, 600, 400, 0x1a1a2e).setDepth(101).setStrokeStyle(3, 0xffffff);

    // Título de controles
    this.add.text(400, 150, "CONTROLES", {
      fontSize: "48px",
      fill: "#00ff00",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5).setDepth(102);

    // Texto con controles
    const controlsText = `
    ↑ FLECHA ARRIBA / W - Subir
    ↓ FLECHA ABAJO / S - Bajar
    
    ESPACIO - Reiniciar juego
    `;

    this.add.text(400, 280, controlsText, {
      fontSize: "20px",
      fill: "#ffffff",
      align: "center",
    }).setOrigin(0.5).setDepth(102);

    // Botón Cerrar
    const closeButton = this.add.rectangle(400, 450, 150, 50, 0xff4444);
    closeButton.setStrokeStyle(2, 0xffffff);
    closeButton.setInteractive({ useHandCursor: true });
    closeButton.setDepth(102);

    this.add.text(400, 450, "CERRAR", {
      fontSize: "24px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5).setDepth(102);

    closeButton.on("pointerdown", () => {
      this.scene.restart();
    });

    closeButton.on("pointerover", () => {
      closeButton.setFillStyle(0xff3333);
    });

    closeButton.on("pointerout", () => {
      closeButton.setFillStyle(0xff4444);
    });
  }
}
