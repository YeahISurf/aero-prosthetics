/**
 * Translation Completeness Check Script
 * 
 * This script compares all translation files against the English (default) locale file
 * to identify missing translation keys.
 * 
 * Usage: node scripts/check-translations.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'locales');
const DEFAULT_LOCALE = 'en';
const IGNORED_KEYS = []; // Add any keys you want to ignore in the check

// Utility function to get all keys in an object (recursively with path)
function getAllKeys(obj, currentPath = '') {
  let keys = [];
  
  for (const key in obj) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recurse into nested objects
      keys = [...keys, ...getAllKeys(obj[key], newPath)];
    } else {
      keys.push(newPath);
    }
  }
  
  return keys;
}

// Utility function to check if a key exists in an object using path notation
function hasKey(obj, path) {
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return false;
    }
    current = current[part];
  }
  
  return current !== undefined;
}

// Function to parse locale file names
function parseLocaleFileName(fileName) {
  // Check if it's a specialized file (e.g., team.en.json)
  if (fileName.split('.').length === 3) {
    const [prefix, locale] = fileName.split('.');
    return { 
      type: 'specialized',
      prefix,
      locale,
      fileName
    };
  }
  
  // It's a main locale file (e.g., en.json)
  return {
    type: 'main',
    locale: fileName.replace('.json', ''),
    fileName
  };
}

// Main function to check translations
async function checkTranslations() {
  try {
    // Get list of locale files
    const allFiles = fs.readdirSync(LOCALES_DIR)
      .filter(file => file.endsWith('.json'));
    
    // Parse and group files by type
    const mainLocaleFiles = [];
    const specializedGroups = {};
    
    allFiles.forEach(fileName => {
      const fileInfo = parseLocaleFileName(fileName);
      
      if (fileInfo.type === 'main') {
        mainLocaleFiles.push(fileName);
      } else {
        if (!specializedGroups[fileInfo.prefix]) {
          specializedGroups[fileInfo.prefix] = [];
        }
        specializedGroups[fileInfo.prefix].push({
          file: fileName,
          locale: fileInfo.locale
        });
      }
    });
    
    // Check main locale files
    let hasMainErrors = false;
    
    if (mainLocaleFiles.length > 0) {
      console.log('\n=== Checking Main Locale Files ===\n');
      
      if (!mainLocaleFiles.includes(`${DEFAULT_LOCALE}.json`)) {
        console.error(`Default locale file (${DEFAULT_LOCALE}.json) not found!`);
        hasMainErrors = true;
      } else {
        // Load default locale
        const defaultLocaleContent = JSON.parse(
          fs.readFileSync(path.join(LOCALES_DIR, `${DEFAULT_LOCALE}.json`), 'utf8')
        );
        
        // Get all keys from default locale
        const defaultKeys = getAllKeys(defaultLocaleContent)
          .filter(key => !IGNORED_KEYS.includes(key));
        
        console.log(`Found ${defaultKeys.length} keys in default locale (${DEFAULT_LOCALE})`);
        
        // Check each locale file against default
        for (const file of mainLocaleFiles) {
          const locale = file.replace('.json', '');
          
          if (locale === DEFAULT_LOCALE) continue;
          
          const localeContent = JSON.parse(
            fs.readFileSync(path.join(LOCALES_DIR, file), 'utf8')
          );
          
          const missingKeys = [];
          
          for (const key of defaultKeys) {
            if (!hasKey(localeContent, key)) {
              missingKeys.push(key);
            }
          }
          
          if (missingKeys.length > 0) {
            console.error(`\n❌ Locale "${locale}" is missing ${missingKeys.length} keys:`);
            missingKeys.forEach(key => console.error(`  - ${key}`));
            hasMainErrors = true;
          } else {
            console.log(`✅ Locale "${locale}" has all required translations`);
          }
          
          // Check for extra keys in other locales that don't exist in default
          const localeKeys = getAllKeys(localeContent);
          const extraKeys = localeKeys.filter(key => 
            !defaultKeys.includes(key) && !IGNORED_KEYS.includes(key)
          );
          
          if (extraKeys.length > 0) {
            console.warn(`\n⚠️  Locale "${locale}" has ${extraKeys.length} additional keys not in default locale:`);
            extraKeys.forEach(key => console.warn(`  - ${key}`));
          }
        }
        
        if (hasMainErrors) {
          console.error('\n❌ Main locale translations check failed. Some locales are missing translations.');
        } else {
          console.log('\n✅ All main locales have complete translations!');
        }
      }
    }
    
    // Check specialized locale files by group
    let hasSpecializedErrors = false;
    
    for (const prefix in specializedGroups) {
      console.log(`\n=== Checking ${prefix} Specialized Locale Files ===\n`);
      
      const files = specializedGroups[prefix];
      const defaultFile = files.find(f => f.locale === DEFAULT_LOCALE);
      
      if (!defaultFile) {
        console.error(`Default ${prefix}.${DEFAULT_LOCALE}.json file not found!`);
        hasSpecializedErrors = true;
        continue;
      }
      
      // Load default specialized locale
      const defaultSpecializedContent = JSON.parse(
        fs.readFileSync(path.join(LOCALES_DIR, defaultFile.file), 'utf8')
      );
      
      // Get all keys from default specialized locale
      const defaultSpecializedKeys = getAllKeys(defaultSpecializedContent)
        .filter(key => !IGNORED_KEYS.includes(key));
      
      console.log(`Found ${defaultSpecializedKeys.length} keys in ${prefix}.${DEFAULT_LOCALE} file`);
      
      // Check each specialized locale file against default specialized
      for (const { file, locale } of files) {
        if (locale === DEFAULT_LOCALE) continue;
        
        const specializedContent = JSON.parse(
          fs.readFileSync(path.join(LOCALES_DIR, file), 'utf8')
        );
        
        const missingKeys = [];
        
        for (const key of defaultSpecializedKeys) {
          if (!hasKey(specializedContent, key)) {
            missingKeys.push(key);
          }
        }
        
        if (missingKeys.length > 0) {
          console.error(`\n❌ ${prefix}.${locale} is missing ${missingKeys.length} keys:`);
          missingKeys.forEach(key => console.error(`  - ${key}`));
          hasSpecializedErrors = true;
        } else {
          console.log(`✅ ${prefix}.${locale} has all required translations`);
        }
        
        // Check for extra keys in other locales that don't exist in default
        const specializedKeys = getAllKeys(specializedContent);
        const extraKeys = specializedKeys.filter(key => 
          !defaultSpecializedKeys.includes(key) && !IGNORED_KEYS.includes(key)
        );
        
        if (extraKeys.length > 0) {
          console.warn(`\n⚠️  ${prefix}.${locale} has ${extraKeys.length} additional keys not in default specialized locale:`);
          extraKeys.forEach(key => console.warn(`  - ${key}`));
        }
      }
    }
    
    if (hasMainErrors || hasSpecializedErrors) {
      console.error('\n❌ Translation check failed. Some locales are missing translations.');
      process.exit(1);
    } else {
      console.log('\n✅ All translations are complete!');
    }
  } catch (error) {
    console.error('Error checking translations:', error);
    process.exit(1);
  }
}

// Run the check
checkTranslations(); 