
"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Job } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  salary: z.string().min(3, "Please provide a salary or range."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  applyUrl: z.string().url("Please enter a valid URL for the application link."),
  travelType: z.string().min(3, "Please select at least one travel type."),
  imageUrl: z.string().optional(),
  imageDescription: z.string().optional(),
  imageHint: z.string().optional(),
});

type JobFormInput = z.infer<typeof formSchema>;

export async function getJob(id: string): Promise<Job | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching job:", error);
        return null;
    }
    return data as Job;
}


export async function updateJob(id: string, data: JobFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { title, company, location, salary, description, applyUrl, travelType, imageUrl, imageDescription, imageHint } = parsedData.data;

  // Convert comma-separated string to array
  const travelTypeArray = travelType.split(',').map(item => item.trim());

  const { error } = await supabase.from("jobs").update({
      title,
      company,
      location,
      salary,
      description,
      apply_url: applyUrl,
      travel_type: travelTypeArray,
      image_url: imageUrl,
      image_description: imageDescription,
      image_hint: imageHint,
    }).eq('id', id);

  if (error) {
    console.error("Error updating job:", error);
    return {
      success: false,
      message: "There was an error updating the job.",
    };
  }

  revalidatePath("/admin/jobs");
  revalidatePath(`/jobs/${id}`);

  return { success: true, message: "Job updated successfully." };
}
