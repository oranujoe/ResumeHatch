import { describe, it, expect, beforeEach } from 'vitest';
import { getOptions, saveOptions, DEFAULT_OPTIONS } from './storage';

// Mock chrome.storage.sync with simple in-memory object
const memory: Record<string, any> = {};
// @ts-ignore
(global as any).chrome = {
  storage: {
    sync: {
      get: (keys: any, callback: any) => {
        callback(memory);
      },
      set: (items: any, callback?: any) => {
        Object.assign(memory, items);
        callback && callback();
      },
    } as any,
  },
} as any;

beforeEach(() => {
  // reset memory before each test
  for (const k of Object.keys(memory)) delete memory[k];
});

describe('options storage helpers', () => {
  it('returns default options when storage empty', async () => {
    const opts = await getOptions();
    expect(opts).toEqual(DEFAULT_OPTIONS);
  });

  it('saves and retrieves updated options', async () => {
    await saveOptions({ showBadge: false, autoCopy: true });
    const opts = await getOptions();
    expect(opts.showBadge).toBe(false);
    expect(opts.autoCopy).toBe(true);
    // unchanged values remain default
    expect(opts.desktopNotifications).toBe(DEFAULT_OPTIONS.desktopNotifications);
  });
}); 