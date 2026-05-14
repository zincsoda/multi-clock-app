import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Dark green shell background */
const EXPECTED_HEX = '#0d2818';
const expectedLower = EXPECTED_HEX.toLowerCase();

/** Former dark navy shell (replaced by dark green) */
const LEGACY_SHELL_DARK_NAVY_HEX = '#0a1628';

/** Former yellow signage shell (must not return on HTML/CSS surfaces) */
const LEGACY_SHELL_YELLOW_HEX = '#ffff00';

const ORANGE_SIGNAGE_HEX = '#ffa500';

/** Former navy signage shell (must not linger on HTML/CSS shell surfaces) */
const LEGACY_SHELL_NAVY_HEX = '#0e2236';

describe('app background color', () => {
  test('canonical shell hex is a dark green (green channel dominates)', () => {
    const r = parseInt(EXPECTED_HEX.slice(1, 3), 16);
    const g = parseInt(EXPECTED_HEX.slice(3, 5), 16);
    const b = parseInt(EXPECTED_HEX.slice(5, 7), 16);
    expect(g).toBeGreaterThan(r);
    expect(g).toBeGreaterThan(b);
    expect(r + g + b).toBeLessThan(120);
  });

  test('previous dark navy shell background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const publicHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const publicHtml = fs.readFileSync(publicHtmlPath, 'utf8');
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    const legacy = LEGACY_SHELL_DARK_NAVY_HEX.toLowerCase();
    expect(appCss.toLowerCase()).not.toContain(legacy);
    expect(indexCss.toLowerCase()).not.toContain(legacy);
    expect(html.toLowerCase()).not.toContain(legacy);
    expect(publicHtml.toLowerCase()).not.toContain(legacy);
    expect(manifest.toLowerCase()).not.toContain(legacy);
  });

  test('App.css uses the canonical background on the shell', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    expect(appCss.toLowerCase()).toContain(expectedLower);
    expect(appCss).toMatch(
      new RegExp(`background(?:-color)?:\\s*${EXPECTED_HEX}\\b`, 'i')
    );
    expect(appCss.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(appCss.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(appCss.toLowerCase()).not.toContain('#00468b');
    expect(appCss.toLowerCase()).not.toContain(LEGACY_SHELL_NAVY_HEX);
  });

  test('index.css applies the color to html, body, and #root', () => {
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const count =
      indexCss.toLowerCase().split(expectedLower).length - 1;
    expect(count).toBeGreaterThanOrEqual(6);
    expect(indexCss.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(indexCss.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(indexCss.toLowerCase()).not.toContain('#00468b');
    expect(indexCss.toLowerCase()).not.toContain(LEGACY_SHELL_NAVY_HEX);
  });

  test('previous purple signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain('#2d1b4e');
    expect(indexCss.toLowerCase()).not.toContain('#2d1b4e');
    expect(html.toLowerCase()).not.toContain('#2d1b4e');
  });

  test('previous navy signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain('#0d1b2a');
    expect(indexCss.toLowerCase()).not.toContain('#0d1b2a');
    expect(html.toLowerCase()).not.toContain('#0d1b2a');
  });

  test('yellow signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(indexCss.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(html.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(manifest.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
  });

  test('orange signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(indexCss.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(html.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(manifest.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
  });

  test('root index.html uses the color for theme-color and inline fallbacks', () => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(html).toContain(`content="${EXPECTED_HEX}"`);
    expect(html.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(html.toLowerCase()).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(html.toLowerCase()).not.toContain('#00468b');
    expect(html.toLowerCase()).not.toContain('#8b3a00');
    expect(html.toLowerCase()).not.toContain(LEGACY_SHELL_NAVY_HEX);
  });

  test('public/index.html mirrors shell background and theme-color', () => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(html).toContain(`content="${EXPECTED_HEX}"`);
    expect(html.toLowerCase()).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(html.toLowerCase()).not.toContain(LEGACY_SHELL_NAVY_HEX);
  });

  test('web app manifest theme and background_color match', () => {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    expect(manifest.theme_color.toLowerCase()).toBe(expectedLower);
    expect(manifest.background_color.toLowerCase()).toBe(expectedLower);
  });

  test('manifest does not reference legacy shell themes', () => {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const raw = fs.readFileSync(manifestPath, 'utf8').toLowerCase();
    expect(raw).not.toContain(LEGACY_SHELL_YELLOW_HEX);
    expect(raw).not.toContain(ORANGE_SIGNAGE_HEX);
    expect(raw).not.toContain('#00468b');
    expect(raw).not.toContain(LEGACY_SHELL_NAVY_HEX);
  });

  test("App.jsx imports App.css so the shell class receives bundled backgrounds", () => {
    const appJs = fs.readFileSync(path.join(__dirname, "App.jsx"), "utf8");
    expect(appJs).toContain('"./App.css"');
    expect(appJs).toContain("app-container");
  });
});
