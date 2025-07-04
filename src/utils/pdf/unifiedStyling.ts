// Unified styling system for both HTML and PDF rendering
// This ensures visual consistency between preview and export

import { getTemplateById, getDefaultTemplate } from '@/data/templateRegistry';

export interface UnifiedTemplateStyles {
  colors: {
    primary: {
      rgb: [number, number, number];
      css: string;
    };
    secondary: {
      rgb: [number, number, number]; 
      css: string;
    };
    text: {
      rgb: [number, number, number];
      css: string;
    };
  };
  typography: {
    headerFontSize: number;
    sectionTitleFontSize: number;
    bodyFontSize: number;
    lineHeight: number;
  };
  spacing: {
    sectionMarginBottom: number;
    titleMarginBottom: number;
    contentMarginBottom: number;
    listItemSpacing: number;
  };
  styles: {
    headerStyle: 'underline' | 'background' | 'border' | 'plain';
    sectionTitleStyle: 'underline' | 'bold' | 'highlight' | 'plain';
  };
}

// Convert RGB to CSS color string
const rgbToCss = (rgb: [number, number, number]): string => {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

// Create unified styles from template data
export const getUnifiedTemplateStyles = (templateId: string): UnifiedTemplateStyles => {
  const template = getTemplateById(templateId) || getDefaultTemplate();
  const pdfStyles = template.pdfStyles;

  return {
    colors: {
      primary: {
        rgb: pdfStyles.primaryColor,
        css: rgbToCss(pdfStyles.primaryColor)
      },
      secondary: {
        rgb: pdfStyles.secondaryColor,
        css: rgbToCss(pdfStyles.secondaryColor)
      },
      text: {
        rgb: pdfStyles.textColor,
        css: rgbToCss(pdfStyles.textColor)
      }
    },
    typography: {
      headerFontSize: pdfStyles.headerFontSize,
      sectionTitleFontSize: pdfStyles.sectionTitleFontSize,
      bodyFontSize: pdfStyles.bodyFontSize,
      lineHeight: 1.5 // Standardized line height
    },
    spacing: {
      sectionMarginBottom: 24, // 6 * 4px in Tailwind scale
      titleMarginBottom: 12,   // 3 * 4px
      contentMarginBottom: 12, // 3 * 4px
      listItemSpacing: 8       // 2 * 4px
    },
    styles: {
      headerStyle: pdfStyles.headerStyle,
      sectionTitleStyle: pdfStyles.sectionTitleStyle
    }
  };
};

// Generate CSS that matches PDF styling
export const generateUnifiedCSS = (templateId: string): string => {
  const styles = getUnifiedTemplateStyles(templateId);
  
  return `
    .resume-container {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: ${styles.typography.lineHeight};
      color: ${styles.colors.text.css};
      font-size: ${styles.typography.bodyFontSize}px;
      background: white;
      padding: 2rem;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      max-width: 210mm;
      margin: 0 auto;
      min-height: 600px;
    }
    
    .resume-template-${templateId} h1 {
      font-size: ${styles.typography.headerFontSize}px;
      font-weight: 700;
      margin-bottom: ${styles.spacing.titleMarginBottom}px;
      line-height: 1.2;
      color: ${styles.colors.primary.css};
      ${styles.styles.headerStyle === 'underline' ? `border-bottom: 2px solid ${styles.colors.primary.css}; padding-bottom: 8px;` : ''}
      ${styles.styles.headerStyle === 'background' ? `background: linear-gradient(135deg, ${styles.colors.primary.css}, ${styles.colors.secondary.css}); color: white; padding: 16px; border-radius: 8px;` : ''}
      ${styles.styles.headerStyle === 'border' ? `border-left: 4px solid ${styles.colors.primary.css}; padding-left: 16px;` : ''}
    }
    
    .resume-template-${templateId} h2 {
      font-size: ${styles.typography.sectionTitleFontSize}px;
      font-weight: 600;
      margin-top: ${styles.spacing.sectionMarginBottom}px;
      margin-bottom: ${styles.spacing.titleMarginBottom}px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${styles.colors.primary.css};
      ${styles.styles.sectionTitleStyle === 'underline' ? `border-bottom: 2px solid ${styles.colors.secondary.css}; padding-bottom: 4px;` : ''}
      ${styles.styles.sectionTitleStyle === 'highlight' ? `background: ${styles.colors.secondary.css}; color: white; padding: 8px; border-radius: 4px;` : ''}
      ${styles.styles.sectionTitleStyle === 'bold' ? 'font-weight: 700;' : ''}
    }
    
    .resume-template-${templateId} h3 {
      font-size: ${styles.typography.bodyFontSize + 2}px;
      font-weight: 600;
      margin-bottom: ${styles.spacing.contentMarginBottom / 2}px;
      color: ${styles.colors.primary.css};
    }
    
    .resume-template-${templateId} p {
      margin-bottom: ${styles.spacing.contentMarginBottom}px;
      line-height: ${styles.typography.lineHeight};
      color: ${styles.colors.text.css};
      font-size: ${styles.typography.bodyFontSize}px;
    }
    
    .resume-template-${templateId} ul,
    .resume-template-${templateId} ol {
      margin-bottom: ${styles.spacing.sectionMarginBottom}px;
      padding-left: 16px;
    }
    
    .resume-template-${templateId} li {
      margin-bottom: ${styles.spacing.listItemSpacing}px;
      line-height: ${styles.typography.lineHeight};
      color: ${styles.colors.text.css};
      font-size: ${styles.typography.bodyFontSize}px;
    }
    
    .resume-template-${templateId} ul li::marker {
      color: ${styles.colors.primary.css};
    }
    
    /* Contact information styling */
    .resume-template-${templateId} .contact-info {
      font-size: ${styles.typography.bodyFontSize}px;
      line-height: ${styles.typography.lineHeight};
      color: ${styles.colors.text.css};
      margin-bottom: ${styles.spacing.sectionMarginBottom}px;
    }
    
    /* URL and link styling - Higher specificity to override template styles */
    .resume-container .resume-template-${templateId} a,
    .resume-container a,
    .resume-template-${templateId} a {
      color: ${styles.colors.primary.css} !important;
      text-decoration: underline !important;
      font-weight: 500 !important;
      transition: color 0.2s ease !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      border: none !important;
      background: transparent !important;
    }
    
    .resume-container .resume-template-${templateId} a:hover,
    .resume-container a:hover,
    .resume-template-${templateId} a:hover {
      color: ${styles.colors.secondary.css} !important;
      text-decoration: underline !important;
    }
    
    .resume-container .resume-template-${templateId} a:visited,
    .resume-container a:visited,
    .resume-template-${templateId} a:visited {
      color: ${styles.colors.primary.css} !important;
    }
    
    /* Editing-specific styles for better UX */
    .resume-container:focus {
      outline: 2px solid ${styles.colors.primary.css};
      outline-offset: 2px;
    }
    
    .resume-container * {
      cursor: text;
    }
    
    /* Override cursor for links with maximum specificity */
    .resume-container .resume-template-${templateId} a,
    .resume-container a,
    .resume-template-${templateId} a {
      cursor: pointer !important;
    }
    
    .resume-container:hover h1,
    .resume-container:hover h2,
    .resume-container:hover h3,
    .resume-container:hover p,
    .resume-container:hover li {
      background-color: rgba(${styles.colors.primary.rgb[0]}, ${styles.colors.primary.rgb[1]}, ${styles.colors.primary.rgb[2]}, 0.05);
      border-radius: 2px;
    }
    
    @media print {
      .resume-container {
        box-shadow: none;
        padding: 0;
        max-width: none;
      }
    }
    
    @media (max-width: 768px) {
      .resume-container {
        padding: 1rem;
        font-size: ${Math.max(styles.typography.bodyFontSize - 1, 9)}px;
      }
      
      .resume-template-${templateId} h1 {
        font-size: ${Math.max(styles.typography.headerFontSize - 4, 16)}px;
      }
      
      .resume-template-${templateId} h2 {
        font-size: ${Math.max(styles.typography.sectionTitleFontSize - 2, 12)}px;
      }
    }
  `;
};