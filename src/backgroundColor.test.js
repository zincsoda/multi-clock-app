import fs from 'fs';
import path from 'path';

/** CSS named colour Orange (https://www.w3.org/TR/css-color-4/#named-colors) */
const EXPECTED_HEX = '#ffa500';
const expectedLower = EXPECTED_HEX.toLowerCase();

describe('app background color', () => {
  test('App.css uses the canonical background on the shell', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    expect(appCss.toLowerCase()).toContain(expectedLower);
    expect(appCss).toMatch(
      new RegExp(`background(?:-color)?:\\s*${EXPECTED_HEX}\\b`, 'i')
    );
    expect(appCss.toLowerCase()).not.toContain('#00468b');
  });

  test('index.css applies the color to html, body, and #root', () => {
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const count =
      indexCss.toLowerCase().split(expectedLower).length - 1;
    expect(count).toBeGreaterThanOrEqual(6);
    expect(indexCss.toLowerCase()).not.toContain('#00468b');
  });

  test('previous purple signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain('#2d1b4e');
    expect(indexCss.toLowerCase()).not.toContain('#2d1b4e');
    expect(html.toLowerCase()).not.toContain('#2d1b4e');
  });

  test('previous navy signage background is not used', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(appCss.toLowerCase()).not.toContain('#0d1b2a');
    expect(indexCss.toLowerCase()).not.toContain('#0d1b2a');
    expect(html.toLowerCase()).not.toContain('#0d1b2a');
  });

  test('public index.html uses the color for theme-color and inline fallbacks', () => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(html).toContain(`content="${EXPECTED_HEX}"`);
    expect(html.toLowerCase()).not.toContain('#00468b');
    expect(html.toLowerCase()).not.toContain('#8b3a00');
  });

  test('web app manifest theme and background_color match', () => {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    expect(manifest.theme_color.toLowerCase()).toBe(expectedLower);
    expect(manifest.background_color.toLowerCase()).toBe(expectedLower);
  });

  test('manifest does not reference the previous blue theme', () => {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const raw = fs.readFileSync(manifestPath, 'utf8').toLowerCase();
    expect(raw).not.toContain('#00468b');
  });
});
