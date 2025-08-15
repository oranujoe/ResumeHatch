
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, Plus, AlertTriangle, Zap } from 'lucide-react';
import type { ChangelogEntry } from '@/data/changelogData';

interface ChangelogEntryProps {
  entry: ChangelogEntry;
}

const ChangelogEntry: React.FC<ChangelogEntryProps> = ({ entry }) => {
  const getVersionBadgeVariant = (type: string) => {
    switch (type) {
      case 'major': return 'destructive';
      case 'minor': return 'default';
      case 'patch': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderCategorySection = (
    title: string, 
    items: string[] | undefined, 
    icon: React.ReactNode,
    className: string
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-2">
        <div className={`flex items-center space-x-2 ${className}`}>
          {icon}
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <ul className="space-y-1 ml-6">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant={getVersionBadgeVariant(entry.type)} className="font-mono">
              v{entry.version}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDate(entry.date)}
            </span>
          </div>
          <Badge variant="outline" className="capitalize">
            {entry.type} Release
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {renderCategorySection(
          'New Features',
          entry.categories.features,
          <Plus className="h-4 w-4 text-green-600" />,
          'text-green-600'
        )}
        
        {renderCategorySection(
          'Improvements',
          entry.categories.improvements,
          <Zap className="h-4 w-4 text-blue-600" />,
          'text-blue-600'
        )}
        
        {renderCategorySection(
          'Bug Fixes',
          entry.categories.bugFixes,
          <CheckCircle className="h-4 w-4 text-orange-600" />,
          'text-orange-600'
        )}
        
        {renderCategorySection(
          'Breaking Changes',
          entry.categories.breaking,
          <AlertTriangle className="h-4 w-4 text-red-600" />,
          'text-red-600'
        )}
      </CardContent>
    </Card>
  );
};

export default ChangelogEntry;
