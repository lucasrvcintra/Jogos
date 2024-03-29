window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Variáveis
  snake = [];
  positionX = 10;
  positionY = 10;
  foodX = 15;
  foodY = 15;
  velX = 0;
  velY = 0;
  grid = 20;
  tam = 3;

  // Chamada da função jogo a cada 100ms
  setInterval(jogo, 100);

  // Controles
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      // seta direita
      case "ArrowRight":
        velX = 1;
        velY = 0;
        break;
      // seta esquerda
      case "ArrowLeft":
        velX = -1;
        velY = 0;
        break;
      // seta pra cima
      case "ArrowUp":
        velX = 0;
        velY = -1;
        break;
      // seta pra baixo
      case "ArrowDown":
        velX = 0;
        velY = 1;
        break;
    }
  });
};

function jogo() {
  // Configuração da tela
  ctx.fillStyle = "#2980B9";

  // distancia borda h, distancia borda v, largura, altura
  ctx.fillRect(0, 0, 400, 400);

  // Posicionamento cobra
  positionX += velX;
  positionY += velY;

  // Espelhamento
  if (positionX < 0) {
    positionX = grid;
  }
  if (positionX > grid) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = grid;
  }
  if (positionY > grid) {
    positionY = 0;
  }

  // Configuração da cobra
  ctx.fillStyle = "#00f102";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
    if (snake[i].x == positionX && snake[i].y == positionY) {
      tam = 3;
    }
  }

  // Posicionamento da cobra
  snake.push({ x: positionX, y: positionY });

  // Apagando
  while (snake.length > tam) {
    snake.shift();
  }

  // Configurando a comida
  ctx.fillStyle = "#f1c40f";
  ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1);

  // Comendo a comida
  if (positionX == foodX && positionY == foodY) {
    tam++;
    foodX = Math.floor(Math.random() * grid);
    foodY = Math.floor(Math.random() * grid);
  }
}
