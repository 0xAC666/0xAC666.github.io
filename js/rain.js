/* 雨滴效果 */
const canvas = document.createElement('canvas');
canvas.id = 'rain-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let width, height;
let drops = [];

const color1 = { r: 178, g: 211, b: 250 }; // #b2d3fa
const color2 = { r: 224, g: 250, b: 183 }; // #e0fab7

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  drops = [];
  const fontSize = 18;
  const cols = Math.floor(width / fontSize);
  for (let i = 0; i < cols; i++) {
    drops[i] = Math.random() * height;
  }
}

window.addEventListener('resize', resize);
resize();

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, 'rgba(4, 0, 45, 0.05)');
  gradient.addColorStop(1, 'rgba(39, 45, 30, 0.05)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function draw() {
  drawBackground();
  
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  for (let i = 0; i < drops.length; i++) {
    const ratio = i / drops.length;
    const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
    const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
    const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
    
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.beginPath();
    ctx.moveTo(i * 18, drops[i] * 18);
    ctx.lineTo(i * 18, drops[i] * 18 + 18);
    ctx.stroke();
    
    drops[i]++;
    if (drops[i] * 18 > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 33);