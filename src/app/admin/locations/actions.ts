"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().min(1, "Please upload an image."),
  imageDescription: z.string().min(5),
  imageHint: z.string().min(2),
  attractions: z.string().min(3),
});

type LocationFormInput = z.infer<typeof formSchema>;

export async function addLocation(data: LocationFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { name, description, imageUrl, imageDescription, imageHint, attractions } = parsedData.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // Split attractions string into an array
  const attractionsArray = attractions.split(',').map(item => item.trim()).filter(Boolean);

  const { error } = await supabase.from("locations").insert([
    {
      name,
      description,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
      attractions: attractionsArray,
    },
  ]);

  if (error) {
    console.error("Error saving location:", error);
    return {
      success: false,
      message: "There was an error saving the location. Please check the database connection and table structure.",
    };
  }

  // Revalidate the locations page to show the new data
  revalidatePath("/admin/locations");
  revalidatePath("/destinations"); // Also revalidate public destinations page if it uses this data

  return { success: true, message: "Location added successfully." };
}
