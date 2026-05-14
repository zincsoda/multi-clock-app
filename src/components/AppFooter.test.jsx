import { render, screen } from "@testing-library/react";
import AppFooter, { formatDeployedAt } from "./AppFooter";

describe("formatDeployedAt", () => {
  test("returns an em dash when iso is missing", () => {
    expect(formatDeployedAt("")).toBe("—");
  });

  test("returns an em dash when iso is invalid", () => {
    expect(formatDeployedAt("not-a-date")).toBe("—");
  });

  test("formats a valid ISO timestamp for display", () => {
    const label = formatDeployedAt("2020-06-15T14:30:00.000Z");
    expect(label).not.toBe("—");
    expect(label.length).toBeGreaterThan(6);
  });
});

describe("AppFooter", () => {
  test("shows commit count as version and exposes deployment time metadata", () => {
    render(
      <AppFooter commitCount="42" deployedAtIso="2020-06-15T14:30:00.000Z" />
    );

    const footer = screen.getByRole("contentinfo", { name: /build information/i });
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Version");
    expect(footer).toHaveTextContent("42");
    expect(footer).toHaveTextContent(/Last deployed/i);

    const timeEl = screen.getByRole("time");
    expect(timeEl).toHaveAttribute("dateTime", "2020-06-15T14:30:00.000Z");
    expect(timeEl.textContent).not.toBe("—");
  });
});
