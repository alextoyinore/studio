
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import * as z from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormInput = z.infer<typeof loginSchema>;
type SignupFormInput = z.infer<typeof signupSchema>;

export async function login(data: LoginFormInput) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { email, password } = parsedData.data;
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signup(data: SignupFormInput) {
    const parsedData = signupSchema.safeParse(data);

    if (!parsedData.success) {
        const issues = parsedData.error.issues.map(issue => issue.message).join(' ');
        return { success: false, message: `Invalid data provided: ${issues}` };
    }

    const { name, email, password } = parsedData.data;
    
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: name,
            }
        }
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: "Check your email for a confirmation link." };
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    redirect('/login');
}
