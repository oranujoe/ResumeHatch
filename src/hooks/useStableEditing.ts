
import { useCallback, useRef } from 'react';
import { saveCursorPosition, restoreCursorPosition, debounce, CursorPosition } from '@/utils/cursorUtils';

interface UseStableEditingProps {
  onContentChange: (content: string) => void;
  debounceDelay?: number;
}

export const useStableEditing = ({ onContentChange, debounceDelay = 500 }: UseStableEditingProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const lastCursorPositionRef = useRef<CursorPosition>({ textOffset: 0, containerPath: [] });
  
  // Debounced content change handler
  const debouncedContentChange = useCallback(
    debounce((content: string) => {
      onContentChange(content);
      isUpdatingRef.current = false;
    }, debounceDelay),
    [onContentChange, debounceDelay]
  );
  
  const handleBeforeInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    // Don't prevent input - just save cursor position
    const target = event.currentTarget;
    lastCursorPositionRef.current = saveCursorPosition(target);
    console.log('Cursor position saved before input:', lastCursorPositionRef.current);
  }, []);
  
  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) return;
    
    const target = event.currentTarget;
    const content = target.innerHTML;
    
    console.log('Input event - content length:', content.length);
    
    // Mark as updating to prevent re-entry
    isUpdatingRef.current = true;
    
    // Trigger debounced content change
    debouncedContentChange(content);
  }, [debouncedContentChange]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Save cursor position on keydown for better tracking
    const target = event.currentTarget;
    lastCursorPositionRef.current = saveCursorPosition(target);
  }, []);
  
  const updateContent = useCallback((newContent: string) => {
    if (!elementRef.current) return;
    
    console.log('UpdateContent called - this should rarely happen during editing');
    
    // Only update if content is significantly different
    const currentContent = elementRef.current.innerHTML;
    if (currentContent === newContent) {
      return;
    }
    
    isUpdatingRef.current = true;
    
    // Save current cursor position
    const savedPosition = saveCursorPosition(elementRef.current);
    
    // Update content
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
