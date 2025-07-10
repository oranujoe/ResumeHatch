
export interface PDFSection {
  type: 'header' | 'subheader' | 'text' | 'list' | 'contact' | 'link';
  content: string;
  level?: number;
  url?: string; // For link sections
  links?: { [linkText: string]: string }; // For contact sections with embedded links
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

export interface PdfStyle {
  fontSize: number;
  fontStyle: 'normal' | 'bold' | 'italic';
  marginBottom: number;
  underline?: boolean;
  bullet?: boolean;
}
