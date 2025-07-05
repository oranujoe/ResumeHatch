import jsPDF from 'jspdf';
import { ResumeTemplate } from '@/types/resumeTemplates';
import { getTemplateById } from '@/data/templateRegistry';
import { PDFSection, PDFDimensions, PDFSpacing } from './types';
import { getUnifiedTemplateStyles, UnifiedTemplateStyles } from './unifiedStyling';

export interface EnhancedPDFStyles {
  backgroundType: 'none' | 'gradient' | 'solid' | 'border';
  cornerRadius: number;
  borderWidth: number;
  shadowEffect: boolean;
  sectionSpacing: number;
  visualElements: {
    headerBackground: boolean;
    sectionHighlights: boolean;
    bulletPointStyle: 'standard' | 'colored' | 'custom';
  };
}

export class EnhancedPDFStyler {
  private doc: jsPDF;
  private template: ResumeTemplate;
  private unifiedStyles: UnifiedTemplateStyles;
  private dimensions: PDFDimensions;
  private spacing: PDFSpacing;
  private enhancedStyles: EnhancedPDFStyles;
  
  constructor(doc: jsPDF, templateId: string) {
    try {
      this.doc = doc;
      this.template = getTemplateById(templateId) || getTemplateById('modern')!;
      
      if (!this.template) {
        throw new Error(`Template not found: ${templateId}`);
      }
      
      this.unifiedStyles = getUnifiedTemplateStyles(templateId);
    
    this.dimensions = {
      pageWidth: doc.internal.pageSize.getWidth(),
      pageHeight: doc.internal.pageSize.getHeight(),
      margin: 40,
      maxWidth: doc.internal.pageSize.getWidth() - 80
    };
    
    this.spacing = {
      lineHeight: this.unifiedStyles.typography.bodyFontSize * this.unifiedStyles.typography.lineHeight,
      headerHeight: this.unifiedStyles.typography.headerFontSize * 1.2,
      subHeaderHeight: this.unifiedStyles.typography.sectionTitleFontSize * 1.2
    };
    
    // Template-specific enhanced styling
    this.enhancedStyles = this.getTemplateSpecificStyles(templateId);
    
    // Set up enhanced document properties
    doc.setFont('helvetica', 'normal');
    doc.setCharSpace(0.01);
    
    console.log(`PDF Styler initialized for template: ${templateId}`);
    } catch (error) {
      console.error(`Failed to initialize PDF styler for template ${templateId}:`, error);
      throw new Error(`PDF styling initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private getTemplateSpecificStyles(templateId: string): EnhancedPDFStyles {
    const styleMap: Record<string, EnhancedPDFStyles> = {
      creative: {
        backgroundType: 'gradient',
        cornerRadius: 8,
        borderWidth: 0,
        shadowEffect: true,
        sectionSpacing: 20,
        visualElements: {
          headerBackground: true,
          sectionHighlights: true,
          bulletPointStyle: 'colored'
        }
      },
      consultant: {
        backgroundType: 'solid',
        cornerRadius: 4,
        borderWidth: 1,
        shadowEffect: false,
        sectionSpacing: 18,
        visualElements: {
          headerBackground: false,
          sectionHighlights: true,
          bulletPointStyle: 'standard'
        }
      },
      graduate: {
        backgroundType: 'solid',
        cornerRadius: 6,
        borderWidth: 1,
        shadowEffect: false,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: true,
          sectionHighlights: false,
          bulletPointStyle: 'standard'
        }
      },
      sales: {
        backgroundType: 'solid',
        cornerRadius: 6,
        borderWidth: 2,
        shadowEffect: true,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: true,
          sectionHighlights: true,
          bulletPointStyle: 'colored'
        }
      },
      nomad: {
        backgroundType: 'gradient',
        cornerRadius: 12,
        borderWidth: 0,
        shadowEffect: true,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: true,
          sectionHighlights: false,
          bulletPointStyle: 'custom'
        }
      },
      healthcare: {
        backgroundType: 'border',
        cornerRadius: 2,
        borderWidth: 4,
        shadowEffect: false,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: true,
          sectionHighlights: false,
          bulletPointStyle: 'standard'
        }
      },
      veteran: {
        backgroundType: 'border',
        cornerRadius: 0,
        borderWidth: 4,
        shadowEffect: false,
        sectionSpacing: 20,
        visualElements: {
          headerBackground: false,
          sectionHighlights: true,
          bulletPointStyle: 'colored'
        }
      },
      modern: {
        backgroundType: 'none',
        cornerRadius: 0,
        borderWidth: 2,
        shadowEffect: false,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: false,
          sectionHighlights: false,
          bulletPointStyle: 'colored'
        }
      },
      classic: {
        backgroundType: 'none',
        cornerRadius: 0,
        borderWidth: 2,
        shadowEffect: false,
        sectionSpacing: 16,
        visualElements: {
          headerBackground: false,
          sectionHighlights: false,
          bulletPointStyle: 'standard'
        }
      },
      minimal: {
        backgroundType: 'none',
        cornerRadius: 0,
        borderWidth: 0,
        shadowEffect: false,
        sectionSpacing: 14,
        visualElements: {
          headerBackground: false,
          sectionHighlights: false,
          bulletPointStyle: 'standard'
        }
      }
    };
    
    return styleMap[templateId] || styleMap.modern;
  }
  
  public setTemplateColor(colorType: 'primary' | 'secondary' | 'text'): void {
    const color = colorType === 'primary' ? this.unifiedStyles.colors.primary.rgb : 
                 colorType === 'secondary' ? this.unifiedStyles.colors.secondary.rgb : 
                 this.unifiedStyles.colors.text.rgb;
    this.doc.setTextColor(color[0], color[1], color[2]);
  }
  
  public checkNewPage(neededHeight: number, yPosition: number): number {
    const pageBottomMargin = this.dimensions.pageHeight - this.dimensions.margin - 20;
    if (yPosition + neededHeight > pageBottomMargin) {
      this.doc.addPage();
      return this.dimensions.margin + 20;
    }
    return yPosition;
  }
  
  private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number, fillStyle: 'S' | 'F' | 'FD' = 'F'): void {
    if (radius === 0) {
      this.doc.rect(x, y, width, height, fillStyle);
      return;
    }
    
    // Draw rounded rectangle using lines and arcs
    const r = Math.min(radius, width / 2, height / 2);
    
    this.doc.lines([
      [r, 0], [width - 2 * r, 0], // top line
      [r, r, r, 0, Math.PI / 2, Math.PI], // top-right arc
      [0, height - 2 * r], // right line
      [r, r, 0, r, 0, Math.PI / 2], // bottom-right arc
      [-(width - 2 * r), 0], // bottom line
      [r, r, -r, 0, -Math.PI / 2, 0], // bottom-left arc
      [0, -(height - 2 * r)], // left line
      [r, r, 0, -r, Math.PI, -Math.PI / 2] // top-left arc
    ], x + r, y + r, [1, 1], fillStyle);
  }
  
  private drawGradientEffect(x: number, y: number, width: number, height: number): void {
    // Simulate gradient with multiple overlapping rectangles of varying opacity
    const primaryColor = this.unifiedStyles.colors.primary.rgb;
    const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
    
    // Draw base color
    this.doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    this.drawRoundedRect(x, y, width, height, this.enhancedStyles.cornerRadius, 'F');
    
    // Add gradient effect with secondary color overlay
    this.doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    this.doc.setGState({ opacity: 0.3 });
    this.drawRoundedRect(x, y, width * 0.6, height, this.enhancedStyles.cornerRadius, 'F');
    this.doc.setGState({ opacity: 1 }); // Reset opacity
  }
  
  public applyEnhancedHeaderStyle(section: PDFSection, yPosition: number): number {
    const isMainHeader = section.level === 1;
    const headerFontSize = isMainHeader ? this.unifiedStyles.typography.headerFontSize : this.unifiedStyles.typography.sectionTitleFontSize;
    
    yPosition += isMainHeader ? this.unifiedStyles.spacing.sectionMarginBottom : this.unifiedStyles.spacing.titleMarginBottom;
    yPosition = this.checkNewPage(this.spacing.headerHeight + 20, yPosition);
    
    // Apply enhanced visual styling based on template
    if (isMainHeader && this.enhancedStyles.visualElements.headerBackground) {
      const headerHeight = headerFontSize + 16;
      const headerY = yPosition - 8;
      
      switch (this.enhancedStyles.backgroundType) {
        case 'gradient':
          this.drawGradientEffect(this.dimensions.margin, headerY, this.dimensions.maxWidth, headerHeight);
          this.doc.setTextColor(255, 255, 255); // White text on gradient
          break;
        case 'solid':
          if (this.template.id === 'consultant') {
            // Consultant Pro highlight style
            const primaryColor = this.unifiedStyles.colors.primary.rgb;
            this.doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            this.doc.setGState({ opacity: 0.1 });
            this.drawRoundedRect(this.dimensions.margin - 8, headerY, this.dimensions.maxWidth + 16, headerHeight, this.enhancedStyles.cornerRadius, 'F');
            this.doc.setGState({ opacity: 1 });
          } else {
            const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
            this.doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            this.doc.setGState({ opacity: 0.15 });
            this.drawRoundedRect(this.dimensions.margin, headerY, this.dimensions.maxWidth, headerHeight, this.enhancedStyles.cornerRadius, 'F');
            this.doc.setGState({ opacity: 1 });
          }
          break;
        case 'border':
          const primaryColor = this.unifiedStyles.colors.primary.rgb;
          this.doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          this.doc.setLineWidth(this.enhancedStyles.borderWidth);
          
          if (this.template.id === 'veteran') {
            // Left border accent
            this.doc.line(this.dimensions.margin - 8, headerY, this.dimensions.margin - 8, headerY + headerHeight);
          } else if (this.template.id === 'healthcare') {
            // Left border with background
            this.doc.line(this.dimensions.margin - 8, headerY, this.dimensions.margin - 8, headerY + headerHeight);
            const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
            this.doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            this.doc.setGState({ opacity: 0.1 });
            this.doc.rect(this.dimensions.margin, headerY, this.dimensions.maxWidth, headerHeight, 'F');
            this.doc.setGState({ opacity: 1 });
          }
          break;
      }
    }
    
    // Set text properties
    this.doc.setFontSize(headerFontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(isMainHeader ? 0.02 : 0.01);
    
    if (!isMainHeader || !this.enhancedStyles.visualElements.headerBackground || this.enhancedStyles.backgroundType !== 'gradient') {
      this.setTemplateColor('primary');
    }
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    yPosition += Math.ceil(headerFontSize * 0.6);
    
    // Apply underline styling
    if (this.unifiedStyles.styles.headerStyle === 'underline' && isMainHeader) {
      const primaryColor = this.unifiedStyles.colors.primary.rgb;
      this.doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      this.doc.setLineWidth(2);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth, yPosition + 1);
      yPosition += 8;
    } else if (this.unifiedStyles.styles.sectionTitleStyle === 'underline' && !isMainHeader) {
      const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
      this.doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      this.doc.setLineWidth(1);
      this.doc.line(this.dimensions.margin, yPosition + 1, this.dimensions.margin + this.dimensions.maxWidth * 0.8, yPosition + 1);
      yPosition += 6;
    }
    
    yPosition += this.enhancedStyles.sectionSpacing;
    this.doc.setCharSpace(0.01); // Reset
    return yPosition;
  }
  
  public applyEnhancedSectionTitleStyle(section: PDFSection, yPosition: number): number {
    yPosition += this.unifiedStyles.spacing.contentMarginBottom;
    yPosition = this.checkNewPage(this.spacing.subHeaderHeight + 20, yPosition);
    
    const titleFontSize = this.unifiedStyles.typography.sectionTitleFontSize;
    
    // Apply section title highlighting for templates that support it
    if (this.enhancedStyles.visualElements.sectionHighlights) {
      const titleHeight = titleFontSize + 8;
      const titleY = yPosition - 4;
      
      if (this.template.id === 'consultant') {
        // Consultant Pro rounded highlight
        const primaryColor = this.unifiedStyles.colors.primary.rgb;
        this.doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        this.doc.setGState({ opacity: 0.1 });
        this.drawRoundedRect(this.dimensions.margin - 4, titleY, this.doc.getTextWidth(section.content) + 16, titleHeight, 4, 'F');
        this.doc.setGState({ opacity: 1 });
      } else if (this.template.id === 'sales') {
        // Sales template border highlight
        const primaryColor = this.unifiedStyles.colors.primary.rgb;
        this.doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        this.doc.setLineWidth(3);
        this.doc.line(this.dimensions.margin - 8, titleY, this.dimensions.margin - 8, titleY + titleHeight);
        
        const secondaryColor = this.unifiedStyles.colors.secondary.rgb;
        this.doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        this.doc.setGState({ opacity: 0.1 });
        this.doc.rect(this.dimensions.margin, titleY, this.dimensions.maxWidth, titleHeight, 'F');
        this.doc.setGState({ opacity: 1 });
      } else if (this.template.id === 'veteran') {
        // Veteran template highlight style
        const primaryColor = this.unifiedStyles.colors.primary.rgb;
        this.doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        this.doc.setGState({ opacity: 0.15 });
        this.doc.rect(this.dimensions.margin - 8, titleY, this.dimensions.maxWidth + 16, titleHeight, 'F');
        this.doc.setGState({ opacity: 1 });
      }
    }
    
    this.doc.setFontSize(titleFontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setCharSpace(0.01);
    this.setTemplateColor('primary');
    
    this.doc.text(section.content, this.dimensions.margin, yPosition);
    return yPosition + this.spacing.subHeaderHeight + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  public applyEnhancedListStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
    
    // Enhanced bullet point styling
    let bulletSymbol = '•';
    if (this.enhancedStyles.visualElements.bulletPointStyle === 'colored') {
      this.setTemplateColor('primary');
    } else if (this.enhancedStyles.visualElements.bulletPointStyle === 'custom') {
      bulletSymbol = this.template.id === 'nomad' ? '→' : '•';
      this.setTemplateColor('primary');
    }
    
    const bulletText = `${bulletSymbol} ${section.content}`;
    const availableWidth = this.dimensions.maxWidth - 15;
    const listLines = this.splitTextToLines(bulletText, availableWidth, fontSize);
    const listBlockHeight = listLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(listBlockHeight + 10, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    
    listLines.forEach((line, index) => {
      if (index === 0) {
        // Draw bullet point in primary color if enhanced
        if (this.enhancedStyles.visualElements.bulletPointStyle !== 'standard') {
          this.setTemplateColor('primary');
          this.doc.text(bulletSymbol, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
          this.setTemplateColor('text');
          this.doc.text(line.substring(2), this.dimensions.margin + 12, yPosition + (index * this.spacing.lineHeight));
        } else {
          this.setTemplateColor('text');
          this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
        }
      } else {
        this.setTemplateColor('text');
        this.doc.text(line, this.dimensions.margin + 15, yPosition + (index * this.spacing.lineHeight));
      }
    });
    
    return yPosition + listBlockHeight + this.unifiedStyles.spacing.listItemSpacing;
  }
  
  public splitTextToLines(text: string, maxWidth: number, fontSize: number): string[] {
    this.doc.setFontSize(fontSize);
    const adjustedWidth = maxWidth * 0.95;
    return this.doc.splitTextToSize(text, adjustedWidth);
  }
  
  public applyContactStyle(section: PDFSection, yPosition: number): number {
    yPosition = this.checkNewPage(25, yPosition);
    
    this.doc.setFontSize(this.unifiedStyles.typography.bodyFontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('text');
    
    if (section.htmlContent) {
      yPosition = this.renderContactWithLinks(section.htmlContent, yPosition);
    } else {
      const contactLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, this.unifiedStyles.typography.bodyFontSize);
      contactLines.forEach((line, index) => {
        this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
      });
      yPosition += contactLines.length * this.spacing.lineHeight;
    }
    
    this.doc.setCharSpace(0.01);
    return yPosition + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  private renderContactWithLinks(htmlContent: string, yPosition: number): number {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    let currentY = yPosition;
    let currentX = this.dimensions.margin;
    
    for (const node of tempDiv.childNodes) {
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
          
          this.setTemplateColor('primary');
          this.doc.setFont('helvetica', 'normal');
          
          const linkWidth = this.doc.getTextWidth(linkText);
          this.doc.textWithLink(linkText, currentX, currentY, { url: href });
          
          currentX += linkWidth + 5;
          this.setTemplateColor('text');
        }
      }
    }
    
    return currentY + this.spacing.lineHeight;
  }
  
  public applyTextStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
    const textLines = this.splitTextToLines(section.content, this.dimensions.maxWidth, fontSize);
    const textBlockHeight = textLines.length * this.spacing.lineHeight;
    
    yPosition = this.checkNewPage(textBlockHeight + 12, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('text');
    
    textLines.forEach((line, index) => {
      this.doc.text(line, this.dimensions.margin, yPosition + (index * this.spacing.lineHeight));
    });
    
    return yPosition + textBlockHeight + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  public applyLinkStyle(section: PDFSection, yPosition: number): number {
    const fontSize = this.unifiedStyles.typography.bodyFontSize;
    
    yPosition = this.checkNewPage(this.spacing.lineHeight + 10, yPosition);
    
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setCharSpace(0.005);
    this.setTemplateColor('primary');
    
    const linkWidth = this.doc.getTextWidth(section.content);
    this.doc.textWithLink(section.content, this.dimensions.margin, yPosition, { url: section.url || section.content });
    
    return yPosition + this.spacing.lineHeight + this.unifiedStyles.spacing.contentMarginBottom;
  }
  
  public addEnhancedFooter(): void {
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