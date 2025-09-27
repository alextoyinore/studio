"use client";

import { useState } from "react";
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
import { addSchool } from "../actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  country: z.string().min(2, "Country must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid URL for the image."),
  imageDescription: z.string().min(5, "Image description must be at least 5 characters."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
});

type SchoolFormValues = z.infer<typeof formSchema>;

export default function AddSchoolPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      country: "",
      description: "",
      imageUrl: "",
      imageDescription: "",
      imageHint: "",
    },
  });

  async function onSubmit(values: SchoolFormValues) {
    setIsSubmitting(true);
    const result = await addSchool(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "School Added!",
        description: "The new school has been saved successfully.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem saving the school.",
      });
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
            <Link href="/admin/schools">
                <ArrowLeft />
                <span className="sr-only">Back to Schools</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New School</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>School Details</CardTitle>
          <CardDescription>Fill out the form to add a new school to your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris Language School" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris" {...field} />
                    </FormControl>
                     <FormDescription>City where the school is located.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., France" {...field} />
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
                      <Textarea placeholder="A short, catchy description of the school." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h3 className="text-lg font-medium pt-4 border-t">Image Details</h3>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://images.unsplash.com/..." {...field} />
                    </FormControl>
                     <FormDescription>
                      Use a high-quality image from a service like Unsplash.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A charming street with the school building." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is used for image alt text (accessibility).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image AI Hint</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., paris school" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide one or two keywords for AI image search.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add School"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
