const fs = require('fs');
const path = require('path');

// Create placeholder files for the team members
const teamDir = path.join(__dirname, '../public/images/team');
const aboutDir = path.join(__dirname, '../public/images');

// Ensure directories exist
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Create placeholder files
// Team member images
const teamImages = [
  'robert-chen.jpg',
  'maria-rodriguez.jpg',
  'james-wilson.jpg'
];

// About page images
const aboutImages = [
  'about-hero.jpg',
  'about-history.jpg'
];

// Create empty image files (0 bytes) - will use Next.js unoptimized image handling for development
teamImages.forEach(image => {
  const filePath = path.join(teamDir, image);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`Created placeholder: ${filePath}`);
  }
});

aboutImages.forEach(image => {
  const filePath = path.join(aboutDir, image);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`Created placeholder: ${filePath}`);
  }
});

console.log('Placeholder creation complete!'); 