import jsPDF from 'jspdf';
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';
import { PDFSection, PDFDimensions, PDFSpacing } from './types';
import { getUnifiedTemplateStyles, UnifiedTemplateStyles } from './unifiedStyling';

export class FixedPDFStyler {
  private doc: jsPDF;
  private template: ResumeTemplate;
  private unifiedStyles: UnifiedTemplateStyles;
  private dimensions: PDFDimensions;
  private spacing: PDFSpacing;
  
  constructor(doc: jsPDF, templateId: string) {
    this.doc = doc;
    this.template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
    this.unifiedStyles = getUnifiedTemplateStyles(templateId);
    
    this.dimensions = {
      pageWidth: doc.internal.pageSize.getWidth(),
      pageHeight: doc.internal.pageSize.getHeight(),
      margin: 40,
      maxWidth: doc.internal.pageSize.getWidth() - 80
    };
    
    // Use unified spacing calculations to match HTML rendering exactly
    this.spacing = {
      lineHeight: this.unifiedStyles.typography.bodyFontSize * this.unifiedStyles.typography.lineHeight,
      headerHeight: this.unifiedStyles.typography.headerFontSize * 1.2,
      subHeaderHeight: this.unifiedStyles.typography.sectionTitleFontSize * 1.2
    };
    
    // Set default font with better kerning
    doc.setFont('helvetica', 'normal');
    // Reduce character spacing for better text flow
    doc.setCharSpace(0.01);
  }
  
  public setTemplateColor(colorType: 'primary' | 'secondary' | 'text'): void {
    const color = colorType === 'primary' ? this.unifiedStyles.colors.primary.rgb : 
                 colorType === 'secondary' ? this.unifiedStyles.colors.secondary.rgb : 
                 this.unifiedStyles.colors.text.rgb;
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
    const isMainHeader = section.level === 1;
    const headerFontSize = isMainHeader ? this.unifiedStyles.typography.headerFontSize : this.unifiedStyles.typography.sectionTitleFontSize;
    
    // Use unified spacing values
    const topSpacing = isMainHeader ? this.unifiedStyles.spacing.sectionMarginBottom : this.unifiedStyles.spacing.titleMarginBottom;
    yPosition += topSpacing;
    
    yPosition = this.checkNewPage(this.spacing.headerHeight + 15, yPosition);
    
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(isMainHeader ? 0.02 : 0.01);
    
    if (isMainHeader) {
      this.setTemplateColor('primary');
      
      // Apply unified header styles
      if (this.unifiedStyles.styles.headerStyle === 'background') {
        const primaryColor = this.unifiedStyles.colors.primary.rgb;
        this.doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        this.doc.rect(this.dimensions.margin, yPosition - 8, this.dimensions.maxWidth, headerFontSize + 12, 'F');
        this.doc.setTextColor(255, 255, 255);
      }
    } else {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += Math.ceil(headerFontSize * 0.6);
    
    // Apply unified styling patterns
    if (isMainHeader && this.unifiedStyles.styles.headerStyle === 'underline') {
      const primaryColor = this.unifiedStyles.colors.primary.rgb;
      this.doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      this.doc.setLineWidth(2);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1);
      yPosition += this.unifiedStyles.spacing.titleMarginBottom + 6;
    } else if (!isMainHeader && this.unifiedStyles.styles.sectionTitleStyle === 'underline') {
      const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
      this.doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      this.doc.setLineWidth(2);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1);
      yPosition += this.unifiedStyles.spacing.titleMarginBottom + 2;
    } else {
      yPosition += this.unifiedStyles.spacing.titleMarginBottom;
    }
    
    // Reset character spacing
    this.doc.setCharSpace(0.01);
    return yPosition;
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(25, yPosition);
    
    this.doc.setFontSize(this.unifiedStyles.typography.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005); // Tighter spacing for contact info
    this.setTemplateColor('text');
    
    // Handle contact info with potential URLs
    if (section.htmlContent) {
      yPosition = this.renderContactWithLinks(section.htmlContent, yPosition);
    } else {
      const contactLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.unifiedStyles.typography.bodyFontSize);
      
      contactLines.forEach((line, index) => {
        this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
      });
      
      yPosition += contactLines.length * this.spacing.lineHeight;
    }
    
    this.doc.setCharSpace(0.01); // Reset
    return yPosition + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  private renderContactWithLinks(htmlContent: string, yPosition: number): number {
    // Parse HTML to extract text and links
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    let currentY = yPosition;
    
    // Process each text node and link
    this.processContactNodes(tempDiv, currentY);
    
    return currentY + this.spacing.lineHeight;
  }
  
  private processContactNodes(element: Element, yPosition: number): number {
    let currentY = yPosition;
    let currentX = this.dimensions.margin;
    
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          this.doc.text(text, currentX, currentY);
          currentX += this.doc.getTextWidth(text) + 5;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.tagName.toLowerCase() === 'a') {
          const linkText = el.textContent?.trim() || '';
          const href = el.getAttribute('href') || '';
          
          // Style link text differently
          this.setTemplateColor('primary');
          this.doc.setFont('helvetica', 'normal');
          
          // Add clickable link to PDF
          const linkWidth = this.doc.getTextWidth(linkText);
          this.doc.textWithLink(linkText, currentX, currentY, { url: href });
          
          currentX += linkWidth + 5;
          
          // Reset styling
          this.setTemplateColor('text');
        }
      }
    }
    
    return currentY;
  }
  
  public applySubheaderStyle(section: PDFSection, yPosition: number): number {
    yPosition += this.unifiedStyles.spacing.contentMarginBottom;
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 12, yPosition);
    
    this.doc.setFontSize(this.unifiedStyles.typography.bodyFontSize + 2);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(0.01);
    this.setTemplateColor('primary');
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    return yPosition + this.spacing.subHeaderHeight + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  public applyTextStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
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
    
    return yPosition + textBlockHeight + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  public applyListStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
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
    
    return yPosition + listBlockHeight + this.unifiedStyles.spacing.listItemSpacing;
  }
  
  public applyLinkStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
    
    yPosition = this.checkNewPage(this.spacing.lineHeight + 10, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('primary');
    
    // Add clickable link to PDF
    const linkWidth = this.doc.getTextWidth(section.content);
    this.doc.textWithLink(section.content, this.dimensions.margin, yPosition, { url: section.url || section.content });
    
    return yPosition + this.spacing.lineHeight + this.unifiedStyles.spacing.contentMarginBottom;
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
