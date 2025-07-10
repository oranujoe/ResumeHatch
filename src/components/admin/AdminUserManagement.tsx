
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Shield, UserPlus } from 'lucide-react';

const AdminUserManagement: React.FC = () => {
  const [email, setEmail] = useState('hermesinc.jo@gmail.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleMakeAdmin = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('make_user_admin', {
        _user_email: email.trim()
      });

      if (error) {
        console.error('Error making user admin:', error);
        toast.error('Failed to make user admin. Please check if the email exists.');
      } else {
        toast.success(`Successfully granted admin privileges to ${email}`);
        setEmail('');
      }
    } catch (error) {
      console.error('Error in makeUserAdmin:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-600" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleMakeAdmin}
          disabled={isLoading || !email.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Make Admin
            </>
          )}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          <p>This will grant admin privileges to the specified user.</p>
          <p className="text-red-600 font-medium mt-1">
            ⚠️ Admin users have full access to the system.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;
