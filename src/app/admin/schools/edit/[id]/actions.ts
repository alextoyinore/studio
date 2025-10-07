
"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { School } from "@/lib/types";

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

export async function getSchool(id: string): Promise<School | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from('schools').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching school:", error);
        return null;
    }
    return data as School;
}

export async function updateSchool(id: string, data: SchoolFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { name, location, country, description, imageUrl, imageDescription, imageHint } = parsedData.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { error } = await supabase.from("schools").update({
      name,
      location,
      country,
      description,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
    }).eq('id', id);

  if (error) {
    console.error("Error updating school:", error);
    return {
      success: false,
      message: "There was an error updating the school.",
    };
  }

  revalidatePath("/admin/schools");
  revalidatePath(`/schools/${id}`);

  return { success: true, message: "School updated successfully." };
}
