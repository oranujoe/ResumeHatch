
export interface CursorPosition {
  node: Node | null;
  offset: number;
}

export const saveCursorPosition = (element: HTMLElement): CursorPosition => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return { node: null, offset: 0 };
  }

  const range = selection.getRangeAt(0);
  return {
    node: range.startContainer,
    offset: range.startOffset
  };
};

export const restoreCursorPosition = (element: HTMLElement, position: CursorPosition): void => {
  if (!position.node || !element.contains(position.node)) {
    return;
  }

  try {
    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    range.setStart(position.node, Math.min(position.offset, position.node.textContent?.length || 0));
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (error) {
    console.warn('Could not restore cursor position:', error);
  }
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};
