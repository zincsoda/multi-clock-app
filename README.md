# Multi Clock App

A React application that displays multiple clocks for different timezones around the world.


## Features

- View multiple clocks simultaneously
- Displays time for: L.A., New York, Dublin, Jakarta, Hong Kong, and Tokyo
- Real-time updates

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

## Deployment (GitHub Pages)

The **Deploy GitHub Pages** workflow builds `main` and pushes the contents of **`build/`** to the **`gh-pages`** branch. GitHub Pages then serves that branch at your project URL.

### Flow

1. Create a **branch**, push your changes, and open a **pull request** into **`main`**.
2. Merge the PR on GitHub.
3. The workflow runs on **`main`** and updates **`gh-pages`**.

There is also a **CI** workflow on pull requests that runs `npm ci` and `npm run build`.

### One-time GitHub settings (required)

1. Repo → **Settings** → **Pages**.
2. **Build and deployment** → **Source** → **Deploy from a branch**.
3. Branch: **`gh-pages`**, folder: **`/` (root)** → **Save**.

Do **not** leave **Source** set to **GitHub Actions** if you use this workflow — that mode expects a different deploy path and will not serve the **`gh-pages`** branch output.

After the first successful workflow run, **`gh-pages`** will exist and you can select it above.

### Live URL

Use your **project** URL (includes the repo name), e.g. **`https://zincsoda.github.io/multi-clock-app/`** — not only `https://zincsoda.github.io/` (that is the **user/org** site from a different repo).

Keep **`homepage`** in `package.json` aligned with `https://<user>.github.io/<repo>/`.

### Manual run

**Actions** → **Deploy GitHub Pages** → **Run workflow**.

### Optional: deploy from your machine

Same branch-based publish as CI:

```bash
npm run deploy
```

### About “two” Actions runs

You may see **Deploy GitHub Pages** (this repo’s workflow) and **pages build / pages-build-deployment** (GitHub’s deployment when **`gh-pages`** updates). That is normal; the site content comes from **`gh-pages`**.

### Troubleshooting: README instead of the app

- **Pages → Source** must be **Deploy from branch** → **`gh-pages`** → **`/`**, not **`main`** and not **GitHub Actions** for this setup.
- Open the full project URL **`…github.io/<repo>/`** with the repo segment included.
