export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }

  init() {
    this.score = 0;
    this.gameSpeed = 5;
    this.maxGameSpeed = 15;
    this.gameSpeedIncrement = 0.0005;
    this.playerX = 400;
    this.playerCenterX = 400;
    this.playerMoveSpeed = 300;
    this.collectedSum = 0;
    this.numbersProcessed = 0;
    this.levelEnded = false;
  }

  preload() {
    // Cargar assets si es necesario
  }

  create() {
    // Crear fondo
    this.cameras.main.setBounds(0, 0, 2000, 600);
    this.add.rectangle(1000, 300, 2000, 600, 0x1a1a2e);

    // Crear jugador (rectángulo en el centro)
    this.player = this.add.rectangle(400, 520, 30, 40, 0x00ff00);
    this.player.setStrokeStyle(2, 0xffffff);
    this.physics.add.existing(this.player);
    this.player.body.setAllowGravity(false);
    this.player.body.setImmovable(true);
    this.player.body.setSize(30, 40);

    // Crear grupos para obstáculos, plataformas y números
    this.obstacles = this.add.group();
    this.platforms = this.add.group();
    this.collectibles = this.add.group();
    this.fallingNumbers = this.add.group();

    // Datos de números que caen (3 pares = 6 números)
    const values = [
      Phaser.Math.Between(1, 9),
      Phaser.Math.Between(1, 9),
      Phaser.Math.Between(1, 9),
      Phaser.Math.Between(1, 9),
      Phaser.Math.Between(1, 9),
      Phaser.Math.Between(1, 9),
    ];
    const sum = values.reduce((a, b) => a + b, 0);
    this.averageValue = sum / values.length;
    this.counterText = this.add.text(16, 100, "Contador: 0", {
      fontSize: "32px",
      fill: "#ffffff",
    });
    this.counterText.setScrollFactor(0);
    this.counterText.setDepth(1000);

    this.averageText = this.add.text(16, 140, `Media: ${this.averageValue.toFixed(1)}`, {
      fontSize: "24px",
      fill: "#00ff00",
    });
    this.averageText.setScrollFactor(0);
    this.averageText.setDepth(1000);

    // Posiciones donde caen los números (distribuidos uniformemente)
    const positions = [120, 240, 360, 480, 600, 720];
    positions.forEach((x, index) => {
      this.spawnFallingNumber(x, values[index]);
    });

    // Variables para spawning
    this.lastObstacleX = 800;
    this.lastPlatformX = 800;
    this.lastCollectibleX = 800;

    // Crear interfaz de puntuación
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#ffffff",
    });
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(1000);

    this.speedText = this.add.text(16, 60, "Speed: 5", {
      fontSize: "20px",
      fill: "#00ff00",
    });
    this.speedText.setScrollFactor(0);
    this.speedText.setDepth(1000);

    // Configurar input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Crear línea base (suelo)
    this.createPlatform(400, 550, 1600, 50);
  }

  update() {
    // Movimiento del jugador hacia los números que caen
    let targetX = this.playerCenterX;
    
    // Si se presiona izquierda, buscar número más cercano a la izquierda
    if (this.cursors.left.isDown) {
      let closestLeft = null;
      let closestDistance = Infinity;
      
      this.fallingNumbers.children.entries.forEach((numberBox) => {
        if (numberBox.x < this.playerX && numberBox.y < 500) {
          const distance = Math.abs(numberBox.x - this.playerX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestLeft = numberBox;
          }
        }
      });
      
      if (closestLeft) {
        targetX = closestLeft.x;
      }
    }
    // Si se presiona derecha, buscar número más cercano a la derecha
    else if (this.cursors.right.isDown) {
      let closestRight = null;
      let closestDistance = Infinity;
      
      this.fallingNumbers.children.entries.forEach((numberBox) => {
        if (numberBox.x > this.playerX && numberBox.y < 500) {
          const distance = Math.abs(numberBox.x - this.playerX);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestRight = numberBox;
          }
        }
      });
      
      if (closestRight) {
        targetX = closestRight.x;
      }
    }

    // Mover el jugador suavemente hacia el objetivo
    if (this.playerX < targetX) {
      this.playerX = Math.min(targetX, this.playerX + this.playerMoveSpeed * 0.016);
    } else if (this.playerX > targetX) {
      this.playerX = Math.max(targetX, this.playerX - this.playerMoveSpeed * 0.016);
    }

    this.player.setX(this.playerX);
    // Incrementar dificultad
    if (this.gameSpeed < this.maxGameSpeed) {
      this.gameSpeed += this.gameSpeedIncrement;
    }

    // Actualizar textos
    this.scoreText.setText("Score: " + Math.floor(this.score));
    this.speedText.setText("Speed: " + this.gameSpeed.toFixed(1));

    // Mover y eliminar obstáculos
    this.obstacles.children.entries.forEach((obstacle) => {
      obstacle.x -= this.gameSpeed;

      // Colisión con jugador
      if (this.physics.overlap(this.player, obstacle)) {
        this.gameOver();
      }

      // Eliminar si sale de pantalla
      if (obstacle.x < -50) {
        this.score += 10;
        obstacle.destroy();
      }
    });

    // Mover y eliminar plataformas
    this.platforms.children.entries.forEach((platform) => {
      platform.x -= this.gameSpeed;

      // Eliminar si sale de pantalla
      if (platform.x < -50) {
        platform.destroy();
      }
    });

    // Mover y eliminar collectibles
    this.collectibles.children.entries.forEach((collectible) => {
      collectible.x -= this.gameSpeed;

      // Colisión con jugador
      if (this.physics.overlap(this.player, collectible)) {
        this.score += 50;
        collectible.destroy();
      }

      // Eliminar si sale de pantalla
      if (collectible.x < -50) {
        collectible.destroy();
      }
    });

    // Actualizar números que caen
    const playerBounds = this.player.getBounds();
    this.fallingNumbers.children.entries.forEach((numberBox) => {
      numberBox.y += 120 * 0.016;
      numberBox.label.setPosition(numberBox.x, numberBox.y);

      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, numberBox.getBounds())) {
        this.collectedSum += numberBox.value;
        this.numbersProcessed += 1;
        this.counterText.setText("Contador: " + this.collectedSum);
        numberBox.label.destroy();
        numberBox.destroy();
      } else if (numberBox.y > 580) {
        this.numbersProcessed += 1;
        numberBox.label.destroy();
        numberBox.destroy();
      }

      if (this.numbersProcessed >= 6 && !this.levelEnded) {
        this.endLevel();
      }
    });

    // Generar obstáculos
    if (this.lastObstacleX < 1200) {
      this.createObstacle();
      this.lastObstacleX += Phaser.Math.Between(150, 300);
    }

    // Generar plataformas flotantes
    if (this.lastPlatformX < 1200) {
      if (Math.random() > 0.6) {
        this.createFloatingPlatform();
      }
      this.lastPlatformX += Phaser.Math.Between(200, 400);
    }

    // Generar coleccionables
    if (this.lastCollectibleX < 1200) {
      if (Math.random() > 0.7) {
        this.createCollectible();
      }
      this.lastCollectibleX += Phaser.Math.Between(300, 500);
    }
  }

  createObstacle() {
    const y = Phaser.Math.Between(100, 500);
    const width = Phaser.Math.Between(40, 80);
    const height = 40;
    const obstacle = this.add.rectangle(1200, y, width, height, 0xff4444);
    obstacle.setStrokeStyle(2, 0xff0000);
    this.obstacles.add(obstacle);
  }

  createFloatingPlatform() {
    const y = Phaser.Math.Between(100, 450);
    const width = Phaser.Math.Between(60, 120);
    const height = 15;
    const platform = this.add.rectangle(1200, y, width, height, 0x4444ff);
    platform.setStrokeStyle(2, 0x0000ff);
    this.platforms.add(platform);
  }

  createCollectible() {
    const y = Phaser.Math.Between(100, 500);
    const collectible = this.add.circle(1200, y, 12, 0xffdd00);
    collectible.setStrokeStyle(2, 0xffaa00);
    this.collectibles.add(collectible);
  }

  spawnFallingNumber(x, value) {
    const numberBox = this.add.rectangle(x, 50, 60, 60, 0xffff66);
    numberBox.setStrokeStyle(2, 0xffaa00);
    numberBox.value = value;
    numberBox.label = this.add.text(x, 50, value.toString(), {
      fontSize: "32px",
      fill: "#000000",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);
    this.fallingNumbers.add(numberBox);
  }

  endLevel() {
    this.levelEnded = true;
    if (this.collectedSum > this.averageValue) {
      this.scene.start("game-over-scene", { score: this.score });
    } else {
      this.scene.start("level-completed-scene");
    }
  }

  createPlatform(x, y, width, height) {
    const platform = this.add.rectangle(x, y, width, height, 0x2d7a2d);
    platform.setStrokeStyle(2, 0x00ff00);
    this.platforms.add(platform);
  }

  gameOver() {
    this.physics.pause();
    this.scene.start("game-over-scene", { score: this.score });
  }
}
