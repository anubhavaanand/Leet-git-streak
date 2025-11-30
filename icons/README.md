# Icons Directory

This directory should contain the extension icons:

- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can create icons using:
- Online tools like [Favicon Generator](https://favicon.io/)
- Design tools like Figma, Canva, or Photoshop
- Simple emoji-based icons (🔥 for fire/streak theme)

## Quick Icon Creation

If you want to create simple placeholder icons quickly, you can use ImageMagick (if installed):

```bash
# Create a simple colored square icon
convert -size 16x16 xc:#667eea icon16.png
convert -size 48x48 xc:#667eea icon48.png
convert -size 128x128 xc:#667eea icon128.png
```

Or use any image editor to create icons with a fire/streak theme!

