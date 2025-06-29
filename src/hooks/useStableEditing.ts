
import { useCallback, useRef, useEffect } from 'react';
import { saveCursorPosition, restoreCursorPosition, debounce, CursorPosition } from '@/utils/cursorUtils';

interface UseStableEditingProps {
  onContentChange: (content: string) => void;
  debounceDelay?: number;
}

export const useStableEditing = ({ onContentChange, debounceDelay = 500 }: UseStableEditingProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const cursorPositionRef = useRef<CursorPosition>({ textOffset: 0, containerPath: [] });
  
  // Debounced content change handler
  const debouncedContentChange = useCallback(
    debounce((content: string) => {
      onContentChange(content);
    }, debounceDelay),
    [onContentChange, debounceDelay]
  );
  
  const handleBeforeInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) {
      event.preventDefault();
      return;
    }
    
    const target = event.currentTarget;
    cursorPositionRef.current = saveCursorPosition(target);
  }, []);
  
  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) return;
    
    const target = event.currentTarget;
    const content = target.innerHTML;
    
    // Update content without causing re-render
    debouncedContentChange(content);
  }, [debouncedContentChange]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) {
      event.preventDefault();
      return;
    }
    
    const target = event.currentTarget;
    cursorPositionRef.current = saveCursorPosition(target);
  }, []);
  
  const updateContent = useCallback((newContent: string) => {
    if (!elementRef.current) return;
    
    isUpdatingRef.current = true;
    
    // Save cursor position before update
    const savedPosition = saveCursorPosition(elementRef.current);
    
    // Update content directly
    elementRef.current.innerHTML = newContent;
    
    // Restore cursor position after a brief delay
    setTimeout(() => {
      if (elementRef.current) {
        restoreCursorPosition(elementRef.current, savedPosition);
      }
      isUpdatingRef.current = false;
    }, 10);
  }, []);
  
  return {
    elementRef,
    handleBeforeInput,
    handleInput,
    handleKeyDown,
    updateContent,
    isUpdating: isUpdatingRef.current
  };
};
