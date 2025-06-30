// src/utils/pdf/pdfStyles.ts

import { PdfStyle } from './types';

// The styles object defines the appearance of different HTML elements in the PDF.
// We are adjusting the `marginBottom` values to tighten spacing based on feedback.
const styles: { [key: string]: PdfStyle } = {
  h1: { 
    fontSize: 18, 
    fontStyle: 'bold', 
    marginBottom: 10 
  },
  h2: { 
    fontSize: 14, 
    fontStyle: 'bold', 
    marginBottom: 4, // Reduced to tighten the space between the section header/underline and the content below.
    underline: true 
  },
  h3: { 
    fontSize: 12, 
    fontStyle: 'bold', 
    marginBottom: 5 
  },
  p: { 
    fontSize: 10, 
    fontStyle: 'normal', 
    marginBottom: 5 
  },
  li: { 
    fontSize: 10, 
    fontStyle: 'normal', 
    marginBottom: 3, // Reduced for tighter list item spacing.
    bullet: true 
  },
  default: { 
    fontSize: 10, 
    fontStyle: 'normal', 
    marginBottom: 3 
  },
};

/**
 * Retrieves the style for a given HTML tag.
 * @param tag - The HTML tag name (e.g., 'h1', 'p').
 * @returns The corresponding PdfStyle object.
 */
export const getStyleForTag = (tag: string): PdfStyle => {
  return styles[tag.toLowerCase()] || styles.default;
};
