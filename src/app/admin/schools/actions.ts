"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  country: z.string().min(2, "Country must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().min(1, "Please upload an image."),
  imageDescription: z.string().min(5, "Image description must be at least 5 characters."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
});

type SchoolFormInput = z.infer<typeof formSchema>;

export async function addSchool(data: SchoolFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { name, location, country, description, imageUrl, imageDescription, imageHint } = parsedData.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { error } = await supabase.from("schools").insert([
    {
      name,
      location,
      country,
      description,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
    },
  ]);

  if (error) {
    console.error("Error saving school:", error);
    return {
      success: false,
      message: "There was an error saving the school. Please check the database connection and table structure.",
    };
  }

  revalidatePath("/admin/schools");
  revalidatePath("/courses");

  return { success: true, message: "School added successfully." };
}
