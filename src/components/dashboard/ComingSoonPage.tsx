
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <p className="text-muted-foreground">
          We're working hard to bring you this feature. Stay tuned!
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span>Feature In Development</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This feature is currently under development and will be available soon. 
            We're focusing on delivering the best possible experience for you.
          </p>
          
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <Zap className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-sm font-medium text-orange-800">What's coming?</div>
              <div className="text-xs text-orange-700">
                Enhanced functionality to help you succeed in your job search
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoonPage;
