
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
import { addBlogPost } from "../actions";
import { ImageUpload } from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().min(1, "Please upload an image for the cover."),
  imageDescription: z.string().optional(),
  imageHint: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300, "Excerpt cannot exceed 300 characters."),
  category: z.string().min(3, "Please select a category."),
  tags: z.string().optional(),
  authorName: z.string().optional(),
});

type BlogPostFormValues = z.infer<typeof formSchema>;

export default function AddBlogPostPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      imageDescription: "",
      imageHint: "",
      excerpt: "",
      category: "",
      tags: "",
      authorName: "",
    },
  });

  async function onSubmit(values: BlogPostFormValues) {
    setIsSubmitting(true);
    const result = await addBlogPost(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Post Created!",
        description: "Your new blog post has been saved successfully.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem saving the post.",
      });
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
            <Link href="/admin/blog">
                <ArrowLeft />
                <span className="sr-only">Back to Blog</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Fill out the form to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Trip to the Mountains" {...field} />
                    </FormControl>
                    <FormDescription>The slug will be automatically generated from this.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short summary of the post..." {...field} rows={3} />
                    </FormControl>
                     <FormDescription>
                      A brief summary of the post, used for previews.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your blog post here. Markdown is supported." {...field} rows={15} />
                    </FormControl>
                     <FormDescription>
                      The main content of your blog post. You can use Markdown for formatting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Travel Guides" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main category for this post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., mountains, hiking, nature" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of tags.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide an author name if the logged-in user is unavailable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input placeholder="e.g., A beautiful mountain range at sunset." {...field} />
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
                      <Input placeholder="e.g., mountain sunset" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide one or two keywords for AI image search if no image is uploaded.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
