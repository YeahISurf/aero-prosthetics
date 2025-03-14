const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure the output directory exists
const outputDir = path.join(__dirname, '../public/uploads/hero');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Path to the source image
const inputImagePath = path.join(__dirname, '../public/uploads/hero/why-carbon-fiber-is-the-preferred-material-for-prosthetic-devices-large.jpg');

// Check if the source image exists
if (!fs.existsSync(inputImagePath)) {
  console.error(`Source image not found: ${inputImagePath}`);
  return;
}

// Optimize the image using sharp
sharp(inputImagePath)
  .resize({ width: 1200 }) // Resize to appropriate width
  .webp({ quality: 80 }) // Convert to WebP with 80% quality (good balance between quality and file size)
  .toFile(path.join(outputDir, 'carbon-fiber-prosthetic-optimized.webp'))
  .then(() => {
    console.log('Hero image optimized successfully!');
  })
  .catch((err) => {
    console.error('Error optimizing hero image:', err);
  });

// Also create a smaller version for mobile
sharp(inputImagePath)
  .resize({ width: 768 }) // Mobile width
  .webp({ quality: 75 }) // Slightly lower quality for mobile
  .toFile(path.join(outputDir, 'carbon-fiber-prosthetic-optimized-mobile.webp'))
  .then(() => {
    console.log('Mobile hero image optimized successfully!');
  })
  .catch((err) => {
    console.error('Error optimizing mobile hero image:', err);
  });

console.log('Image optimization process started...'); 