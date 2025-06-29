
import jsPDF from 'jspdf';

export interface PDFSection {
  type: 'header' | 'subheader' | 'text' | 'list' | 'contact';
  content: string;
  level?: number;
}

export const parseHTMLToPDFSections = (html: string): PDFSection[] => {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const sections: PDFSection[] = [];
  
  // Function to process each element
  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    
    if (!textContent) return;
    
    switch (tagName) {
      case 'h1':
        sections.push({ type: 'header', content: textContent, level: 1 });
        break;
      case 'h2':
        sections.push({ type: 'header', content: textContent, level: 2 });
        break;
      case 'h3':
        sections.push({ type: 'subheader', content: textContent, level: 3 });
        break;
      case 'h4':
      case 'h5':
      case 'h6':
        sections.push({ type: 'subheader', content: textContent, level: 4 });
        break;
      case 'p':
        if (textContent.length > 0) {
          // Check if it's contact information
          if (textContent.includes('@') || textContent.includes('|') || /\(\d{3}\)/.test(textContent)) {
            sections.push({ type: 'contact', content: textContent });
          } else {
            sections.push({ type: 'text', content: textContent });
          }
        }
        break;
      case 'ul':
      case 'ol':
        const listItems = element.querySelectorAll('li');
        listItems.forEach(li => {
          const itemText = li.textContent?.trim();
          if (itemText) {
            sections.push({ type: 'list', content: itemText });
          }
        });
        break;
      case 'li':
        // Handle standalone list items
        if (!element.closest('ul, ol')) {
          sections.push({ type: 'list', content: textContent });
        }
        break;
      case 'div':
      case 'section':
        // Process children of div/section elements
        Array.from(element.children).forEach(processElement);
        break;
      default:
        // For other elements, treat as regular text if they contain meaningful content
        if (textContent.length > 10) {
          sections.push({ type: 'text', content: textContent });
        }
    }
  };
  
  // Process all direct children
  Array.from(tempDiv.children).forEach(processElement);
  
  // If no sections found, try to extract all text as paragraphs
  if (sections.length === 0) {
    const allText = tempDiv.textContent?.trim() || '';
    if (allText) {
      // Split by double line breaks to create paragraphs
      const paragraphs = allText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      paragraphs.forEach(paragraph => {
        sections.push({ type: 'text', content: paragraph.trim() });
      });
    }
  }
  
  return sections;
};

export const generatePDFFromSections = (sections: PDFSection[], filename: string = 'resume.pdf') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  const lineHeight = 6;
  const headerHeight = 10;
  const subHeaderHeight = 8;
  
  // Set default font
  doc.setFont('helvetica');
  
  // Helper function to add a new page if needed
  const checkNewPage = (neededHeight: number) => {
    if (yPosition + neededHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };
  
  // Helper function to split text into lines
  const splitTextToLines = (text: string, maxWidth: number, fontSize: number): string[] => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(text, maxWidth);
  };
  
  sections.forEach((section, index) => {
    switch (section.type) {
      case 'header':
        const headerFontSize = section.level === 1 ? 18 : 16;
        const spacing = section.level === 1 ? 6 : 4;
        
        checkNewPage(headerHeight + spacing);
        doc.setFontSize(headerFontSize);
        doc.setFont('helvetica', 'bold');
        
        // Add some color for main header
        if (section.level === 1) {
          doc.setTextColor(44, 82, 130); // Professional blue
        } else {
          doc.setTextColor(60, 60, 60); // Dark gray
        }
        
        doc.text(section.content, margin, yPosition);
        yPosition += headerHeight + spacing;
        
        // Add underline for section headers
        if (section.level === 2) {
          doc.setDrawColor(44, 82, 130);
          doc.setLineWidth(0.5);
          doc.line(margin, yPosition - 2, margin + 60, yPosition - 2);
        }
        
        doc.setTextColor(0, 0, 0); // Reset to black
        break;
        
      case 'contact':
        checkNewPage(subHeaderHeight + 2);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        
        const contactLines = splitTextToLines(section.content, maxWidth, 11);
        doc.text(contactLines, margin, yPosition);
        yPosition += contactLines.length * lineHeight + 4;
        
        doc.setTextColor(0, 0, 0); // Reset to black
        break;
        
      case 'subheader':
        checkNewPage(subHeaderHeight + 2);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 40);
        doc.text(section.content, margin, yPosition);
        yPosition += subHeaderHeight + 2;
        doc.setTextColor(0, 0, 0);
        break;
        
      case 'text':
        const textLines = splitTextToLines(section.content, maxWidth, 10);
        const textBlockHeight = textLines.length * lineHeight;
        checkNewPage(textBlockHeight + 3);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(textLines, margin, yPosition);
        yPosition += textBlockHeight + 4;
        break;
        
      case 'list':
        const listLines = splitTextToLines(`• ${section.content}`, maxWidth - 10, 10);
        const listBlockHeight = listLines.length * lineHeight;
        checkNewPage(listBlockHeight);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Make bullet points blue
        doc.setTextColor(44, 82, 130);
        doc.text('•', margin + 5, yPosition);
        doc.setTextColor(0, 0, 0);
        
        // Add the text
        const listText = listLines[0].substring(2); // Remove the bullet we added
        const restOfText = listLines.slice(1);
        doc.text(listText, margin + 12, yPosition);
        
        if (restOfText.length > 0) {
          doc.text(restOfText, margin + 12, yPosition + lineHeight);
        }
        
        yPosition += listBlockHeight + 2;
        break;
    }
  });
  
  // Add footer with generation date
  const today = new Date().toLocaleDateString();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on ${today}`, margin, pageHeight - 10);
  
  // Save the PDF
  doc.save(filename);
};
