import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'client', 'public');
const optimizedDir = join(publicDir, 'optimized');

async function optimizeImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase();
  
  try {
    if (ext === '.png') {
      await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);
    } else {
      console.log(`Skipping ${inputPath} - unsupported format`);
      return;
    }
    
    const inputStats = await stat(inputPath);
    const outputStats = await stat(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
    
    console.log(`✓ Optimized: ${inputPath}`);
    console.log(`  Original: ${(inputStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Optimized: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Reduction: ${reduction}%\n`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = await readdir(dir);
  
  // Create optimized directory if it doesn't exist
  try {
    await mkdir(optimizedDir, { recursive: true });
  } catch (err) {
    // Directory already exists
  }
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      continue; // Skip directories
    }
    
    const ext = extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const outputPath = join(optimizedDir, file);
      await optimizeImage(filePath, outputPath);
    }
  }
}

console.log('Starting image optimization...\n');
processDirectory(publicDir)
  .then(() => {
    console.log('Image optimization complete!');
    console.log(`Optimized images saved to: ${optimizedDir}`);
  })
  .catch(error => {
    console.error('Error during optimization:', error);
    process.exit(1);
  });

