
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { signupSchema, SignupFormValues } from './schemas';
import { validateAndSanitizeInput } from '@/utils/inputSanitization';

interface SignupFormProps {
  onToggleMode: () => void;
  onSignupSuccess: () => void;
}

const SignupForm = ({ onToggleMode, onSignupSuccess }: SignupFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      // Sanitize inputs for additional security
      const sanitizedData = {
        email: validateAndSanitizeInput(data.email, 'email'),
        fullName: validateAndSanitizeInput(data.fullName, 'name'),
        password: data.password, // Don't sanitize passwords
      };

      const { error } = await signUp(sanitizedData.email, data.password, {
        full_name: sanitizedData.fullName,
      });
      
      if (error) {
        // Generic error message to avoid information leakage
        if (error.message.includes('already registered')) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else if (error.message.includes('Password')) {
          toast({
            title: "Password requirements not met",
            description: "Please ensure your password meets all requirements.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration failed",
            description: "Unable to create account. Please check your information and try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
        onSignupSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    type="email" 
                    {...field} 
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Create a strong password" 
                    type="password" 
                    {...field} 
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-gray-600 mt-1">
                  Must contain: 8+ characters, uppercase, lowercase, number, and special character
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Confirm your password" 
                    type="password" 
                    {...field} 
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-brand-blue hover:text-blue-700 font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </>
  );
};

export default SignupForm;
