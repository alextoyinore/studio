"use server";

import * as z from "zod";

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

  // In a real application, you would save this data to a database,
  // send an email, or trigger a workflow.
  // For now, we'll just log it to the console.
  console.log("New contact form submission:", parsedData.data);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Form submitted successfully." };
}
