# Image Optimization Guide

Your portfolio images are quite large and can be optimized for better performance:

## Current Image Sizes:
- `japansynth.jpeg`: 3.1MB
- `starssynth.jpeg`: 2.8MB  
- `synthHD.jpeg`: 1.8MB

## Recommended Optimizations:

### 1. Compress JPEG Images
Use online tools like:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac app)

### 2. Convert to WebP (Modern browsers)
WebP provides better compression than JPEG:
```bash
# Using cwebp (Google WebP tools)
cwebp -q 80 japansynth.jpeg -o japansynth.webp
cwebp -q 80 starssynth.jpeg -o starssynth.webp
cwebp -q 80 synthHD.jpeg -o synthHD.webp
```

### 3. Use Responsive Images
Consider providing multiple sizes for different screen sizes.

### 4. Lazy Loading
Images are already using Parallax which helps with performance.

## Target Sizes:
- Aim for under 500KB per image
- Use 80-85% quality for JPEG
- Consider 1920px max width for background images

## Quick Fix:
For immediate improvement, compress existing JPEGs to 80% quality - this should reduce file sizes by 60-70% with minimal visual quality loss. 