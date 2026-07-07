# Deployment Guide — GitHub Pages

This document covers deploying the AR/VR portfolio to **GitHub Pages** and alternative hosting options.

## Prerequisites

- A [GitHub](https://github.com) account
- [Git](https://git-scm.com/) installed locally
- Portfolio files customized with your content

## Option A: GitHub Pages (Recommended)

### Step 1 — Create a GitHub repository

1. Log in to GitHub and click **New repository**
2. Name it `yourusername.github.io` (for a user site) or any name (for a project site)
3. Set visibility to **Public**
4. Do **not** initialize with a README (if uploading locally)

### Step 2 — Push your code

```bash
cd PF3
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Open your repository on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at:

- User site: `https://yourusername.github.io`
- Project site: `https://yourusername.github.io/repo-name`

> The root `index.html` automatically redirects visitors to `html/index.html`.

### Step 4 — Custom domain (optional)

1. Purchase a domain from any registrar
2. In **Settings → Pages → Custom domain**, enter your domain
3. Add DNS records at your registrar:
   - **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or a **CNAME** record pointing to `yourusername.github.io`
4. Enable **Enforce HTTPS**

Update the canonical URL in `html/index.html`:

```html
<link rel="canonical" href="https://yourdomain.com/">
```

## Option B: Deploy from `/docs` folder

If you prefer keeping the site in a `docs/` folder:

1. Copy the entire site structure into a `docs/` folder
2. Adjust all asset paths (remove `../` prefixes)
3. In GitHub Pages settings, set source to **main → /docs**

## Option C: Alternative hosting

### Netlify

1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Set publish directory to project root
3. Add a `_redirects` file:

```
/html/index.html  /html/index.html  200
/*                /index.html       301
```

### Vercel

```bash
npx vercel
```

Set the root directory and deploy.

### Cloudflare Pages

1. Connect your GitHub repository
2. Set build command: *(none)*
3. Set output directory: `/` (root)

## Post-Deployment Checklist

- [ ] Replace all placeholder text in `html/index.html`
- [ ] Update `js/projects.js` with real project data
- [ ] Add your profile photo to `images/profile.jpg`
- [ ] Upload your CV to `assets/`
- [ ] Replace gallery and project images
- [ ] Update YouTube video IDs in the Videos section
- [ ] Update Google Drive video URLs in `projects.js`
- [ ] Verify all external links (GitHub, LinkedIn, email)
- [ ] Update SEO meta tags and Open Graph image
- [ ] Test on mobile, tablet, and desktop
- [ ] Test dark/light mode toggle
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Validate HTML at [validator.w3.org](https://validator.w3.org/)

## Troubleshooting

### CSS/JS not loading

Paths in `html/index.html` use `../css/` and `../js/`. Ensure the folder structure is intact. If you move `index.html` to root, update paths to `css/` and `js/`.

### Images not showing

Place images in the correct folders under `images/`. SVG placeholders display automatically via `onerror` fallbacks.

### GitHub Pages 404

- Confirm Pages is enabled in repository settings
- Wait 1–5 minutes after the first deploy
- Check that `index.html` exists at the publish root

### Contact form not sending emails

The included form is a front-end demo. To send real emails, integrate a service such as:

- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)

Example Formspree integration — update the form tag:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Updating the live site

After making changes locally:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages redeploys automatically within 1–3 minutes.
