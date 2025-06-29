
export interface PDFSection {
  type: 'header' | 'subheader' | 'text' | 'list' | 'contact';
  content: string;
  level?: number;
}

export interface PDFGenerationOptions {
  filename?: string;
  templateId?: string;
}

export interface PDFDimensions {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  maxWidth: number;
}

export interface PDFSpacing {
  lineHeight: number;
  headerHeight: number;
  subHeaderHeight: number;
}
