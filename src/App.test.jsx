import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the clock cities", () => {
  render(<App />);

  expect(screen.getByText("L.A.")).toBeInTheDocument();
  expect(screen.getByText("New York")).toBeInTheDocument();
  expect(screen.getByText("Hong Kong")).toBeInTheDocument();
  expect(screen.queryByText("Paris")).not.toBeInTheDocument();
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
