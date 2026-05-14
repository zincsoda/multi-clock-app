import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ReloadPrompt from "./ReloadPrompt";

const mockState = {
  needRefresh: false,
  updateServiceWorker: vi.fn().mockResolvedValue(undefined),
};

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    needRefresh: [mockState.needRefresh, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker: mockState.updateServiceWorker,
  }),
}));

describe("ReloadPrompt", () => {
  beforeEach(() => {
    mockState.needRefresh = false;
    mockState.updateServiceWorker.mockClear();
  });

  afterEach(() => {
    mockState.needRefresh = false;
  });

  test("renders nothing when no update is pending", () => {
    mockState.needRefresh = false;
    const { container } = render(<ReloadPrompt />);
    expect(container.firstChild).toBeNull();
  });

  test('shows a bottom banner and reloads when "Reload" is clicked', async () => {
    mockState.needRefresh = true;
    render(<ReloadPrompt />);

    expect(screen.getByText("New update available!")).toBeInTheDocument();
    const reload = screen.getByRole("button", { name: /reload/i });
    await userEvent.click(reload);

    expect(mockState.updateServiceWorker).toHaveBeenCalledWith(true);
  });
});
