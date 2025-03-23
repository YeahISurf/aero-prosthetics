/**
 * This script automatically synchronizes files from src/ to vercel-deploy/
 * to ensure that local changes are reflected in Vercel deployments.
 * 
 * Usage: 
 * - Run 'node scripts/sync-vercel-deploy.js' to sync all managed files
 * - Run 'node scripts/sync-vercel-deploy.js --check' to see which files need syncing
 */

const fs = require('fs');
const path = require('path');

// Get the list of files from update-vercel-deploy.js
let filesToSync = [];
try {
  // Read the update-vercel-deploy.js file to extract file mappings
  const updateVercelDeployPath = path.join(__dirname, 'update-vercel-deploy.js');
  
  // Import the filesToCopy array directly from the file
  const updateVercelDeploy = require('./update-vercel-deploy');
  filesToSync = updateVercelDeploy.filesToCopy;
  
  // If there's no exported filesToCopy, parse the file content
  if (!filesToSync || !Array.isArray(filesToSync)) {
    const content = fs.readFileSync(updateVercelDeployPath, 'utf8');
    
    // Extract the filesToCopy array using regex
    const match = content.match(/const filesToCopy\s*=\s*\[([\s\S]*?)\];/);
    if (match && match[1]) {
      const entries = match[1].match(/{\s*source:\s*['"](.+?)['"]\s*,\s*destination:\s*['"](.+?)['"]\s*}/g);
      
      if (entries) {
        filesToSync = entries.map(entry => {
          const sourceMatch = entry.match(/source:\s*['"](.+?)['"]/);
          const destinationMatch = entry.match(/destination:\s*['"](.+?)['"]/);
          
          if (sourceMatch && destinationMatch) {
            return {
              source: sourceMatch[1],
              destination: destinationMatch[1]
            };
          }
          return null;
        }).filter(Boolean);
      }
    }
  }
  
  if (!filesToSync || !filesToSync.length) {
    console.error('No files to sync found in update-vercel-deploy.js');
    process.exit(1);
  }
} catch (error) {
  console.error('Error reading update-vercel-deploy.js:', error);
  process.exit(1);
}

// Check if files are in sync or need updating
const checkMode = process.argv.includes('--check');
let needsSync = false;

console.log(`Found ${filesToSync.length} files to sync.`);

// Process each file
filesToSync.forEach(file => {
  try {
    const srcPath = file.source;
    const vercelDeployPath = file.destination;
    
    if (!fs.existsSync(srcPath)) {
      console.log(`🚫 Source file not found: ${srcPath}`);
      return;
    }
    
    // Create directory if it doesn't exist
    const vercelDeployDir = path.dirname(vercelDeployPath);
    if (!fs.existsSync(vercelDeployDir)) {
      fs.mkdirSync(vercelDeployDir, { recursive: true });
    }
    
    // Check if files are different
    let needsUpdate = false;
    if (fs.existsSync(vercelDeployPath)) {
      const srcContent = fs.readFileSync(srcPath, 'utf8');
      const vercelDeployContent = fs.readFileSync(vercelDeployPath, 'utf8');
      needsUpdate = srcContent !== vercelDeployContent;
    } else {
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      needsSync = true;
      
      if (checkMode) {
        console.log(`⚠️ Needs sync: ${srcPath} -> ${vercelDeployPath}`);
      } else {
        fs.copyFileSync(srcPath, vercelDeployPath);
        console.log(`✅ Synced: ${srcPath} -> ${vercelDeployPath}`);
      }
    } else {
      console.log(`✓ Already in sync: ${srcPath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${file.source}:`, error);
  }
});

if (checkMode && needsSync) {
  console.log('\n⚠️ Some files need synchronization. Run without --check to update them.');
} else if (checkMode) {
  console.log('\n✅ All files are in sync!');
} else if (needsSync) {
  console.log('\n✅ Synchronization complete!');
} else {
  console.log('\n✅ All files were already in sync!');
}

console.log('\n💡 Tip: Run this script after making changes to keep vercel-deploy in sync');
console.log('   You can also add this to your workflow: "npm run dev && node scripts/sync-vercel-deploy.js"'); 