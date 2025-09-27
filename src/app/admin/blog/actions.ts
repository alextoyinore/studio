"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  author: z.string().min(2, "Author name must be at least 2 characters."),
  imageUrl: z.string().url("Please enter a valid URL for the image."),
});

type BlogPostFormInput = z.infer<typeof formSchema>;

export async function addBlogPost(data: BlogPostFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const supabase = createClient();
  
  const { title, content, author, imageUrl } = parsedData.data;

  // Create a slug from the title
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const { error } = await supabase.from("blog_posts").insert([
    {
      title,
      slug,
      content,
      author,
      image_url: imageUrl,
    },
  ]);

  if (error) {
    console.error("Error saving blog post:", error);
    return {
      success: false,
      message: "There was an error saving the post. Please check if the 'blog_posts' table exists in your database.",
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog"); // Revalidate public-facing blog page if it exists

  return { success: true, message: "Blog post created successfully." };
}
