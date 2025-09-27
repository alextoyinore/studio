
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

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        return { success: false, message: authError.message };
    }

    if (authData.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({ id: authData.user.id, role: 'customer' });

        if (profileError) {
            // This is a tricky state. The user exists in auth, but not in profiles.
            // For now, we'll log the error and inform the user.
            // A more robust solution could involve a cleanup function.
            console.error('Error creating profile:', profileError);
            return { success: false, message: "Could not create user profile. Please contact support." };
        }
    }


    return { success: true, message: "Check your email for a confirmation link." };
}

export async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
}
