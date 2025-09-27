"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginFormInput = z.infer<typeof loginSchema>;

export async function login(data: LoginFormInput) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid data provided." };
  }

  const { username, password } = parsedData.data;

  // IMPORTANT: This is a hardcoded password for demonstration purposes.
  // In a real application, use a secure authentication system.
  if (username === "admin" && password === "password") {
    cookies().set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
  } else {
    return { success: false, message: "Invalid username or password." };
  }

  redirect("/admin");
}
