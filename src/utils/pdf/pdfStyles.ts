
import jsPDF from 'jspdf';
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';
import { PDFSection, PDFDimensions, PDFSpacing } from './types';

export class PDFStyler {
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
      margin: 30,
      maxWidth: doc.internal.pageSize.getWidth() - 60 // Proper content width
    };
    
    this.spacing = {
      lineHeight: 14,
      headerHeight: 18,
      subHeaderHeight: 16
    };
    
    // Set default font
    doc.setFont('helvetica');
  }
  
  public setTemplateColor(colorType: 'primary' | 'secondary' | 'text'): void {
    const color = colorType === 'primary' ? this.template.pdfStyles.primaryColor : 
                 colorType === 'secondary' ? this.template.pdfStyles.secondaryColor : 
                 this.template.pdfStyles.textColor;
    this.doc.setTextColor(color[0], color[1], color[2]);
  }
  
  public splitTextToLines(text: string, maxWidth: number, fontSize: number): string[] {
    this.doc.setFontSize(fontSize);
    return this.doc.splitTextToSize(text, maxWidth);
  }
  
  public checkNewPage(neededHeight: number, yPosition: number): number {
    if (yPosition + neededHeight > this.dimensions.pageHeight - this.dimensions.margin) {
      this.doc.addPage();
      return this.dimensions.margin;
    }
    return yPosition;
  }
  
  public applyHeaderStyle(section: PDFSection, yPosition: number): number {
    const pdfStyles = this.template.pdfStyles;
    const headerFontSize = section.level === 1 ? pdfStyles.headerFontSize : pdfStyles.sectionTitleFontSize;
    const spacing = section.level === 1 ? 12 : 8;
    
    yPosition = this.checkNewPage(this.spacing.headerHeight + spacing, yPosition);
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    
    // Apply template-specific header styling
    if (section.level === 1) {
      this.setTemplateColor('primary');
      
      // Creative template gets background styling
      if (pdfStyles.headerStyle === 'background') {
        // Create a proper background rectangle within page bounds
        this.doc.setFillColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
        this.doc.rect(this.dimensions.margin, yPosition - 8, this.dimensions.maxWidth, this.spacing.headerHeight + 4, 'F');
        this.doc.setTextColor(255, 255, 255); // White text on colored background
      }
    } else {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += this.spacing.headerHeight;
    
    // Add proper width lines based on template
    if (section.level === 1 && pdfStyles.headerStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
      this.doc.setLineWidth(2);
      // Use proper content width, not beyond page boundaries
      this.doc.line(this.dimensions.margin, yPosition, this.dimensions.margin + this.dimensions.maxWidth, yPosition);
    } else if (section.level === 2 && pdfStyles.sectionTitleStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.secondaryColor[0], pdfStyles.secondaryColor[1], pdfStyles.secondaryColor[2]);
      this.doc.setLineWidth(1);
      // Use proper content width for section headers
      this.doc.line(this.dimensions.margin, yPosition, this.dimensions.margin + this.dimensions.maxWidth, yPosition);
    }
    
    return yPosition + spacing;
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 6, yPosition);
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize + 1);
    this.doc.setFont('helvetica', 'normal');
    this.setTemplateColor('text');
    
    const contactLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.template.pdfStyles.bodyFontSize + 1);
    this.doc.text(contactLines, this.dimensions.margin, yPosition);
    return yPosition + contactLines.length * (this.spacing.lineHeight - 2) + 8;
  }
  
  public applySubheaderStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 6, yPosition);
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize + 2);
    this.doc.setFont('helvetica', 'bold');
    this.setTemplateColor('primary');
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    return yPosition + this.spacing.subHeaderHeight + 6;
  }
  
  public applyTextStyle(section: PDFSection, yPosition: number): number {
    const textLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.template.pdfStyles.bodyFontSize);
    const textBlockHeight = textLines.length * (this.spacing.lineHeight - 2);
    yPosition = this.checkNewPage(textBlockHeight + 8, yPosition);
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.setTemplateColor('text');
    this.doc.text(textLines, this.dimensions.margin, yPosition);
    return yPosition + textBlockHeight + 8;
  }
  
  public applyListStyle(section: PDFSection, yPosition: number): number {
    const listLines = this.splitTextToLines(`• ${section.content}`, this.dimensions.maxWidth - 15, this.template.pdfStyles.bodyFontSize);
    const listBlockHeight = listLines.length * (this.spacing.lineHeight - 2);
    yPosition = this.checkNewPage(listBlockHeight + 4, yPosition);
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    
    // Make bullet points use template primary color
    this.setTemplateColor('primary');
    this.doc.text('•', this.dimensions.margin + 5, yPosition);
    this.setTemplateColor('text');
    
    // Add the text with proper indentation
    const listText = listLines[0].substring(2); // Remove the bullet we added
    const restOfText = listLines.slice(1);
    this.doc.text(listText, this.dimensions.margin + 15, yPosition);
    
    if (restOfText.length > 0) {
      this.doc.text(restOfText, this.dimensions.margin + 15, yPosition + (this.spacing.lineHeight - 2));
    }
    
    return yPosition + listBlockHeight + 4;
  }
  
  public addFooter(): void {
    const today = new Date().toLocaleDateString();
    this.doc.setFontSize(8);
    this.doc.setTextColor(150, 150, 150);
    this.doc.text(`Generated on ${today} • Template: ${this.template.name}`, this.dimensions.margin, this.dimensions.pageHeight - 15);
  }
  
  public getDimensions(): PDFDimensions {
    return this.dimensions;
  }
  
  public getSpacing(): PDFSpacing {
    return this.spacing;
  }
}
