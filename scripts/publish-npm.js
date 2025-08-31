#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing to publish availity-reactstrap-validation v3.0.0 to npm...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if we have the necessary build artifacts
const requiredDirs = ['lib', 'es', 'types', 'dist'];
for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Error: ${dir} directory not found. Please run 'npm run build' first.`);
    process.exit(1);
  }
}

// Check if we're logged into npm
try {
  execSync('npm whoami', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Error: Not logged into npm. Please run "npm login" first.');
  process.exit(1);
}

// Check if the version is correct
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.version !== '3.0.0') {
  console.error(`❌ Error: Expected version 3.0.0, but package.json shows ${packageJson.version}`);
  process.exit(1);
}

// Check if git is clean
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    console.warn('⚠️  Warning: Git working directory is not clean. Consider committing changes first.');
  }
} catch (error) {
  console.warn('⚠️  Warning: Could not check git status.');
}

// Confirm before publishing
console.log('📋 Package details:');
console.log(`   Name: ${packageJson.name}`);
console.log(`   Version: ${packageJson.version}`);
console.log(`   Description: ${packageJson.description}`);
console.log(`   Main: ${packageJson.main}`);
console.log(`   Module: ${packageJson.module}`);
console.log(`   Types: ${packageJson.types}`);
console.log(`   Files: ${packageJson.files.join(', ')}\n`);

console.log('🔍 Build artifacts found:');
for (const dir of requiredDirs) {
  const files = fs.readdirSync(dir);
  console.log(`   ${dir}/: ${files.length} files`);
}
console.log('');

// Ask for confirmation
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Are you sure you want to publish this package to npm? (yes/no): ', (answer) => {
  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    console.log('\n🚀 Publishing to npm...');
    
    try {
      // Run npm publish
      execSync('npm publish', { stdio: 'inherit' });
      
      console.log('\n✅ Successfully published availity-reactstrap-validation v3.0.0 to npm!');
      console.log('📦 Package URL: https://www.npmjs.com/package/availity-reactstrap-validation');
      
      // Create git tag
      try {
        execSync('git tag v3.0.0', { stdio: 'pipe' });
        execSync('git push origin v3.0.0', { stdio: 'pipe' });
        console.log('🏷️  Git tag v3.0.0 created and pushed');
      } catch (error) {
        console.warn('⚠️  Warning: Could not create git tag');
      }
      
    } catch (error) {
      console.error('❌ Error publishing to npm:', error.message);
      process.exit(1);
    }
  } else {
    console.log('❌ Publishing cancelled.');
  }
  
  rl.close();
});
