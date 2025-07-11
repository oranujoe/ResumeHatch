
import { useState, useEffect } from 'react';
import { extractTextFromHTML, normalizeContent, getWordCount } from '@/utils/textExtraction';

export interface ATSScore {
  overall: number;
  keyword: number;
  formatting: number;
  content: number;
  compatibility: number;
}

export interface ATSMetrics {
  score: ATSScore;
  keywordMatches: string[];
  totalKeywords: number;
  suggestions: string[];
  issues: string[];
  isAnalyzing: boolean;
}

export const useATSOptimization = (resumeContent: string, jobDescription: string): ATSMetrics => {
  const [metrics, setMetrics] = useState<ATSMetrics>({
    score: {
      overall: 0,
      keyword: 0,
      formatting: 0,
      content: 0,
      compatibility: 0
    },
    keywordMatches: [],
    totalKeywords: 0,
    suggestions: [],
    issues: [],
    isAnalyzing: false
  });

  useEffect(() => {
    console.log('useATSOptimization: Input changed', { 
      resumeLength: resumeContent?.length || 0, 
      jobDescLength: jobDescription?.length || 0 
    });

    if (!resumeContent && !jobDescription) {
      console.log('useATSOptimization: No content provided, resetting metrics');
      setMetrics(prev => ({ ...prev, isAnalyzing: false }));
      return;
    }

    // Set analyzing state immediately
    setMetrics(prev => ({ ...prev, isAnalyzing: true }));

    const timeoutId = setTimeout(() => {
      try {
        console.log('useATSOptimization: Starting analysis...');
        
        // Extract plain text from HTML content
        const plainTextResume = extractTextFromHTML(resumeContent || '');
        const plainTextJob = extractTextFromHTML(jobDescription || '');
        
        console.log('useATSOptimization: Extracted plain text', {
          resumeText: plainTextResume.substring(0, 100) + '...',
          jobText: plainTextJob.substring(0, 100) + '...'
        });

        // Analyze the content
        const newMetrics = analyzeContent(plainTextResume, plainTextJob);
        
        console.log('useATSOptimization: Analysis complete', newMetrics);
        
        setMetrics({ ...newMetrics, isAnalyzing: false });
      } catch (error) {
        console.error('useATSOptimization: Analysis error', error);
        setMetrics(prev => ({ ...prev, isAnalyzing: false }));
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [resumeContent, jobDescription]);

  return metrics;
};

const analyzeContent = (resumeText: string, jobText: string): Omit<ATSMetrics, 'isAnalyzing'> => {
  console.log('analyzeContent: Starting analysis', { 
    resumeLength: resumeText.length, 
    jobLength: jobText.length 
  });

  // Basic word count
  const wordCount = getWordCount(resumeText);
  console.log('analyzeContent: Word count', wordCount);

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobText);
  console.log('analyzeContent: Job keywords', jobKeywords);

  // Find matching keywords in resume
  const normalizedResume = normalizeContent(resumeText);
  const keywordMatches = jobKeywords.filter(keyword => 
    normalizedResume.includes(normalizeContent(keyword))
  );
  console.log('analyzeContent: Keyword matches', keywordMatches);

  // Calculate metrics
  const keywordScore = jobKeywords.length > 0 ? (keywordMatches.length / jobKeywords.length) * 100 : 0;
  const contentScore = calculateReadabilityScore(resumeText);
  const formattingScore = calculateFormattingScore(resumeText);
  const compatibilityScore = Math.min(100, (keywordScore + contentScore + formattingScore) / 3);
  
  // Overall score (weighted average)
  const overallScore = Math.round(
    (keywordScore * 0.4) + 
    (contentScore * 0.3) + 
    (formattingScore * 0.3)
  );

  // Generate suggestions and issues
  const suggestions = generateSuggestions(keywordMatches, jobKeywords, wordCount);
  const issues = generateIssues(keywordMatches, jobKeywords, wordCount);

  const result = {
    score: {
      overall: overallScore,
      keyword: Math.round(keywordScore),
      formatting: Math.round(formattingScore),
      content: Math.round(contentScore),
      compatibility: Math.round(compatibilityScore)
    },
    keywordMatches,
    totalKeywords: jobKeywords.length,
    suggestions,
    issues
  };

  console.log('analyzeContent: Final result', result);
  return result;
};

const extractKeywords = (text: string): string[] => {
  if (!text) return [];
  
  // Simple keyword extraction - split by common separators and filter
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !commonWords.includes(word));
  
  // Get unique words and return most frequent ones
  const wordFreq = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 20)
    .map(([word]) => word);
};

const calculateReadabilityScore = (text: string): number => {
  if (!text) return 0;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
  
  // Simple readability score (higher is better, max 100)
  return Math.min(100, Math.max(0, 100 - (avgWordsPerSentence - 15) * 2));
};

const calculateFormattingScore = (text: string): number => {
  if (!text) return 0;
  
  let score = 60; // Base score
  
  // Check for bullet points or structure
  if (text.includes('•') || text.includes('-') || text.includes('*')) {
    score += 20;
  }
  
  // Check for section headers (words in caps)
  if (/[A-Z]{3,}/.test(text)) {
    score += 10;
  }
  
  // Check for adequate length
  if (text.length > 500) {
    score += 10;
  }
  
  return Math.min(100, score);
};

const generateSuggestions = (matches: string[], allKeywords: string[], wordCount: number): string[] => {
  const suggestions: string[] = [];
  
  if (matches.length === 0) {
    suggestions.push("Add relevant keywords from the job description");
  }
  
  if (matches.length < allKeywords.length * 0.3) {
    suggestions.push("Include more job-specific terminology");
  }
  
  if (wordCount < 300) {
    suggestions.push("Expand your resume with more detailed descriptions");
  } else if (wordCount > 800) {
    suggestions.push("Consider condensing content for better readability");
  }
  
  if (matches.length > 0) {
    suggestions.push(`Great! Found ${matches.length} relevant keywords`);
  }
  
  return suggestions;
};

const generateIssues = (matches: string[], allKeywords: string[], wordCount: number): string[] => {
  const issues: string[] = [];
  
  if (matches.length === 0) {
    issues.push("No matching keywords found");
  }
  
  if (wordCount < 200) {
    issues.push("Resume content is too short");
  }
  
  if (matches.length < allKeywords.length * 0.2) {
    issues.push("Low keyword density");
  }
  
  return issues;
};

// Common words to filter out during keyword extraction
const commonWords = [
  'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'a', 'an', 'as', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
];
