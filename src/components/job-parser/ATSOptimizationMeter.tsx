
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Target, AlertTriangle, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ATSScore {
  overall: number;
  keyword: number;
  formatting: number;
  content: number;
  compatibility: number;
}

interface ATSOptimizationMeterProps {
  score: ATSScore;
  suggestions: string[];
  keywordMatches: number;
  totalKeywords: number;
  issues: string[];
  isAnalyzing?: boolean;
}

const ATSOptimizationMeter: React.FC<ATSOptimizationMeterProps> = ({
  score,
  suggestions,
  keywordMatches,
  totalKeywords,
  issues,
  isAnalyzing = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return 'text-green-600';
    if (scoreValue >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (scoreValue: number) => {
    if (scoreValue >= 80) return 'Excellent';
    if (scoreValue >= 60) return 'Good';
    if (scoreValue >= 40) return 'Fair';
    return 'Needs Work';
  };

  // Show analyzing state for very low scores that indicate processing
  const isProcessing = isAnalyzing || (score.overall === 0 && keywordMatches === 0);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>ATS Optimization</span>
          </div>
          {isProcessing && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Score</span>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
                {Math.round(score.overall)}
              </span>
              <Badge variant={score.overall >= 80 ? 'default' : score.overall >= 60 ? 'secondary' : 'destructive'}>
                {getScoreLabel(score.overall)}
              </Badge>
            </div>
          </div>
          <Progress 
            value={score.overall} 
            className="h-2"
          />
        </div>

        {/* Keyword Match */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Keyword Match</span>
            <span className="font-medium">
              {keywordMatches}/{totalKeywords} keywords
            </span>
          </div>
          <Progress 
            value={totalKeywords > 0 ? (keywordMatches / totalKeywords) * 100 : 0} 
            className="h-1.5"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-bold ${getScoreColor(score.formatting)}`}>
              {Math.round(score.formatting)}
            </div>
            <div className="text-xs text-muted-foreground">Format</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-bold ${getScoreColor(score.content)}`}>
              {Math.round(score.content)}
            </div>
            <div className="text-xs text-muted-foreground">Content</div>
          </div>
        </div>

        {/* Top Suggestions */}
        {!isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quick Wins</span>
            </div>
            <div className="space-y-1">
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Analysis (Collapsible) */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors">
            <span>Detailed Analysis</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Detailed Scores */}
            <div className="space-y-3">
              <div className="text-sm font-medium">Score Breakdown</div>
              
              {[
                { label: 'Keywords', value: score.keyword },
                { label: 'Formatting', value: score.formatting },
                { label: 'Content Quality', value: score.content },
                { label: 'ATS Compatibility', value: score.compatibility }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{item.label}</span>
                    <span className={`font-medium ${getScoreColor(item.value)}`}>
                      {Math.round(item.value)}%
                    </span>
                  </div>
                  <Progress value={item.value} className="h-1" />
                </div>
              ))}
            </div>

            {/* All Suggestions */}
            {suggestions.length > 2 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">All Suggestions</div>
                <div className="space-y-1">
                  {suggestions.slice(2).map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues */}
            {issues.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-red-600">Issues Found</div>
                <div className="space-y-1">
                  {issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs">
                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ATSOptimizationMeter;
