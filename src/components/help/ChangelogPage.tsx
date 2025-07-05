
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import ChangelogEntry from './ChangelogEntry';
import { changelogData } from '@/data/changelogData';

const ChangelogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEntries = changelogData.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(entry.categories).flat().some(item => 
        item?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = selectedType === 'all' || entry.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const releaseTypes = [
    { value: 'all', label: 'All Releases' },
    { value: 'major', label: 'Major' },
    { value: 'minor', label: 'Minor' },
    { value: 'patch', label: 'Patch' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Changelog</h2>
        <p className="text-muted-foreground">
          Stay up to date with the latest features, improvements, and bug fixes in ResumeHatch.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search changelog entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex space-x-1">
            {releaseTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {changelogData.filter(e => e.type === 'major').length}
          </div>
          <div className="text-xs text-muted-foreground">Major Releases</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {changelogData.filter(e => e.type === 'minor').length}
          </div>
          <div className="text-xs text-muted-foreground">Minor Releases</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {changelogData.filter(e => e.type === 'patch').length}
          </div>
          <div className="text-xs text-muted-foreground">Patch Releases</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {changelogData.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Releases</div>
        </div>
      </div>

      {/* Changelog Entries */}
      <div className="space-y-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <ChangelogEntry key={entry.version} entry={entry} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No changelog entries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangelogPage;
