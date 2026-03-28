# // THE WORK

A brutalist punk personal kanban + rhizomatic task patching interface.

Built for tracking creative projects with progress bars, a journal, draggable node-based task breakdowns with patch cables, and bespoke encouraging hover messages.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/the-work/

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `the-work`)
2. If your repo name is different from `the-work`, edit `vite.config.js` and change the `base` value to match: `base: '/your-repo-name/'`
3. Push this code:

```bash
git init
git add .
git commit -m "ship it"
git remote add origin https://github.com/YOUR_USERNAME/the-work.git
git branch -M main
git push -u origin main
```

4. In your repo settings on GitHub:
   - Go to **Settings → Pages**
   - Under **Source**, select **GitHub Actions**
5. The workflow will auto-run on push. Your site will be live at:
   `https://YOUR_USERNAME.github.io/the-work/`

## Data

All data (task completion, journal entries, patch node layouts) is stored in your browser's localStorage. It persists across sessions but is local to your browser/device.
