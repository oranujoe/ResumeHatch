// src/utils/pdf/pdfStyles.ts

import { PdfStyle } from './types';

// The styles object defines the appearance of different HTML elements in the PDF.
// We are increasing the `marginBottom` values to add more vertical spacing
// and make the exported PDF look more like the on-screen preview.
const styles: { [key: string]: PdfStyle } = {
  h1: { 
    fontSize: 18, 
    fontStyle: 'bold', 
    marginBottom: 12 // Slightly increased for better header separation
  },
  h2: { 
    fontSize: 14, 
    fontStyle: 'bold', 
    marginBottom: 8, // Increased from 5 to add more space after section titles
    underline: true 
  },
  h3: { 
    fontSize: 12, 
    fontStyle: 'bold', 
    marginBottom: 6  // Increased from 3 for better sub-header spacing
  },
  p: { 
    fontSize: 10, 
    fontStyle: 'normal', 
    marginBottom: 7 // Increased from 5 for more paragraph spacing
  },
  li: { 
    fontSize: 10, 
    fontStyle: 'normal', 
    marginBottom: 5, // Significantly increased from 2 to space out list items
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

