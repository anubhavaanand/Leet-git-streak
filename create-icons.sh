#!/bin/bash
# Simple script to create placeholder icons using ImageMagick
# If ImageMagick is not installed, you'll need to create icons manually

if command -v convert &> /dev/null; then
    echo "Creating icons with ImageMagick..."
    
    # Create icons with gradient colors matching the extension theme
    convert -size 16x16 xc:"#667eea" -fill "#764ba2" -draw "circle 8,8 8,0" icons/icon16.png
    convert -size 48x48 xc:"#667eea" -fill "#764ba2" -draw "circle 24,24 24,0" icons/icon48.png
    convert -size 128x128 xc:"#667eea" -fill "#764ba2" -draw "circle 64,64 64,0" icons/icon128.png
    
    echo "Icons created successfully!"
else
    echo "ImageMagick not found. Please install it or create icons manually."
    echo "You can install ImageMagick with: sudo apt-get install imagemagick"
    echo ""
    echo "Alternatively, create icons manually:"
    echo "  - icon16.png (16x16 pixels)"
    echo "  - icon48.png (48x48 pixels)"
    echo "  - icon128.png (128x128 pixels)"
fi

