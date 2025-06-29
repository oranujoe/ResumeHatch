
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
      margin: 20,
      maxWidth: doc.internal.pageSize.getWidth() - 40
    };
    
    this.spacing = {
      lineHeight: 12,
      headerHeight: 20,
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
      return this.dimensions.margin + 20; // Start with some top margin
    }
    return yPosition;
  }
  
  public applyHeaderStyle(section: PDFSection, yPosition: number): number {
    const pdfStyles = this.template.pdfStyles;
    const headerFontSize = section.level === 1 ? pdfStyles.headerFontSize : pdfStyles.sectionTitleFontSize;
    
    // Ensure adequate spacing before headers
    const topSpacing = section.level === 1 ? 20 : 15;
    yPosition += topSpacing;
    
    yPosition = this.checkNewPage(this.spacing.headerHeight + 10, yPosition);
    
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    
    // Apply template-specific header styling
    if (section.level === 1) {
      this.setTemplateColor('primary');
      
      // Creative template gets background styling
      if (pdfStyles.headerStyle === 'background') {
        this.doc.setFillColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
        this.doc.rect(this.dimensions.margin, yPosition - 6, this.dimensions.maxWidth, headerFontSize + 8, 'F');
        this.doc.setTextColor(255, 255, 255);
      }
    } else {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += headerFontSize + 2;
    
    // Add underlines with proper spacing
    if (section.level === 1 && pdfStyles.headerStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.primaryColor[0], pdfStyles.primaryColor[1], pdfStyles.primaryColor[2]);
      this.doc.setLineWidth(1.5);
      this.doc.line(this.dimensions.margin, yPosition, this.dimensions.margin + this.dimensions.maxWidth, yPosition);
      yPosition += 3;
    } else if (section.level === 2 && pdfStyles.sectionTitleStyle === 'underline') {
      this.doc.setDrawColor(pdfStyles.secondaryColor[0], pdfStyles.secondaryColor[1], pdfStyles.secondaryColor[2]);
      this.doc.setLineWidth(0.5);
      this.doc.line(this.dimensions.margin, yPosition, this.dimensions.margin + this.dimensions.maxWidth, yPosition);
      yPosition += 3;
    }
    
    return yPosition + 8; // Bottom spacing after headers
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(20, yPosition);
    
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.setTemplateColor('text');
    
    const contactLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.template.pdfStyles.bodyFontSize);
    
    contactLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + (contactLines.length * this.spacing.lineHeight) + 8;
  }
  
  public applySubheaderStyle(section: PDFSection, yPosition: number): number {
    yPosition += 6; // Top spacing
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 10, yPosition);
    
    this.doc.setFontSize(this.template.pdfStyles.bodyFontSize + 1);
    this.doc.setFont('helvetica', 'bold');
    this.setTemplateColor('primary');
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    return yPosition + this.spacing.subHeaderHeight + 4;
  }
  
  public applyTextStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    const textLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, fontSize);
    const textBlockHeight = textLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(textBlockHeight + 10, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.setTemplateColor('text');
    
    textLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + textBlockHeight + 6;
  }
  
  public applyListStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.template.pdfStyles.bodyFontSize;
    const bulletText = `• ${section.content}`;
    const listLines = this.splitTextToLines(bulletText, this.dimensions.maxWidth - 10, fontSize);
    const listBlockHeight = listLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(listBlockHeight + 8, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.setTemplateColor('text');
    
    // Render each line with proper indentation
    listLines.forEach((line, index) => {
      if (index === 0) {
        // First line with bullet
        this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
      } else {
        // Subsequent lines indented
        this.doc.text(line, this.dimensions.margin + 10, yPosition + (index * this.spacing.lineHeight));
      }
    });
    
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
