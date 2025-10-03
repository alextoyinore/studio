"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().min(1, "Please upload an image."),
  imageDescription: z.string().optional(),
  imageHint: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300, "Excerpt cannot exceed 300 characters."),
  category: z.string().min(3, "Please select a category."),
  tags: z.string().optional(),
});

type BlogPostFormInput = z.infer<typeof formSchema>;

export async function addBlogPost(data: BlogPostFormInput) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "Authentication error: User not found." };
  }

  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { title, content, imageUrl, imageDescription, imageHint, excerpt, category, tags } = parsedData.data;

  // Create a slug from the title
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const tagsArray = tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [];

  const { error } = await supabase.from("blog_posts").insert([
    {
      title,
      slug,
      content,
      author: user.id,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
      excerpt,
      category,
      tags: tagsArray,
    },
  ]);

  if (error) {
    console.error("Error saving blog post:", error);
    return {
      success: false,
      message: "There was an error saving the post. Please ensure the 'author' column in 'blog_posts' is of type UUID.",
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog"); // Revalidate public-facing blog page if it exists

  return { success: true, message: "Blog post created successfully." };
}
