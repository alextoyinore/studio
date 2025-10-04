
"use server";

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  schoolId: z.string().uuid("Please select a valid school."),
  duration: z.string().min(2, "Duration must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  enrollUrl: z.string().url("Please enter a valid URL for the enrollment link."),
  travelType: z.string().min(3, "Please enter at least one travel type."),
});

type CourseFormInput = z.infer<typeof formSchema>;

export async function addCourse(data: CourseFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { title, schoolId, duration, description, enrollUrl, travelType } = parsedData.data;

  const travelTypeArray = travelType.split(',').map(item => item.trim()).filter(Boolean);

  const { error } = await supabase.from("courses").insert([
    {
      title,
      school_id: schoolId,
      duration,
      description,
      enroll_url: enrollUrl,
      travel_type: travelTypeArray,
    },
  ]);

  if (error) {
    console.error("Error saving course:", error);
    return {
      success: false,
      message: "There was an error saving the course. Please check the database connection and table structure.",
    };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");

  return { success: true, message: "Course added successfully." };
}
