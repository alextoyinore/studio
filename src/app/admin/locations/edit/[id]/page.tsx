
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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLocation, updateLocation } from "./actions";
import { ImageUpload } from "@/components/ImageUpload";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().min(1, "Please upload an image."),
  imageDescription: z.string().min(5, "Image description must be at least 5 characters."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
  attractions: z.string().min(3, "Please list at least one attraction, separated by commas."),
});

type LocationFormValues = z.infer<typeof formSchema>;

export default function EditLocationPage({ params }: { params: { id: string } }) {
  const { id } = use(params);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      imageDescription: "",
      imageHint: "",
      attractions: "",
    },
  });

  useEffect(() => {
    async function fetchLocation() {
        const location = await getLocation(id);
        if (location) {
            form.reset({
                ...location,
                imageUrl: location.image_url,
                imageDescription: location.image_description,
                imageHint: location.image_hint,
                attractions: Array.isArray(location.attractions) ? location.attractions.join(', ') : '',
            });
        } else {
            toast({
                variant: "destructive",
                title: "Location not found",
            });
        }
        setIsLoading(false);
    }
    fetchLocation();
  }, [id, form, toast]);

  async function onSubmit(values: LocationFormValues) {
    setIsSubmitting(true);
    const result = await updateLocation(id, values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Location Updated!",
        description: "The location has been updated successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem saving the location.",
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
            <Link href="/admin/locations">
                <ArrowLeft />
                <span className="sr-only">Back to Locations</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Location</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>Update the details for this destination.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris, France" {...field} />
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
                      <Textarea placeholder="A short, catchy description of the location." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="attractions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top Attractions</FormLabel>
                    <FormControl>
                      <Input placeholder="Eiffel Tower, The Louvre, Notre-Dame Cathedral" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide a comma-separated list of attractions.
                    </FormDescription>
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
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} />
                    </FormControl>
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
                      <Input placeholder="e.g., A beautiful shot of the Eiffel Tower at sunset." {...field} />
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
                      <Input placeholder="e.g., paris eiffel" {...field} />
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
