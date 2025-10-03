
"use client";

import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitApplication } from "./actions";
import { ImageUpload } from "@/components/ImageUpload";
import type { Job } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  jobId: z.string().uuid(),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters.").optional(),
  resumeUrl: z.string().min(1, "Please upload your resume or CV."),
  hasPassport: z.enum(["yes", "no"], { required_error: "Please select an option."}),
});

type ApplicationFormValues = z.infer<typeof formSchema>;

// The params are a promise in client components, so we need to type it correctly
type PageProps = {
    params: { jobId: string };
}

export default function JobApplicationPage({ params }: PageProps) {
  const { jobId } = use(params);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobId: jobId,
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resumeUrl: "",
    },
  });

  useEffect(() => {
    async function fetchJob() {
      const supabase = createClient();
      const { data, error } = await supabase.from('jobs').select('*').eq('id', jobId).single();
      if (error) {
        console.error("Error fetching job details", error);
        toast({
            variant: "destructive",
            title: "Failed to load job details",
        });
      } else {
        setJob(data as Job);
      }
    }
    fetchJob();
  }, [jobId, toast]);

  async function onSubmit(values: ApplicationFormValues) {
    setIsSubmitting(true);
    const result = await submitApplication(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Application Submitted!",
        description: "Your application has been sent successfully. We will be in touch soon.",
      });
      form.reset({
        ...form.getValues(),
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resumeUrl: "",
        hasPassport: undefined,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem submitting your application.",
      });
    }
  }

  if (!job) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <div className="container mx-auto py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Apply for {job.title}</CardTitle>
          <CardDescription>Fill out the form below to submit your application for the {job.title} role at {job.company}.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="resumeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume/CV</FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                       <FormDescription>Please upload your resume or CV (PDF, DOC, DOCX).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us why you're a great fit for this role..." {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasPassport"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Do you already have a valid passport?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
