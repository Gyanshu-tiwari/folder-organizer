#!/usr/bin/env node

/*

 * Folder Organizer CLI
 * Organizes files in a folder based on file type
 
*/

const fs = require("fs");
const path = require("path");


// 1. Read CLI arguments

const args = process.argv.slice(2);
const targetFolder = args[0];
const isDryRun = args.includes("--dry-run");


// 2. Validate input

if (!targetFolder) {
  console.error("❌ Error: Please provide a folder path.");
  console.log("Usage: organize <folder-path> [--dry-run]");
  process.exit(1);
}

if (!fs.existsSync(targetFolder)) {
  console.error("❌ Error: The provided folder does not exist.");
  process.exit(1);
}


// 3. File categories

const FILE_TYPES = {
  Images: [".jpg", ".jpeg", ".png", ".gif"],
  Videos: [".mp4", ".mkv", ".avi"],
  PDFs: [".pdf"],
  Documents: [".doc", ".docx", ".txt"],
  Archives: [".zip", ".rar"],
};


// 4. Organize logic

function organizeFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const fullPath = path.join(folderPath, file);

    // Skip directories
    if (fs.statSync(fullPath).isDirectory()) return;

    const ext = path.extname(file).toLowerCase();
    let category = "Others";

    for (const type in FILE_TYPES) {
      if (FILE_TYPES[type].includes(ext)) {
        category = type;
        break;
      }
    }

    const categoryPath = path.join(folderPath, category);

    if (!fs.existsSync(categoryPath)) {
      if (!isDryRun) fs.mkdirSync(categoryPath);
    }

    if (isDryRun) {
      console.log(`[DRY-RUN] ${file} → ${category}/`);
    } else {
      try {
        fs.renameSync(fullPath, path.join(categoryPath, file));
        console.log(`✅ Moved: ${file} → ${category}/`);
      } catch (err) {
        console.error(`⚠️ Failed to move ${file}:`, err.message);
      }
    }
  });
}


// 5. Run organizer

console.log(
  isDryRun
    ? "🧪 Running in DRY-RUN mode (no files will be moved)"
    : "📂 Organizing folder..."
);

organizeFolder(targetFolder);

console.log("🎉 Done!");
