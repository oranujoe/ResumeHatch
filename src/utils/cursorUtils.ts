
export interface CursorPosition {
  textOffset: number;
  containerPath: number[];
}

export const getTextOffset = (element: HTMLElement, node: Node, offset: number): number => {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );

  let textOffset = 0;
  let currentNode;

  while (currentNode = walker.nextNode()) {
    if (currentNode === node) {
      return textOffset + offset;
    }
    textOffset += currentNode.textContent?.length || 0;
  }

  return textOffset;
};

export const getNodeFromTextOffset = (element: HTMLElement, textOffset: number): { node: Node | null; offset: number } => {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentOffset = 0;
  let currentNode;

  while (currentNode = walker.nextNode()) {
    const nodeLength = currentNode.textContent?.length || 0;
    if (currentOffset + nodeLength >= textOffset) {
      return {
        node: currentNode,
        offset: textOffset - currentOffset
      };
    }
    currentOffset += nodeLength;
  }

  return { node: null, offset: 0 };
};

export const saveCursorPosition = (element: HTMLElement): CursorPosition => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return { textOffset: 0, containerPath: [] };
  }

  const range = selection.getRangeAt(0);
  const textOffset = getTextOffset(element, range.startContainer, range.startOffset);
  
  return {
    textOffset,
    containerPath: []
  };
};

export const restoreCursorPosition = (element: HTMLElement, position: CursorPosition): void => {
  try {
    const selection = window.getSelection();
    if (!selection) return;

    const { node, offset } = getNodeFromTextOffset(element, position.textOffset);
    if (!node) return;

    const range = document.createRange();
    range.setStart(node, Math.min(offset, node.textContent?.length || 0));
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
