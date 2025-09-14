const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = '0123456789アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 18;
let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
  // Fundo preto transparente (rastro)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00ffcc';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i] = (drops[i] * fontSize > height && Math.random() > 0.975) ? 0 : drops[i] + 1;
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
});






