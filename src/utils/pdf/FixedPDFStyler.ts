import jsPDF from 'jspdf';
import { getTemplateById, getDefaultTemplate } from '@/data/templateRegistry';
import { PDFSection, PDFDimensions, PDFSpacing } from './types';

export class FixedPDFStyler {
  private doc: jsPDF;
  private template: any;
  private dimensions: PDFDimensions;
  private spacing: PDFSpacing;
  
  constructor(doc: jsPDF, templateId: string) {
    this.doc = doc;
    this.template = getTemplateById(templateId) || getDefaultTemplate();
    
    this.dimensions = {
      pageWidth: doc.internal.pageSize.getWidth(),
      pageHeight: doc.internal.pageSize.getHeight(),
      margin: 40,
      maxWidth: doc.internal.pageSize.getWidth() - 80
    };
    
    // Improved spacing calculations to match HTML rendering
    this.spacing = {
      lineHeight: this.template.pdfStyles.bodyFontSize * 1.4,
      headerHeight: this.template.pdfStyles.headerFontSize * 1.3,
      subHeaderHeight: this.template.pdfStyles.sectionTitleFontSize * 1.3
    };
    
    // Set default font with better kerning
    doc.setFont('helvetica', 'normal');
    // Reduce character spacing for better text flow
    doc.setCharSpace(0.01);
  }
  
  public setTemplateColor(colorType: 'primary' | 'secondary' | 'text'): void {
    const color = colorType === 'primary' ? this.template.pdfStyles.primaryColor : 
                 colorType === 'secondary' ? this.template.pdfStyles.secondaryColor : 
                 this.template.pdfStyles.textColor;
    this.doc.setTextColor(color[0], color[1], color[2]);
  }
  
  public splitTextToLines(text: string, maxWidth: number, fontSize: number): string[] {
    this.doc.setFontSize(fontSize);
    // Use smaller split width to account for character spacing
    const adjustedWidth = maxWidth * 0.95;
    return this.doc.splitTextToSize(text, adjustedWidth);
  }
  
  public checkNewPage(neededHeight: number, yPosition: number): number {
    const pageBottomMargin = this.dimensions.pageHeight - this.dimensions.margin - 20;
    if (yPosition + neededHeight > pageBottomMargin) {
      this.doc.addPage();
      return this.dimensions.margin + 20;
    }
    return yPosition;
  }
  
