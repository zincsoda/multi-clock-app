# Multi Clock App

A React application for displaying multiple clocks.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GitHub Pages Deployment

This app is configured for deployment to GitHub Pages. Follow these steps:

### Initial Setup

1. **Update the homepage URL** in `package.json`:
   - Replace `YOUR_USERNAME` with your GitHub username
   - If your repository name is different from `multi-clock-app`, update that too
   - The format should be: `https://yourusername.github.io/repository-name`

2. **Ensure your code is pushed to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push origin main
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

   This will:
   - Build your app for production
   - Create/update a `gh-pages` branch with the built files
   - Push the branch to GitHub

4. **Enable GitHub Pages in your repository settings**:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under "Source", select the `gh-pages` branch
   - Click **Save**

5. **Access your app**:
   - Your app will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes for the changes to propagate

### Subsequent Deployments

After making changes to your app, simply run:
```bash
npm run deploy
```

This will rebuild and redeploy your app to GitHub Pages.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
