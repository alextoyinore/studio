
"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Location } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().min(1, "Please upload an image."),
  imageDescription: z.string().min(5),
  imageHint: z.string().min(2),
  attractions: z.string().min(3),
});

type LocationFormInput = z.infer<typeof formSchema>;


export async function getLocation(id: string): Promise<Location | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from('locations').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching location:", error);
        return null;
    }
    return data as Location;
}

export async function updateLocation(id: string, data: LocationFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { name, description, imageUrl, imageDescription, imageHint, attractions } = parsedData.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const attractionsArray = attractions.split(',').map(item => item.trim()).filter(Boolean);

  const { error } = await supabase.from("locations").update({
      name,
      description,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
      attractions: attractionsArray,
    }).eq('id', id);

  if (error) {
    console.error("Error updating location:", error);
    return {
      success: false,
      message: "There was an error updating the location.",
    };
  }

  revalidatePath("/admin/locations");
  revalidatePath(`/locations/${id}`);

  return { success: true, message: "Location updated successfully." };
}
