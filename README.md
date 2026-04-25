# React App ~ cPanel (BigRock/ftp/sftp) Using GitHub Actions

## Technology

This repository contains a modern frontend application built with the React ecosystem and optimized for static deployment.

- **Framework and build tool:** The app uses **React 19** with **Vite** for fast local development, modern ES module support, and optimized production builds.
- **Application entry point:** `src/main.jsx` mounts the React application, while `src/App.jsx` coordinates the main page structure.
- **Styling system:** Styling is handled with **Tailwind CSS**, PostCSS, and custom CSS files. The Tailwind configuration is connected to shared design tokens from `src/tokens/designTokens.js`, which keeps colors, typography, shadows, and radius values consistent.
- **Theme support:** The project includes a theme context and `useTheme` hook to manage light/dark theme behavior across the UI.
- **UI structure:** Components are organized by responsibility under `src/components`, including reusable UI elements, layout components, and page sections such as Hero, Mission, Sustainability, Global Supply, Digital Pipeline, and Industry Applications.
- **Animations and visuals:** The frontend uses **Framer Motion** for interaction/animation patterns and **D3** for data-driven visual elements such as charts and maps.
- **Static assets:** Images, logos, and icons are stored under `src/assets` and `public`, allowing the Vite build process to package them for production.
- **Code quality:** ESLint is configured for React, hooks, refresh behavior, and modern JavaScript globals.
- **Deployment model:** The application builds into static files using `npm run build`, making it suitable for deployment to cPanel, FTP/SFTP hosting, or any static hosting environment.

In short, this repo is a component-based React frontend with a token-driven design system, animation-rich sections, and a static build pipeline designed for simple hosting.

---

## Target Setup

- WordPress site: `https://yourdomain.com`
- React app: `https://yourdomain.com/app`
- Deployment: Automated via GitHub Actions
- Hosting: cPanel (BigRock)

---

## Architecture

- Repository: GitHub
- CI/CD: GitHub Actions
- Hosting: cPanel via FTP/SFTP

---


## Step 1: Get FTP Credentials from cPanel

In cPanel:

1. Go to **FTP Accounts**
2. Create or use an existing FTP account

You will need:

- FTP Host (e.g. `ftp.yourdomain.com`)
- Username
- Password
- Port (21 for FTP or 22 for SFTP)

---

## Step 2: Add Secrets in GitHub

Navigate to:
Repository → Settings → Secrets → Actions


Add the following secrets:


FTP_SERVER=ftp.yourdomain.com
FTP_USERNAME=your_username
FTP_PASSWORD=your_password
FTP_TARGET_DIR=public_html/app


---

## Step 3: Create GitHub Actions Workflow

Create a file:


.github/workflows/deploy.yml


### Workflow Configuration

```yaml
name: Deploy React to cPanel

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: build/
          server-dir: ${{ secrets.FTP_TARGET_DIR }}/
          dangerous-clean-slate: true
```
---

## Step 4: Configure React for Subdirectory Deployment

Update your package.json:

```JSON

"homepage": "/app"

```

Rebuild your project after this change:

```yaml

npm run build

```

## Step 5: Configure Routing with .htaccess

To prevent routing issues on refresh, create a .htaccess file inside:

public_html/app/

Add the following:

```apache

RewriteEngine On
RewriteBase /app/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /app/index.html [L]

```

## Deployment Flow
1. Developer pushes code to main branch
2. GitHub Actions triggers workflow
3. Application is built
4. Build files are uploaded to public_html/app/
5. React app is live at /app

## Important Notes
1. Do not upload files to public_html/ root (this will break WordPress)
2. Only upload contents of the build/ folder
3. Ensure .htaccess is correctly placed in /app
4. Ensure homepage is set correctly to avoid broken asset paths