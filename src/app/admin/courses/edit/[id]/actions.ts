
"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Course } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  schoolId: z.string().uuid("Please select a valid school."),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  enrollUrl: z.string().url("Please enter a valid URL for the enrollment link."),
  travelType: z.string().min(3, "Please enter at least one travel type."),
});

type CourseFormInput = z.infer<typeof formSchema>;

export async function getCourse(id: string): Promise<Course | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();

    if (error) {
        console.error("Error fetching course:", error);
        return null;
    }
    return data as Course;
}

export async function updateCourse(id: string, data: CourseFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { title, schoolId, duration, description, enrollUrl, travelType } = parsedData.data;

  const travelTypeArray = travelType.split(',').map(item => item.trim()).filter(Boolean);

  const { error } = await supabase.from("courses").update({
      title,
      school_id: schoolId,
      duration,
      description,
      enroll_url: enrollUrl,
      travel_type: travelTypeArray,
    }).eq('id', id);

  if (error) {
    console.error("Error updating course:", error);
    return {
      success: false,
      message: "There was an error updating the course.",
    };
  }

  revalidatePath("/admin/courses");
  revalidatePath(`/courses/${id}`);

  return { success: true, message: "Course updated successfully." };
}
