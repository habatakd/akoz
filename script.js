const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 300;

let ball = { x: 50, y: 150, radius: 10, dx: 0, dy: 0 };
let hole = { x: 500, y: 150, radius: 15 };
let currentPlayer = 1;

canvas.addEventListener('click', (e) => {
  if (ball.dx !== 0 || ball.dy !== 0) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
  ball.dx = Math.cos(angle) * 4;
  ball.dy = Math.sin(angle) * 4;
});

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Sürtünme
  ball.dx *= 0.98;
  ball.dy *= 0.98;

  // Çok yavaşladığında durdur
  if (Math.abs(ball.dx) < 0.1) ball.dx = 0;
  if (Math.abs(ball.dy) < 0.1) ball.dy = 0;

  // Deliğe girme kontrolü
  const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
  if (dist < ball.radius + hole.radius) {
    alert(Tebrikler Oyuncu ${currentPlayer}, topu deliğe soktun!);
    ball = { x: 50, y: 150, radius: 10, dx: 0, dy: 0 };
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  // Kenarlardan sekme
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ball.dx *= -1;
  }
  if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
    ball.dy *= -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Arka plan
  ctx.fillStyle = '#fdf6e3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Deliği çiz
  ctx.beginPath();
  ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Topu çiz
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = currentPlayer === 1 ? 'red' : 'blue';
  ctx.fill();

  // Oyuncu adlarını yaz
  ctx.fillStyle = '#444';
  ctx.font = '16px Arial';
  ctx.fillText(Sıra: ${currentPlayer === 1 ? 'Habat' : 'Helin'}, 10, 20);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
