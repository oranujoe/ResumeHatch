
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Clock, Users, Zap } from 'lucide-react';

const ChatPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Live Chat Support</h2>
        <p className="text-muted-foreground">
          Get instant help from our support team. We're here to help you succeed!
        </p>
      </div>

      {/* Support Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Support Status</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium">Response Time</div>
                <div className="text-xs text-muted-foreground">< 2 minutes</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium">Agents Available</div>
                <div className="text-xs text-muted-foreground">5 online now</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium">Satisfaction</div>
                <div className="text-xs text-muted-foreground">98% positive</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Start a Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our support team is ready to help with any questions about ResumeHatch features, 
            billing, technical issues, or general guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Start Live Chat</span>
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule a Call
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Average wait time: Less than 2 minutes
          </div>
        </CardContent>
      </Card>

      {/* Common Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Common Support Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Resume generation issues",
              "Account setup and billing",
              "Chrome extension help",
              "PDF export problems",
              "Template customization",
              "Job parsing accuracy",
              "Feature requests",
              "Technical troubleshooting"
            ].map((topic, index) => (
              <Button key={index} variant="outline" className="justify-start h-auto p-3">
                <div className="text-left">
                  <div className="text-sm font-medium">{topic}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Alternatives */}
      <Card>
        <CardHeader>
          <CardTitle>Other Ways to Reach Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Support</span>
              <Badge variant="outline">support@resumehatch.com</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Response Time</span>
              <Badge variant="outline">Within 4 hours</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Business Hours</span>
              <Badge variant="outline">Mon-Fri 9AM-6PM EST</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
