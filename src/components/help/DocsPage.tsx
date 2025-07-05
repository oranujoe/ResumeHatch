
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink } from 'lucide-react';

const DocsPage: React.FC = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      items: [
        { question: "How do I create my first resume?", answer: "Navigate to Job Parser and paste a job description to get started." },
        { question: "What file formats are supported for resume upload?", answer: "We support PDF, DOC, and DOCX formats." },
        { question: "How does the AI resume generation work?", answer: "Our AI analyzes job descriptions and tailors your resume accordingly." }
      ]
    },
    {
      title: "Job Parser",
      items: [
        { question: "What makes a good job description for parsing?", answer: "Complete job postings with clear requirements work best." },
        { question: "Can I edit the generated resume?", answer: "Yes, all generated content can be customized before download." },
        { question: "How accurate is the job requirement analysis?", answer: "Our AI achieves 95%+ accuracy in identifying key requirements." }
      ]
    },
    {
      title: "Account & Billing",
      items: [
        { question: "How do credits work?", answer: "Each resume generation consumes 1 credit. Credits never expire." },
        { question: "Can I upgrade or downgrade my plan?", answer: "Yes, you can change your plan anytime from Settings." },
        { question: "What's included in the free plan?", answer: "Free users get 3 resume generations per month." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Documentation & FAQ</h2>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to get the most out of ResumeHatch.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-10"
        />
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Quick Links</span>
            <Badge variant="outline">Popular</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">User Guide</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">API Documentation</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Video Tutorials</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium">Best Practices</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {faqCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      {item.question}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                    {itemIndex < category.items.length - 1 && (
                      <div className="border-b border-muted" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocsPage;
