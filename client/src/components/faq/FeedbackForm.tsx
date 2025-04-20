import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/feedback", data);
      
      toast({
        title: "Thank you!",
        description: "We've received your feedback and will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  {...field} 
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-[var(--deep-purple)] focus:ring-1 focus:ring-[var(--deep-purple)] outline-none transition-colors"
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
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your@email.com" 
                  type="email" 
                  {...field}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-[var(--deep-purple)] focus:ring-1 focus:ring-[var(--deep-purple)] outline-none transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your feedback or question" 
                  rows={4} 
                  {...field}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-[var(--deep-purple)] focus:ring-1 focus:ring-[var(--deep-purple)] outline-none transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <button 
          type="submit" 
          className="gradient-btn text-white font-poppins font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
