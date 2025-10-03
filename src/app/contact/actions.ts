"use server";

import * as z from "zod";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10).max(1000),
});

type ContactFormInput = z.infer<typeof formSchema>;

export async function submitContactForm(data: ContactFormInput) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("contacts").insert([parsedData.data]);

  if (error) {
    console.error("Error saving contact form submission:", error);
    return {
      success: false,
      message: "There was an error saving your message. Please try again.",
    };
  }


  return { success: true, message: "Form submitted successfully." };
}
