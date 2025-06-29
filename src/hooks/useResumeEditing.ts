
import { useCallback, useRef } from 'react';
import { saveCursorPosition, restoreCursorPosition, debounce, CursorPosition } from '@/utils/cursorUtils';

interface UseResumeEditingProps {
  onContentChange: (content: string) => void;
  debounceDelay?: number;
}

export const useResumeEditing = ({ onContentChange, debounceDelay = 300 }: UseResumeEditingProps) => {
  const isProcessingRef = useRef(false);
  const cursorPositionRef = useRef<CursorPosition>({ node: null, offset: 0 });
  
  // Debounced content change handler
  const debouncedContentChange = useCallback(
    debounce((content: string) => {
      onContentChange(content);
      isProcessingRef.current = false;
    }, debounceDelay),
    [onContentChange, debounceDelay]
  );
  
  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    
    // Prevent processing if already processing
    if (isProcessingRef.current) {
      return;
    }
    
    // Save cursor position before processing
    cursorPositionRef.current = saveCursorPosition(target);
    isProcessingRef.current = true;
    
    // Get the content and trigger debounced update
    const content = target.innerHTML;
    debouncedContentChange(content);
  }, [debouncedContentChange]);
  
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    
    // Restore cursor position if we have one saved
    if (cursorPositionRef.current.node) {
      setTimeout(() => {
        restoreCursorPosition(target, cursorPositionRef.current);
      }, 0);
    }
  }, []);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Save cursor position on key interactions
    const target = event.currentTarget;
    cursorPositionRef.current = saveCursorPosition(target);
  }, []);
  
  return {
    handleInput,
    handleFocus,
    handleKeyDown,
    isProcessing: isProcessingRef.current
  };
};
