
import jsPDF from 'jspdf';
import { PDFSection, PDFGenerationOptions } from './types';
import { FixedPDFStyler } from './FixedPDFStyler';

export const generatePDFFromSections = (
  sections: PDFSection[], 
  filename: string = 'resume.pdf',
  templateId: string = 'modern'
) => {
  console.log('Generating PDF with template:', templateId);
  console.log('Sections to process:', sections.length);
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });
  
  const styler = new FixedPDFStyler(doc, templateId);
  const dimensions = styler.getDimensions();
  
  let yPosition = dimensions.margin + 20; // Start with proper top margin
  
  sections.forEach((section, index) => {
    console.log(`Processing section ${index + 1}:`, section.type, '|', section.content.substring(0, 100) + '...');
    
    // Add extra spacing between different section types
    if (index > 0 && section.type === 'header' && section.level === 2) {
      yPosition += 10;
    }
    
    switch (section.type) {
      case 'header':
        yPosition = styler.applyHeaderStyle(section, yPosition);
        break;
        
      case 'contact':
        yPosition = styler.applyContactStyle(section, yPosition);
        break;
        
      case 'subheader':
        yPosition = styler.applySubheaderStyle(section, yPosition);
        break;
        
      case 'text':
        yPosition = styler.applyTextStyle(section, yPosition);
        break;
        
      case 'list':
        yPosition = styler.applyListStyle(section, yPosition);
        break;
        
      default:
        console.warn('Unknown section type:', section.type);
        // Treat unknown types as text
        yPosition = styler.applyTextStyle(section, yPosition);
    }
    
    console.log(`Section ${index + 1} processed, yPosition now:`, yPosition);
  });
  
  // Add footer with template information
  styler.addFooter();
  
  console.log('PDF generation complete, saving as:', filename);
  
  // Save the PDF
  doc.save(filename);
};
