const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Configura canvas
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = '0123456789アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let columns = Math.floor(width / fontSize);

// Cria array de posições das colunas
let drops = Array(columns).fill(1);

// Função de desenho
function draw() {
  // Fundo sem apagar totalmente para criar o rastro
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00ffcc';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reinicia o drop aleatoriamente quando sai da tela
    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(draw); // mais leve que setInterval
}

// Inicializa
draw();

// Ajusta canvas ao redimensionar
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
});