  public applyHeaderStyle(section: PDFSection, yPosition: number): number {
    const pdfStyles = this.template.pdfStyles;
    const isMainHeader = section.level === 1;
    const headerFontSize = isMainHeader ? pdfStyles.headerFontSize : pdfStyles.sectionTitleFontSize;
    
    // Add appropriate spacing before headers
    const topSpacing = isMainHeader ? 0 : 16; // More space before section headers
    yPosition += topSpacing;
    
    yPosition = this.checkNewPage(this.spacing.headerHeight + 15, yPosition);
    
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(isMainHeader ? 0.02 : 0.01);
    
    if (isMainHeader) {
      // Remove colored background - just use primary color for text
      this.setTemplateColor('primary');
    } else {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += Math.ceil(headerFontSize * 0.6);
    
    // Add underlines with tighter spacing and better bottom margin
    if (isMainHeader && pdfStyles.headerStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
      this.doc.setLineWidth(2);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1);
      yPosition += 18; // More spacing after underlined headers
    } else if (!isMainHeader && pdfStyles.sectionTitleStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.secondaryColor[0], pdfStyles.secondaryColor[1], pdfStyles.secondaryColor[2]);
      this.doc.setLineWidth(2);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1);
      yPosition += 16; // More spacing after underlined section headers
    } else if (isMainHeader) {
      // For main headers without underlines (like nomad), add minimal spacing
      yPosition += 6; // Tighter spacing after main header
    } else {
      yPosition += 8; // Consistent spacing after section headers
    }
    
    // Reset character spacing
    this.doc.setCharSpace(0.01);
    return yPosition;
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    // Minimal spacing before contact info to keep it close to header
    yPosition = this.checkNewPage(25, yPosition);
    
    // Use consistent font size for contact info
    const contactFontSize = this.template.pdfStyles.bodyFontSize;
    
    this.doc.setFontSize(contactFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    
    // Always use normal text color
    this.setTemplateColor('text');
    
    // Handle contact info with embedded links
    if ('links' in section && section.links) {
      // Process contact text with embedded clickable links
      const contactText = section.content.trim();
      const links = section.links;
      
      // Split contact text by common separators (•, |, -, etc.)
      const parts = contactText.split(/\s*[•|·-]\s*/).filter(part => part.trim().length > 0);
      
      let currentX = this.dimensions.margin;
      const lineY = yPosition;
      
      parts.forEach((part, index) => {
        const trimmedPart = part.trim();
        
        // Check if this part matches any of our link texts
        const matchingLinkText = Object.keys(links).find(linkText => 
          trimmedPart.toLowerCase().includes(linkText.toLowerCase())
        );
        
        if (matchingLinkText && links[matchingLinkText]) {
          // This part contains a link - make it clickable
          this.doc.setTextColor(...this.template.pdfStyles.primaryColor);
          this.doc.textWithLink(trimmedPart, currentX, lineY, { url: links[matchingLinkText] });
          this.setTemplateColor('text'); // Reset color
        } else {
          // Regular text
          this.doc.text(trimmedPart, currentX, lineY);
        }
        
        // Calculate width and add separator for next part
        const partWidth = this.doc.getTextWidth(trimmedPart);
        currentX += partWidth;
        
        // Add separator between parts (except for last part)
        if (index < parts.length - 1) {
          const separator = ' • ';
          this.doc.text(separator, currentX, lineY);
          currentX += this.doc.getTextWidth(separator);
        }
      });
      
      return yPosition + contactFontSize * 1.4 + 12;
    } else {
      // Handle regular contact info without embedded links
      const contactText = section.content.trim();
      const contactLines = contactText.split('\n').filter(line => line.trim().length > 0);
      
      // Use consistent line height for contact info
      const contactLineHeight = contactFontSize * 1.4 + 2; // Add 2 points between lines
      
      contactLines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const currentY = yPosition + (index * contactLineHeight);
        
        // Check if line contains a URL
        const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/g;
        const urlMatch = trimmedLine.match(urlRegex);
        
        if (urlMatch && urlMatch.length > 0) {
          // Extract the URL from the line
          let url = urlMatch[0];
          
          // Ensure URL has protocol
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.startsWith('www.')) {
              url = 'https://' + url;
            } else if (url.includes('linkedin.com') || url.includes('github.com') || url.includes('.com/')) {
              url = 'https://' + url;
            }
          }
          
          // Add the text as a clickable link
          this.doc.textWithLink(trimmedLine, this.dimensions.margin, currentY, { url: url });
        } else {
          // Regular text without links
          this.doc.text(trimmedLine, this.dimensions.margin, currentY);
        }
      });
      
      this.doc.setCharSpace(0.01);
      // Proper spacing after contact info before next section
      return yPosition + (contactLines.length * contactLineHeight) + 12;
    }
  }
  
  public applyLinkStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    
    yPosition = this.checkNewPage(this.spacing.lineHeight + 8, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    
    // Use primary color for links to make them stand out
    this.setTemplateColor('primary');
    
    // Add the clickable link
    if (section.url) {
      this.doc.textWithLink(section.content, this.dimensions.margin, yPosition, { url: section.url });
    } else {
      // Fallback to regular text if no URL
      this.doc.text(section.content, this.dimensions.margin, yPosition);
    }
    
    return yPosition + this.spacing.lineHeight + 4;
  }
  
  public applySubheaderStyle(section: PDFSection, yPosition: number): number {
    yPosition += 8;
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 12, yPosition);
    
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize + 2);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(0.01);
    this.setTemplateColor('primary');
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    return yPosition + this.spacing.subHeaderHeight + 6;
  }
  
  public applyTextStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    const textLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, fontSize);
    const textBlockHeight = textLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(textBlockHeight + 8, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('text');
    
    textLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + textBlockHeight + 6; // Tighter spacing after text blocks
  }
  
  public applyListStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    
    // Use consistent indentation for all list items
    const listIndent = 20; // Fixed indent for bullet points
    const availableWidth = this.dimensions.maxWidth - listIndent;
    const listLines = this.splitTextToLines(section.content, availableWidth, fontSize);
    const listBlockHeight = listLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(listBlockHeight + 6, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('text');
    
    // Add bullet point
    this.doc.text('•', this.dimensions.margin + 5, yPosition);
    
    // Add text content with proper alignment
    listLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin + listIndent, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + listBlockHeight + 4; // Tighter spacing between list items
  }
  
  public addFooter(): void {
    // Footer removed - no message at bottom of resume
  }
  
  public getDimensions(): PDFDimensions {
    return this.dimensions;
  }
}
