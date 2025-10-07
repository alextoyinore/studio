
"use client";

import { useState, useEffect } from "react";
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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCourse, updateCourse } from "./actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import type { School } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  schoolId: z.string().uuid("Please select a valid school."),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  enrollUrl: z.string().url("Please enter a valid URL for the enrollment link."),
  travelType: z.string().min(3, "Please enter at least one travel type."),
});

type CourseFormValues = z.infer<typeof formSchema>;

export default function EditCoursePage({ params }: { params: { id: string }}) {
  const { id } = params;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    async function fetchSchools() {
      const supabase = createClient();
      const { data, error } = await supabase.from('schools').select('id, name').order('name');
      if (error) {
        console.error("Error fetching schools", error);
      } else {
        setSchools(data as School[]);
      }
    }
    fetchSchools();
  }, []);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      schoolId: "",
      duration: "",
      description: "",
      enrollUrl: "",
      travelType: "",
    },
  });

  useEffect(() => {
    async function fetchCourse() {
        const course = await getCourse(id);
        if (course) {
            form.reset({
                ...course,
                schoolId: course.school_id,
                enrollUrl: course.enroll_url,
                travelType: Array.isArray(course.travel_type) ? course.travel_type.join(', ') : '',
            });
        } else {
            toast({
                variant: "destructive",
                title: "Course not found",
            });
        }
        setIsLoading(false);
    }
    fetchCourse();
  }, [id, form, toast]);

  async function onSubmit(values: CourseFormValues) {
    setIsSubmitting(true);
    const result = await updateCourse(id, values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Course Updated!",
        description: "The course has been updated successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem saving the course.",
      });
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
            <Link href="/admin/courses">
                <ArrowLeft />
                <span className="sr-only">Back to Courses</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Course</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>Update the details for this course.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Introduction to Python" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                     <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a school" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schools.map(school => (
                            <SelectItem key={school.id} value={school.id}>
                                {school.name}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The school where this course is offered.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 8 Weeks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short description of the course content and objectives." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="travelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Types</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., student, work" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of relevant travel types.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enrollUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enroll URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/enroll" {...field} />
                    </FormControl>
                     <FormDescription>
                      The direct link for students to enroll.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
