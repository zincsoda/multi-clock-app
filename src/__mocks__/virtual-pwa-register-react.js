import { vi } from "vitest";

const noop = () => {};

/**
 * Test double for `virtual:pwa-register/react` (real module only exists with vite-plugin-pwa).
 */
export function useRegisterSW(_options) {
  return {
    needRefresh: [false, noop],
    offlineReady: [false, noop],
    updateServiceWorker: vi.fn().mockResolvedValue(undefined),
  };
}
