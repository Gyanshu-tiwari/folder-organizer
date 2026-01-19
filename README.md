# Folder Organizer CLI

## 📌 Problem Statement
My system’s Downloads folder often becomes cluttered with PDFs, images, videos, and other files. Manually organizing these files is repetitive and time-consuming.

## 💡 Solution
This command-line utility automatically organizes files inside a given folder into categorized subfolders such as Images, PDFs, Videos, Documents, Archives, and Others.

## 🛠 Tech Stack
- Language: JavaScript
- Runtime: Node.js
- Core Modules: fs, path

## 🚀 Installation
```bash
git clone <your-repo-url>
cd folder-organizer
npm link
```

## ▶️ Usage
```bash
organize <folder-path>
```

Example:
```bash
organize ~/Downloads
```

## 🧪 Dry Run Mode
To preview changes without moving files:
```bash
organize ~/Downloads --dry-run
```

## ⚠️ Error Handling
- Invalid or missing folder path
- Skips directories
- Handles file permission issues gracefully

## 🧠 Design Decisions
- Chose Node.js for simplicity and cross-platform compatibility
- Used synchronous file operations for predictable CLI behavior
- Implemented dry-run mode to prevent accidental data loss

## ✅ Outcome
The CLI helps maintain a clean file system and improves productivity by automating repetitive organization tasks.