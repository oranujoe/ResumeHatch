export interface Options {
  // Behaviour
  showBadge: boolean;
  desktopNotifications: boolean;
  autoCopy: boolean;
  closeTabOnSend: boolean;

  // Board toggles
  enableLinkedIn: boolean;
  enableIndeed: boolean;
  enableGlassdoor: boolean;
  enableWWR: boolean;

  // UI
  showOverlay: boolean;
}

export const DEFAULT_OPTIONS: Options = {
  showBadge: true,
  desktopNotifications: true,
  autoCopy: false,
  closeTabOnSend: false,

  enableLinkedIn: true,
  enableIndeed: true,
  enableGlassdoor: false,

  enableWWR: false,
  showOverlay: false,
};

export function getOptions(): Promise<Options> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['options'], (data) => {
      const opts: Options = { ...DEFAULT_OPTIONS, ...(data.options || {}) };
      resolve(opts);
    });
  });
}

export function saveOptions(patch: Partial<Options>): Promise<void> {
  return new Promise((resolve) => {
    getOptions().then((current) => {
      const updated = { ...current, ...patch };
      chrome.storage.sync.set({ options: updated }, () => resolve());
    });
  });
} 