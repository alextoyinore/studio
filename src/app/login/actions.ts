
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormInput = z.infer<typeof loginSchema>;

export async function login(data: LoginFormInput) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { email, password } = parsedData.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/admin");
}

export async function signup(data: LoginFormInput) {
    const parsedData = loginSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, message: "Invalid data provided." };
    }

    const { email, password } = parsedData.data;
    const supabase = createClient();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        return { success: false, message: signUpError.message };
    }

    if (signUpData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({ 
            id: signUpData.user.id, 
            email: signUpData.user.email,
            role: 'user'
        });

        if (profileError) {
             // If creating a profile fails, it's good practice to also delete the user
             // to avoid orphaned auth entries. Or at least log this properly.
             await supabase.auth.admin.deleteUser(signUpData.user.id);
             console.error('Error creating profile, rolling back user creation:', profileError);
             return { success: false, message: "An unexpected error occurred during signup. Please try again." };
        }
    }


    return { success: true, message: "Check your email for a confirmation link." };
}

export async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
}
