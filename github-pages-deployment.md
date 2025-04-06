# GitHub Pages Deployment Guide for Anto Idicherian Lonappan's Website

This document provides instructions for deploying the website to GitHub Pages at antolonappan.github.io.

## Prerequisites

1. GitHub account (already exists as indicated by antolonappan.github.io)
2. Git installed on your local machine

## Deployment Steps

### Option 1: Direct GitHub Pages Deployment

1. Create a new repository named `antolonappan.github.io` (if it doesn't already exist)
2. Clone the repository to your local machine:
   ```
   git clone https://github.com/antolonappan/antolonappan.github.io.git
   ```
3. Copy all website files to the cloned repository folder
4. Add, commit, and push the files:
   ```
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```
5. GitHub will automatically build and deploy the site to antolonappan.github.io

### Option 2: Using GitHub Desktop

1. Download and install GitHub Desktop
2. Sign in with your GitHub account
3. Create a new repository named `antolonappan.github.io` (if it doesn't already exist)
4. Copy all website files to the repository folder
5. Commit the changes with a descriptive message
6. Push the changes to GitHub

## File Structure

Ensure your repository has the following structure:

```
antolonappan.github.io/
├── index.html
├── css/
│   ├── style.css
│   └── effects.css
├── js/
│   ├── main.js
│   └── effects.js
└── images/
    ├── profile.jpg
    ├── about-image.jpg
    ├── bg-pattern.png
    ├── paper-texture.png
    ├── noise.png
    ├── corner-decoration.png
    ├── ink-splatter.png
    └── stars-bg.png
```

## Important Notes

1. GitHub Pages serves content from either:
   - The root directory of the `main` branch
   - The `/docs` folder in the `main` branch
   - The `gh-pages` branch

2. Make sure all file paths in your HTML, CSS, and JavaScript files are relative paths.

3. If you're using a custom domain, you'll need to add a CNAME file to your repository.

4. GitHub Pages automatically builds and deploys your site when you push changes to the repository.

## Troubleshooting

- If your site isn't building correctly, check the GitHub Pages section in your repository settings.
- Ensure all file paths are correct and use relative paths.
- Check for any 404 errors in the browser console.
- Verify that all required files are included in the repository.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Setting up a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
