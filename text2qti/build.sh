#!/bin/bash
echo "Building Text2QTI Desktop App..."

# Use PyInstaller to build a single executable, excluding console, adding the web directory
/Users/nhyysaepx/Library/Python/3.9/bin/pyinstaller --name "Text2QTI" --windowed --onefile --add-data "web:web" --hidden-import striprtf app.py

echo "Build complete. Check the 'dist' folder for your executable."
