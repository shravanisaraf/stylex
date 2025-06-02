
# Images Folder Structure

This folder contains all clothing item images organized by category.

## Folder Structure:
```
public/images/
├── tops/           # Shirts, blouses, sweaters, t-shirts
├── bottoms/        # Jeans, pants, skirts, shorts
├── jackets/        # Jackets, coats, blazers
├── dresses/        # All types of dresses
├── accessories/    # Bags, jewelry, belts, scarves
└── shoes/          # Sneakers, heels, boots, sandals
```

## Supported Formats:
- .jpg
- .jpeg
- .png
- .webp
- .svg

## File Naming Convention:
Use descriptive names with hyphens, for example:
- `white-cotton-blouse.jpg`
- `dark-blue-skinny-jeans.jpg`
- `black-leather-jacket.jpg`

## How to Add Images:
1. Place your images in the appropriate category folder
2. Update the `imageUrl` field in `src/pages/Index.tsx` with the path `/images/[category]/[filename]`

Example:
```javascript
imageUrl: "/images/tops/white-blouse.jpg"
```
