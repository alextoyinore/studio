"use server";

import * as z from "zod";
import { createClient } from "@/lib/supabase/server";

const formSchema = z.object({
  jobId: z.string().uuid(),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters.").optional(),
  resumeUrl: z.string().min(1, "Please upload your resume or CV."),
  hasPassport: z.enum(["yes", "no"]),
});

type ApplicationFormInput = z.infer<typeof formSchema>;

export async function submitApplication(data: ApplicationFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { jobId, fullName, email, phone, coverLetter, resumeUrl, hasPassport } = parsedData.data;

  const supabase = createClient();

  const { error } = await supabase.from("job_applications").insert([
    {
      job_id: jobId,
      full_name: fullName,
      email,
      phone,
      cover_letter: coverLetter,
      resume_url: resumeUrl,
      has_passport: hasPassport === 'yes',
    },
  ]);

  if (error) {
    console.error("Error saving job application:", error);
    return {
      success: false,
      message: "There was an error saving your application. Please try again.",
    };
  }

  return { success: true, message: "Application submitted successfully." };
}
