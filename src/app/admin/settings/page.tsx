import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";

async function getUserProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export default async function AdminSettingsPage() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>
            This is the information associated with your admin account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg">{profile.email}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p className="text-lg font-mono bg-muted/50 px-2 py-1 rounded-md self-start">{profile.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
