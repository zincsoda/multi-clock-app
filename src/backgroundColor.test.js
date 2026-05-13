import fs from 'fs';
import path from 'path';

const EXPECTED_HEX = '#2d1b4e';
const expectedLower = EXPECTED_HEX.toLowerCase();

describe('app background color', () => {
  test('App.css uses the canonical background on the shell', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    expect(appCss.toLowerCase()).toContain(expectedLower);
    expect(appCss).toMatch(/background(?:-color)?:\s*#2d1b4e\b/i);
    expect(appCss.toLowerCase()).not.toContain('#00468b');
  });

  test('index.css applies the color to html, body, and #root', () => {
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const occurrences = indexCss.match(/#2d1b4e/gi) ?? [];
    expect(occurrences.length).toBeGreaterThanOrEqual(6);
    expect(indexCss.toLowerCase()).not.toContain('#00468b');
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
