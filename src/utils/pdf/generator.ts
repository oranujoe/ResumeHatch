
import jsPDF from 'jspdf';
import { PDFSection, PDFGenerationOptions } from './types';
import { PDFStyler } from './pdfStyles';

export const generatePDFFromSections = (
  sections: PDFSection[], 
  filename: string = 'resume.pdf',
  templateId: string = 'modern'
) => {
  const doc = new jsPDF();
  const styler = new PDFStyler(doc, templateId);
  const dimensions = styler.getDimensions();
  
  let yPosition = dimensions.margin;
  
  sections.forEach((section) => {
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
    }
  });
  
  // Add footer
  styler.addFooter();
  
  // Save the PDF
  doc.save(filename);
};
