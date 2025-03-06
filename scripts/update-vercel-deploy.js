const fs = require('fs');
const path = require('path');

// For now, we'll focus only on the locations page which is causing issues
const filesToCopy = [
  {
    source: 'src/app/[locale]/locations/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/locations/page.tsx'
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

  // Read source file content
  const sourceContent = fs.readFileSync(source, 'utf8');
  
  // Check if destination file exists
  let destContent = '';
  if (fs.existsSync(destination)) {
    destContent = fs.readFileSync(destination, 'utf8');
  }
  
  // Compare file contents
  if (sourceContent === destContent) {
    console.log(`⚠️ Files are identical: ${source} and ${destination}`);
    return true;
  }

  // Copy the file
  try {
    fs.writeFileSync(destination, sourceContent, 'utf8');
    console.log(`✅ Copied ${source} to ${destination}`);
    
    // Show some details about the files
    console.log(`Source file size: ${sourceContent.length} characters`);
    console.log(`Destination file size: ${fs.readFileSync(destination, 'utf8').length} characters`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error copying ${source} to ${destination}:`, error);
    return false;
  }
}

// Copy all files
console.log('Updating locations page for Vercel deployment...');

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

console.log(`\nUpdate complete: ${successCount} files copied successfully, ${failureCount} files failed.`);
console.log(`\nNext steps:`);
console.log(`1. Commit these changes: git add . && git commit -m "Update locations page for Vercel deployment"`);
console.log(`2. Push to your repository: git push`);
console.log(`3. Vercel should automatically deploy the updated version`); 