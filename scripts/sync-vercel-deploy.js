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

// Get the list of files from prepare-vercel-build.cjs
let filesToSync = [];
try {
  // Read the prepare-vercel-build.cjs file to extract file mappings
  const prepareVercelBuildPath = path.join(__dirname, 'prepare-vercel-build.cjs');
  const prepareVercelBuildContent = fs.readFileSync(prepareVercelBuildPath, 'utf8');
  
  // Extract the filesToCopy array using regex
  const fileArrayMatch = prepareVercelBuildContent.match(/const filesToCopy = \[([\s\S]*?)\];/);
  if (fileArrayMatch && fileArrayMatch[1]) {
    // Parse each file entry
    const fileEntriesText = fileArrayMatch[1];
    const fileEntryRegex = /{[\s\S]*?source:\s*'(.*?)',[\s\S]*?destination:\s*'(.*?)'[\s\S]*?}/g;
    
    let match;
    while ((match = fileEntryRegex.exec(fileEntriesText)) !== null) {
      const [_, source, destination] = match;
      filesToSync.push({ source, destination });
    }
  }
} catch (error) {
  console.error('Error reading prepare-vercel-build.cjs:', error);
  process.exit(1);
}

// Check if files are in sync or need updating
const checkMode = process.argv.includes('--check');
let needsSync = false;

// Process each file
filesToSync.forEach(file => {
  try {
    // We need to reverse the mapping - copy from destination to source in vercel-deploy
    const srcPath = path.join(process.cwd(), file.destination);
    const vercelDeployPath = path.join(process.cwd(), file.source);
    
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
        console.log(`⚠️ Needs sync: ${file.destination} -> ${file.source}`);
      } else {
        fs.copyFileSync(srcPath, vercelDeployPath);
        console.log(`✅ Synced: ${file.destination} -> ${file.source}`);
      }
    } else {
      console.log(`✓ Already in sync: ${file.destination}`);
    }
  } catch (error) {
    console.error(`Error processing file ${file.destination}:`, error);
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