
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  wants_updates: z.boolean().default(false),
});

type WaitlistFormValues = z.infer<typeof formSchema>;

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      wants_updates: false,
    },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      // Insert data into Supabase waitlist table
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            name: data.name,
            email: data.email,
            wants_updates: data.wants_updates,
            status: 'pending'
          }
        ]);
      
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }
      
      // Success message
      toast({
        title: "Successfully joined the waitlist!",
        description: "We'll notify you when ResumeHatch launches.",
      });
      
      // Close the dialog
      onOpenChange(false);
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Button is only enabled if checkbox is checked
  const isButtonDisabled = !form.watch("wants_updates") || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the ResumeHatch Waitlist</DialogTitle>
          <DialogDescription>
            Be the first to know when we launch. Get early access to our AI-powered résumé tools.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="wants_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to join the waitlist
                    </FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      Receive occasional updates about new features and launches.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-brand-blue hover:bg-blue-700" 
                disabled={isButtonDisabled}
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
