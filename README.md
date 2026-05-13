# Multi Clock App

A React application that displays multiple clocks for different timezones around the world.


## Features

- View multiple clocks simultaneously
- Displays time for: L.A., New York, Dublin, Hong Kong, Jakarta, and Tokyo
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

Deployments run **on GitHub** when changes reach **`main`** — no local merge script required.

### Flow

1. Create a **branch**, push your changes, and open a **pull request** into `main` on GitHub.
2. Merge the PR on GitHub (merge, squash, or rebase — your choice).
3. The **Deploy GitHub Pages** workflow builds the app and publishes the site.

There is also a **CI** workflow on pull requests that runs `npm ci` and `npm run build` so broken builds are caught before merge.

### One-time GitHub settings

1. Repo → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).  
   If you previously used the `gh-pages` branch with `npm run deploy`, switch to GitHub Actions so the workflow below is what publishes the site.

After the first successful deploy, the workflow summary shows the live URL (same as the `homepage` in `package.json` when configured correctly).

### Manual deploy from Actions

Repo → **Actions** → **Deploy GitHub Pages** → **Run workflow** (runs against the latest `main`).

### Optional: deploy from your machine

If you still publish via the `gh-pages` git branch (legacy), you can run:

```bash
npm run deploy
```

Keep **`homepage`** in `package.json` aligned with `https://<user>.github.io/<repo>/`.
