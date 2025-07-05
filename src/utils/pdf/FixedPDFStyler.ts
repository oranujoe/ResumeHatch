import jsPDF from 'jspdf';
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';
import { PDFSection, PDFDimensions, PDFSpacing } from './types';

export class FixedPDFStyler {
  private doc: jsPDF;
  private template: ResumeTemplate;
  private dimensions: PDFDimensions;
  private spacing: PDFSpacing;
  
  constructor(doc: jsPDF, templateId: string) {
    this.doc = doc;
    this.template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
    
    this.dimensions = {
      pageWidth: doc.internal.pageSize.getWidth(),
      pageHeight: doc.internal.pageSize.getHeight(),
      margin: 40,
      maxWidth: doc.internal.pageSize.getWidth() - 80
    };
    
    // Improved spacing calculations to match HTML rendering
    this.spacing = {
      lineHeight: this.template.pdfStyles.bodyFontSize * 1.4, // More accurate line height
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
    
    // Consistent spacing before headers
    const topSpacing = isMainHeader ? 15 : 10;
    yPosition += topSpacing;
    
    yPosition = this.checkNewPage(this.spacing.headerHeight + 15, yPosition);
    
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(isMainHeader ? 0.02 : 0.01); // Slightly more spacing for headers
    
    if (isMainHeader) {
      this.setTemplateColor('primary');
      
      // Remove background for creative template but keep it for others
      if (pdfStyles.headerStyle === 'background' && this.template.id !== 'creative') {
        this.doc.setFillColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
        this.doc.rect(this.dimensions.margin, yPosition - 8, this.dimensions.maxWidth, headerFontSize + 12, 'F');
        this.doc.setTextColor(255, 255, 255);
      }
    } else {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += Math.ceil(headerFontSize * 0.6); // Reduced from 0.8 to bring underline closer
    
    // Add underlines with tighter spacing and better bottom margin
    if (isMainHeader && pdfStyles.headerStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
      this.doc.setLineWidth(2); // Keep main header line width the same
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1); // Reduced from +2 to +1
      yPosition += 18; // Increased from 16 to 18 for slightly more space below the line
    } else if (!isMainHeader && pdfStyles.sectionTitleStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.secondaryColor[0], pdfStyles.secondaryColor[1], pdfStyles.secondaryColor[2]);
      this.doc.setLineWidth(2); // Increased from 1 to 2 for thicker sub-section lines
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1); // Reduced from +2 to +1
      yPosition += 14; // Increased from 12 to 14 for slightly more space below the line
    } else {
      yPosition += 6;
    }
    
    // Reset character spacing
    this.doc.setCharSpace(0.01);
    return yPosition;
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(25, yPosition);
    
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005); // Tighter spacing for contact info
    this.setTemplateColor('text');
    
    const contactLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.template.pdfStyles.bodyFontSize);
    
    contactLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    this.doc.setCharSpace(0.01); // Reset
    return yPosition + (contactLines.length * this.spacing.lineHeight) + 10;
  }
  
  public applySubheaderStyle(section: PDFSection, yPosition: number): number {
    yPosition += 8; // Consistent top spacing
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
    
    yPosition = this.checkNewPage(textBlockHeight + 12, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005); // Slightly tighter for body text
    this.setTemplateColor('text');
    
    textLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + textBlockHeight + 8;
  }
  
  public applyListStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    const bulletText = `• ${section.content}`;
    
    // Better list text wrapping
    const availableWidth = this.dimensions.maxWidth - 15; // Account for bullet indentation
    const listLines = this.splitTextToLines(bulletText, availableWidth, fontSize);
    const listBlockHeight = listLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(listBlockHeight + 10, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('text');
    
    listLines.forEach((line, index) => {
      const xPosition = index === 0 ? this.dimensions.margin : this.dimensions.margin + 15;
      this.doc.text(line, xPosition, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + listBlockHeight + 6;
  }
  
  public addFooter(): void {
    const today = new Date().toLocaleDateString();
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0);
    this.doc.setTextColor(120, 120, 120);
    this.doc.text(
      `Generated on ${today} • Template: ${this.template.name}`, 
      this.dimensions.margin, 
      this.dimensions.pageHeight - 20
    );
  }
  
  public getDimensions(): PDFDimensions {
    return this.dimensions;
  }
}
