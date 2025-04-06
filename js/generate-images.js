/* Generate placeholder images for the website */

// Create background pattern
const bgPattern = document.createElement('canvas');
bgPattern.width = 200;
bgPattern.height = 200;
const bgCtx = bgPattern.getContext('2d');

// Draw subtle pattern
bgCtx.fillStyle = '#0a0a0a';
bgCtx.fillRect(0, 0, 200, 200);

// Add subtle stars/dots
for (let i = 0; i < 50; i++) {
    const x = Math.random() * 200;
    const y = Math.random() * 200;
    const radius = Math.random() * 1.5;
    
    bgCtx.beginPath();
    bgCtx.arc(x, y, radius, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(201, 162, 39, ${Math.random() * 0.3})`;
    bgCtx.fill();
}

// Create paper texture
const paperTexture = document.createElement('canvas');
paperTexture.width = 400;
paperTexture.height = 400;
const paperCtx = paperTexture.getContext('2d');

// Base color
paperCtx.fillStyle = '#f5f2e9';
paperCtx.fillRect(0, 0, 400, 400);

// Add noise
for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 400;
    const y = Math.random() * 400;
    const gray = Math.floor(Math.random() * 20);
    
    paperCtx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.1)`;
    paperCtx.fillRect(x, y, 1, 1);
}

// Create noise texture
const noiseTexture = document.createElement('canvas');
noiseTexture.width = 200;
noiseTexture.height = 200;
const noiseCtx = noiseTexture.getContext('2d');

// Add noise
for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 200;
    const y = Math.random() * 200;
    const alpha = Math.random() * 0.05;
    
    noiseCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    noiseCtx.fillRect(x, y, 1, 1);
}

// Create corner decoration
const cornerDecoration = document.createElement('canvas');
cornerDecoration.width = 100;
cornerDecoration.height = 100;
const cornerCtx = cornerDecoration.getContext('2d');

// Draw corner flourish
cornerCtx.strokeStyle = '#c9a227';
cornerCtx.lineWidth = 2;
cornerCtx.beginPath();
cornerCtx.moveTo(10, 50);
cornerCtx.quadraticCurveTo(25, 25, 50, 10);
cornerCtx.quadraticCurveTo(75, 25, 90, 50);
cornerCtx.stroke();

cornerCtx.beginPath();
cornerCtx.arc(50, 50, 5, 0, Math.PI * 2);
cornerCtx.fillStyle = '#c9a227';
cornerCtx.fill();

// Create ink splatter
const inkSplatter = document.createElement('canvas');
inkSplatter.width = 200;
inkSplatter.height = 200;
const inkCtx = inkSplatter.getContext('2d');

// Draw ink splatter
for (let i = 0; i < 10; i++) {
    const x = 100 + (Math.random() * 80 - 40);
    const y = 100 + (Math.random() * 80 - 40);
    const radius = Math.random() * 20 + 5;
    
    inkCtx.beginPath();
    inkCtx.arc(x, y, radius, 0, Math.PI * 2);
    inkCtx.fillStyle = `rgba(10, 10, 10, ${Math.random() * 0.3 + 0.1})`;
    inkCtx.fill();
}

// Create stars background
const starsBg = document.createElement('canvas');
starsBg.width = 1000;
starsBg.height = 1000;
const starsCtx = starsBg.getContext('2d');

// Draw stars
starsCtx.fillStyle = '#0a0a0a';
starsCtx.fillRect(0, 0, 1000, 1000);

for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
    const radius = Math.random() * 1.5;
    const alpha = Math.random() * 0.8 + 0.2;
    
    starsCtx.beginPath();
    starsCtx.arc(x, y, radius, 0, Math.PI * 2);
    starsCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    starsCtx.fill();
}

// Export images
function exportCanvasAsImage(canvas, filename) {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
}

// Function to save all images
function saveAllImages() {
    exportCanvasAsImage(bgPattern, 'bg-pattern.png');
    exportCanvasAsImage(paperTexture, 'paper-texture.png');
    exportCanvasAsImage(noiseTexture, 'noise.png');
    exportCanvasAsImage(cornerDecoration, 'corner-decoration.png');
    exportCanvasAsImage(inkSplatter, 'ink-splatter.png');
    exportCanvasAsImage(starsBg, 'stars-bg.png');
}

// Call this function to save all images
// saveAllImages();

// For testing in browser
document.body.appendChild(bgPattern);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(paperTexture);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(noiseTexture);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(cornerDecoration);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(inkSplatter);
document.body.appendChild(document.createElement('br'));
document.body.appendChild(starsBg);
