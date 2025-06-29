
import { useCallback, useRef } from 'react';
import { debounce } from '@/utils/cursorUtils';

interface UseResumeEditingProps {
  onContentChange: (content: string) => void;
  debounceDelay?: number;
}

// Legacy hook - kept for backward compatibility but simplified
export const useResumeEditing = ({ onContentChange, debounceDelay = 300 }: UseResumeEditingProps) => {
  const isProcessingRef = useRef(false);
  
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
    const content = target.innerHTML;
    isProcessingRef.current = true;
    debouncedContentChange(content);
  }, [debouncedContentChange]);
  
  const handleFocus = useCallback(() => {
    // Simplified focus handler
  }, []);
  
  const handleKeyDown = useCallback(() => {
    // Simplified keydown handler
  }, []);
  
  return {
    handleInput,
    handleFocus,
    handleKeyDown,
    isProcessing: isProcessingRef.current
  };
};
