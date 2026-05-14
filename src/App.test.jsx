import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./buildMetadata", () => ({
  getBuildMetadata: () => ({
    commitCount: "42",
    deployedAtIso: "2020-06-15T14:30:00.000Z",
  }),
}));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

beforeAll(() => {
  const cssPath = path.join(__dirname, "App.css");
  const style = document.createElement("style");
  style.dataset.testCss = "app-shell";
  style.textContent = fs.readFileSync(cssPath, "utf8");
  document.head.appendChild(style);
});

test("renders the clock cities", () => {
  render(<App />);

  expect(screen.getByText("L.A.")).toBeInTheDocument();
  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Hong Kong")).toBeInTheDocument();
  expect(screen.queryByText("Paris")).not.toBeInTheDocument();
});

test("main landmark has dark green shell background once styles apply", () => {
  render(<App />);
  const main = screen.getByRole("main", { name: /world clocks/i });
  expect(getComputedStyle(main).backgroundColor).toBe("rgb(13, 40, 24)");
});

test("lists Hong Kong second to last", () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole("heading", { level: 2 });
  expect(cityHeadings[cityHeadings.length - 2]).toHaveTextContent(
    "Hong Kong"
  );
  expect(cityHeadings[cityHeadings.length - 1]).toHaveTextContent("Tokyo");
});

test("shell landmark uses stylesheet container class", () => {
  render(<App />);

  const main = screen.getByRole("main", { name: /world clocks/i });
  expect(main).toHaveClass("app-container");
});

test("lists cities in fixed order", () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole("heading", { level: 2 });
  expect(cityHeadings.map((el) => el.textContent)).toEqual([
    "L.A.",
    "New York",
    "Dublin",
    "Jakarta",
    "Hong Kong",
    "Tokyo",
  ]);
});

test("lists Jakarta immediately after Dublin", () => {
  render(<App />);

  const cityHeadings = screen.getAllByRole("heading", { level: 2 });
  const dublinIdx = cityHeadings.findIndex((el) =>
    el.textContent.includes("Dublin")
  );
  expect(dublinIdx).toBeGreaterThanOrEqual(0);
  expect(cityHeadings[dublinIdx + 1]).toHaveTextContent("Jakarta");
});

test("shows build metadata in the footer", () => {
  render(<App />);

  const footer = screen.getByRole("contentinfo", { name: /build information/i });
  expect(footer).toBeInTheDocument();
  expect(footer).toHaveTextContent("Version");
  expect(footer).toHaveTextContent("42");
  expect(footer).toHaveTextContent(/Last deployed/i);

  expect(screen.getByRole("time")).toHaveAttribute(
    "dateTime",
    "2020-06-15T14:30:00.000Z"
  );
});
