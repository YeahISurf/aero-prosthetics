const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { glob } = require('glob');

async function checkParamsTypes() {
  try {
    console.log('Checking params types in all page files...\n');
    
    // Find all page.tsx files in the src directory
    const pageFiles = await glob('src/app/**/page.tsx');
    // Filter out the root page.tsx which doesn't use params
    const filteredFiles = pageFiles.filter(file => file !== 'src/app/page.tsx');
    
    console.log(`Found ${filteredFiles.length} page files to check (excluding root page.tsx).`);
    
    // Results tracking
    const correct = [];
    const incorrect = [];
    
    for (const file of filteredFiles) {
      try {
        const content = await readFile(file, 'utf8');
        
        // Check if the file has the correct Promise-based params type
        // More flexible pattern to match various Promise param structures
        const hasPromiseType = content.includes('params: Promise<{') && content.includes('locale: string');
        const hasAwaitParams = content.includes('await params');
        
        // If it has both the Promise type and await params, it's correct
        if (hasPromiseType && hasAwaitParams) {
          correct.push(file);
        } else {
          incorrect.push({
            file,
            hasPromiseType,
            hasAwaitParams
          });
        }
      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError);
        incorrect.push({
          file,
          error: fileError.message
        });
      }
    }
    
    // Display results
    console.log('\n✅ Correct files:');
    correct.forEach(file => console.log(`  - ${file}`));
    
    console.log('\n❌ Incorrect files:');
    if (incorrect.length === 0) {
      console.log('  None - all files have the correct Promise-based params type');
    } else {
      incorrect.forEach(item => {
        console.log(`  - ${item.file}`);
        if (item.error) {
          console.log(`     Error: ${item.error}`);
        } else {
          if (!item.hasPromiseType) console.log('     Missing Promise type definition');
          if (!item.hasAwaitParams) console.log('     Missing await when extracting params');
        }
      });
    }
    
    return incorrect.length === 0;
  } catch (error) {
    console.error('Error in checkParamsTypes:', error);
    throw error;
  }
}

checkParamsTypes()
  .then(allCorrect => {
    if (allCorrect) {
      console.log('\n✅ All page files have the correct Promise-based params type');
      process.exit(0);
    } else {
      console.log('\n❌ Some page files need to be fixed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Error checking params types:', error);
    process.exit(1);
  }); 