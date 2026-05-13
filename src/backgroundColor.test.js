import fs from 'fs';
import path from 'path';

const EXPECTED_HEX = '#14532D';
const expectedLower = EXPECTED_HEX.toLowerCase();

describe('app background color', () => {
  test('canonical hex is a dark green (green-dominant, low luminance)', () => {
    const hex = EXPECTED_HEX.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    expect(g).toBeGreaterThan(r);
    expect(g).toBeGreaterThan(b);
    expect((r + g + b) / 3).toBeLessThan(90);
  });

  test('shell styles no longer reference the legacy blue backdrop', () => {
    const legacyBlue = '#00468b';
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    expect(appCss.toLowerCase()).not.toContain(legacyBlue);
    expect(indexCss.toLowerCase()).not.toContain(legacyBlue);
  });

  test('App.css uses the canonical background on the shell', () => {
    const appCss = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
    expect(appCss.toLowerCase()).toContain(expectedLower);
    expect(appCss).toMatch(/background(?:-color)?:\s*#14532D\b/i);
  });

  test('index.css applies the color to html, body, and #root', () => {
    const indexCss = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    const occurrences = indexCss.match(/#14532d/gi) ?? [];
    expect(occurrences.length).toBeGreaterThanOrEqual(6);
  });

  test('public index.html uses the color for theme-color and inline fallbacks', () => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    expect(html).toContain(`content="${EXPECTED_HEX}"`);
    expect(html.toLowerCase()).not.toContain('#8b3a00');
  });

  test('web app manifest theme and background_color match', () => {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    expect(manifest.theme_color.toLowerCase()).toBe(expectedLower);
    expect(manifest.background_color.toLowerCase()).toBe(expectedLower);
  });
});
