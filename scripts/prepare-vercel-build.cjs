/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script prepares the project for Vercel deployment by copying
 * deployment-specific versions of files that have ESLint errors.
 * 
 * These files have been modified to remove unused variables that
 * cause ESLint errors during the Vercel build process.
 * 
 * The original files are kept in the repository for future development,
 * but are ignored during deployment using .vercelignore.
 */

const fs = require('fs');
const path = require('path');

// Files to copy from vercel-deploy to their respective locations
const filesToCopy = [
  {
    source: 'vercel-deploy/src/app/[locale]/services/[service]/page.tsx',
    destination: 'src/app/[locale]/services/[service]/page.tsx'
  },
  {
    source: 'vercel-deploy/src/app/[locale]/team/[member]/page.tsx',
    destination: 'src/app/[locale]/team/[member]/page.tsx'
  },
  {
    source: 'vercel-deploy/src/components/layout/LanguageToggle.tsx',
    destination: 'src/components/layout/LanguageToggle.tsx'
  }
];

// Function to copy a file
function copyFile(source, destination) {
  // Create destination directory if it doesn't exist
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(source, destination);
  console.log(`Copied ${source} to ${destination}`);
}

// Always copy the files during the build process
console.log('Preparing files for deployment...');

// Copy all files
filesToCopy.forEach(file => {
  copyFile(file.source, file.destination);
});

console.log('Files prepared for deployment.');
