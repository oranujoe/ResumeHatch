
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { useSkillsInventory, useUserProfile } from '@/hooks/useKnowledgeBase';

const SkillsGapPage: React.FC = () => {
  const { data: skills, isLoading: skillsLoading } = useSkillsInventory();
  const { data: profile } = useUserProfile();

  // Mock data for market demand and recommendations
  const marketDemandSkills = [
    { name: 'React', demand: 95, hasSkill: true, currentLevel: 'Advanced' },
    { name: 'TypeScript', demand: 88, hasSkill: true, currentLevel: 'Intermediate' },
    { name: 'Node.js', demand: 82, hasSkill: false, currentLevel: null },
    { name: 'AWS', demand: 78, hasSkill: false, currentLevel: null },
    { name: 'Docker', demand: 75, hasSkill: true, currentLevel: 'Beginner' },
    { name: 'GraphQL', demand: 68, hasSkill: false, currentLevel: null },
    { name: 'Python', demand: 85, hasSkill: false, currentLevel: null },
    { name: 'Kubernetes', demand: 72, hasSkill: false, currentLevel: null },
  ];

  const learningRecommendations = [
    {
      skill: 'AWS Certification',
      priority: 'High',
      reason: 'High market demand (78%) and missing from your profile',
      estimatedTime: '2-3 months',
      resources: ['AWS Training', 'Cloud Practitioner Certification']
    },
    {
      skill: 'Node.js',
      priority: 'High',
      reason: 'Complements your React skills, 82% market demand',
      estimatedTime: '1-2 months',
      resources: ['Node.js Documentation', 'Express.js Tutorial']
    },
    {
      skill: 'Docker Advanced',
      priority: 'Medium',
      reason: 'Upgrade from Beginner to Intermediate level',
      estimatedTime: '3-4 weeks',
      resources: ['Docker Deep Dive Course', 'Container Orchestration']
    }
  ];

  const skillsMap = skills?.reduce((acc, skill) => {
    acc[skill.skill_name.toLowerCase()] = skill;
    return acc;
  }, {} as Record<string, any>) || {};

  const enhancedMarketSkills = marketDemandSkills.map(marketSkill => {
    const userSkill = skillsMap[marketSkill.name.toLowerCase()];
    return {
      ...marketSkill,
      hasSkill: !!userSkill,
      currentLevel: userSkill?.proficiency_level || null
    };
  });

  const skillsGapCount = enhancedMarketSkills.filter(skill => !skill.hasSkill).length;
  const strongSkills = enhancedMarketSkills.filter(skill => 
    skill.hasSkill && ['Advanced', 'Expert'].includes(skill.currentLevel)
  ).length;

  if (skillsLoading) {
    return <div>Loading skills analysis...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Skills Gap Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{skills?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Skills in Profile</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{skillsGapCount}</p>
                <p className="text-sm text-muted-foreground">Skills Gap</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{strongSkills}</p>
                <p className="text-sm text-muted-foreground">Strong Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Demand Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Market Demand vs Your Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {enhancedMarketSkills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{skill.name}</span>
                  {skill.hasSkill ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {skill.currentLevel}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Missing
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{skill.demand}% demand</span>
              </div>
              <Progress value={skill.demand} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Learning Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningRecommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{rec.skill}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                </div>
                <Badge 
                  variant={rec.priority === 'High' ? 'destructive' : 'secondary'}
                  className={rec.priority === 'High' ? '' : 'bg-orange-100 text-orange-700'}
                >
                  {rec.priority} Priority
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>⏱️ {rec.estimatedTime}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Recommended Resources:</p>
                <div className="flex flex-wrap gap-2">
                  {rec.resources.map((resource, idx) => (
                    <Button key={idx} variant="outline" size="sm" className="h-7">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {resource}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Career Growth Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Career Growth Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Key Insight</h4>
            <p className="text-sm text-blue-800">
              Based on your current skills and {profile?.industry || 'your industry'}, 
              focusing on cloud technologies (AWS, Docker) could increase your market value by 25-30%.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">🎯 Strength Areas</h4>
            <p className="text-sm text-green-800">
              Your React and TypeScript skills are well-aligned with current market demands. 
              Consider becoming a technical mentor or contributing to open-source projects.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">📈 Growth Opportunity</h4>
            <p className="text-sm text-orange-800">
              The skills gap analysis shows 3-4 high-demand skills missing from your profile. 
              Addressing these could open up {skillsGapCount * 15}% more job opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsGapPage;
