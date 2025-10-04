
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { login, signup } from "./actions";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signupSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;


export default function LoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  
  // This effect will re-validate the form when the user toggles between sign up and login
  React.useEffect(() => {
    form.trigger();
  }, [isSignUp, form]);

  async function onSubmit(values: SignupFormValues | LoginFormValues) {
    setIsSubmitting(true);
    
    if (isSignUp) {
      const result = await signup(values as SignupFormValues);
       if (result.success) {
        toast({
            title: "Account Created!",
            description: result.message,
        });
        setIsSignUp(false); // Switch back to login view
        form.reset();
      } else {
        toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: result.message,
        });
      }
    } else {
      const result = await login(values as LoginFormValues);
      if (result?.success === false) {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: result.message,
        });
      }
      // On login success, the action handles the redirect
    }

    setIsSubmitting(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{isSignUp ? "Create Account" : "Login"}</CardTitle>
          <CardDescription>{isSignUp ? "Enter your details to create a new account." : "Enter your credentials to access your account."}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               {isSignUp && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  isSignUp ? "Sign Up" : "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <Button variant="link" className="p-1" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Sign In" : "Sign Up"}
                </Button>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
