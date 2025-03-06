const fs = require('fs');
const path = require('path');

// Files to copy from src to vercel-deploy
// These are the same files listed in prepare-vercel-build.cjs
const filesToCopy = [
  {
    source: 'src/app/[locale]/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/page.tsx'
  },
  {
    source: 'src/app/[locale]/services/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/services/page.tsx'
  },
  {
    source: 'src/app/[locale]/services/[service]/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/services/[service]/page.tsx'
  },
  {
    source: 'src/app/[locale]/team/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/team/page.tsx'
  },
  {
    source: 'src/app/[locale]/team/[member]/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/team/[member]/page.tsx'
  },
  {
    source: 'src/app/[locale]/resources/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/resources/page.tsx'
  },
  {
    source: 'src/components/layout/LanguageToggle.tsx',
    destination: 'vercel-deploy/src/components/layout/LanguageToggle.tsx'
  },
  {
    source: 'src/app/[locale]/about/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/about/page.tsx'
  },
  {
    source: 'src/app/[locale]/contact/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/contact/page.tsx'
  },
  {
    source: 'src/app/[locale]/legal/accessibility/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/legal/accessibility/page.tsx'
  },
  {
    source: 'src/app/[locale]/legal/disclaimer/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/legal/disclaimer/page.tsx'
  },
  {
    source: 'src/app/[locale]/legal/privacy/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/legal/privacy/page.tsx'
  },
  {
    source: 'src/app/[locale]/legal/terms/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/legal/terms/page.tsx'
  },
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
console.log('Updating files for Vercel deployment...');

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
console.log(`\nYour Vercel deployment files are now up to date with your working files.`);
console.log(`Next steps:`);
console.log(`1. Commit these changes: git add . && git commit -m "Update vercel-deploy files"`);
console.log(`2. Push to your repository: git push`);
console.log(`3. Vercel should automatically deploy the updated version`); 