
import React, { useState } from 'react';
import { Search, ExternalLink, Sparkles, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ParseAndApplyPage = () => {
  const [jobUrl, setJobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleParseJob = async () => {
    if (!jobUrl.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setParsedData({
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        salary: '$120,000 - $160,000',
        requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
        description: 'We are looking for a senior frontend developer to join our team...'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Parse & Apply</h2>
        <p className="text-muted-foreground mt-1">
          Paste a job URL and let AI parse the requirements to create a tailored application
        </p>
      </div>

      {/* Job URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Job Listing URL</span>
          </CardTitle>
          <CardDescription>
            Enter the URL of the job posting you want to apply for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="https://company.com/jobs/senior-developer"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleParseJob}
              disabled={!jobUrl.trim() || isLoading}
              className="flex items-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isLoading ? 'Parsing...' : 'Parse Job'}</span>
            </Button>
          </div>
          
          {jobUrl && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>Job will be parsed and analyzed by AI</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parsed Job Data */}
      {parsedData && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Parsed Job Details</CardTitle>
              <CardDescription>AI-extracted information from the job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{parsedData.title}</h3>
                <p className="text-muted-foreground">{parsedData.company}</p>
                <p className="text-sm text-muted-foreground">{parsedData.location}</p>
                <p className="text-sm font-medium text-primary mt-1">{parsedData.salary}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Key Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {parsedData.requirements.map((req: string, index: number) => (
                    <Badge key={index} variant="secondary">{req}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {parsedData.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Generate Application</span>
              </CardTitle>
              <CardDescription>
                AI will create a tailored application based on your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  placeholder="Any specific points you want to highlight for this application..."
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Cover Letter</span>
                </Button>
                <Button variant="outline" className="flex-1 flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Quick Apply</span>
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>• Cover letter will be tailored to match job requirements</p>
                <p>• Your resume will be optimized for this position</p>
                <p>• Application will be added to your tracking dashboard</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ParseAndApplyPage;
