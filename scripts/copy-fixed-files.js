const fs = require('fs');
const path = require('path');

// Files to copy from vercel-deploy to src (opposite of update-vercel-deploy.js)
// These are the files we fixed ESLint errors in
const filesToCopy = [
  {
    source: 'vercel-deploy/src/app/[locale]/about/page.tsx',
    destination: 'src/app/[locale]/about/page.tsx'
  },
  {
    source: 'vercel-deploy/src/app/[locale]/resources/page.tsx',
    destination: 'src/app/[locale]/resources/page.tsx'
  },
  {
    source: 'vercel-deploy/src/app/[locale]/services/page.tsx',
    destination: 'src/app/[locale]/services/page.tsx'
  }
];

// Function to copy a file
function copyFile(source, destination) {
  // Check if source file exists
  if (!fs.existsSync(source)) {
    console.error(`Source file ${source} does not exist.`);
    return false;
  }

  // Create destination directory if it doesn't exist
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  try {
    fs.copyFileSync(source, destination);
    console.log(`✅ Copied ${source} to ${destination}`);
    return true;
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${destination}:`, error);
    return false;
  }
}

// Copy all files
console.log('Copying fixed files from vercel-deploy to src...');

let successCount = 0;
let failureCount = 0;

filesToCopy.forEach(file => {
  const success = copyFile(file.source, file.destination);
  if (success) {
    successCount++;
  } else {
    failureCount++;
  }
});

console.log(`\nCopy complete: ${successCount} files copied successfully, ${failureCount} files failed.`);
console.log(`\nNext steps:`);
console.log(`1. Commit these changes: git add . && git commit -m "Fix ESLint errors in Vercel deployment files"`);
console.log(`2. Push to your repository: git push`);
console.log(`3. Vercel should automatically deploy the updated version`); 