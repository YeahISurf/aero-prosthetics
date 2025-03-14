const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create placeholder directory if it doesn't exist
const placeholderDir = path.join(__dirname, '../public/placeholders');
if (!fs.existsSync(placeholderDir)) {
  fs.mkdirSync(placeholderDir, { recursive: true });
}

// Define colors for the placeholders
const colors = [
  { bg: '#f0f9ff', fg: '#0369a1', text: 'Innovation' },  // Blue
  { bg: '#f0fdf4', fg: '#166534', text: 'Personalization' }, // Green  
  { bg: '#fef2f2', fg: '#b91c1c', text: 'Support' }, // Red
  { bg: '#f8fafc', fg: '#334155', text: 'Team' }, // Slate
];

// Generate placeholder images
function generatePlaceholder(color, filename) {
  const width = 800;
  const height = 600;
  
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  
  // Draw background
  context.fillStyle = color.bg;
  context.fillRect(0, 0, width, height);
  
  // Draw placeholder text
  context.font = 'bold 40px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color.fg;
  context.fillText(`${color.text} Image`, width / 2, height / 2 - 20);
  
  // Draw additional placeholder text
  context.font = '24px sans-serif';
  context.fillText('Placeholder', width / 2, height / 2 + 30);
  
  // Draw pattern
  context.strokeStyle = color.fg + '30'; // 30% opacity
  context.lineWidth = 2;
  
  // Draw grid pattern
  for (let i = 0; i < width; i += 50) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, height);
    context.stroke();
  }
  
  for (let i = 0; i < height; i += 50) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(width, i);
    context.stroke();
  }
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(placeholderDir, filename), buffer);
  
  console.log(`Generated ${filename}`);
}

// Generate all placeholders
generatePlaceholder(colors[0], 'innovation-placeholder.jpg');
generatePlaceholder(colors[1], 'personalization-placeholder.jpg');
generatePlaceholder(colors[2], 'support-placeholder.jpg');
generatePlaceholder(colors[3], 'team-placeholder.jpg');

console.log('All placeholder images generated successfully!'); 