const fs = require('fs');
const path = require('path');

// Files to copy from src to vercel-deploy
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
  },
  {
    source: 'src/app/[locale]/locations/anaheim/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/locations/anaheim/page.tsx'
  },
  {
    source: 'src/app/[locale]/locations/victorville/page.tsx',
    destination: 'vercel-deploy/src/app/[locale]/locations/victorville/page.tsx'
  },
  {
    source: 'src/components/maps/ClientMapsWrapper.tsx',
    destination: 'vercel-deploy/src/components/maps/ClientMapsWrapper.tsx'
  },
  {
    source: 'src/components/maps/GoogleMapsProvider.tsx',
    destination: 'vercel-deploy/src/components/maps/GoogleMapsProvider.tsx'
  },
  {
    source: 'src/components/maps/LocationMap.tsx',
    destination: 'vercel-deploy/src/components/maps/LocationMap.tsx'
  },
  {
    source: 'public/images/map-marker.svg',
    destination: 'vercel-deploy/public/images/map-marker.svg'
  },
  {
    source: 'public/images/logo.svg',
    destination: 'vercel-deploy/public/images/logo.svg'
  },
  {
    source: 'docs/google-maps-integration.md',
    destination: 'vercel-deploy/docs/google-maps-integration.md'
  }
];

// Export the filesToCopy array for use in other scripts
module.exports = {
  filesToCopy
};

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
console.log(`\nNext steps:`);
console.log(`1. Commit these changes: git add . && git commit -m "Update files for Vercel deployment"`);
console.log(`2. Push to your repository: git push`);
console.log(`3. Vercel should automatically deploy the updated version`); 