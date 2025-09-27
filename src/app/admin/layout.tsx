import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Home, Map, School, Briefcase, Pencil, Settings, User, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/locations', label: 'Locations', icon: Map },
    { href: '/admin/schools', label: 'Schools', icon: School },
    { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/admin/blog', label: 'Blog', icon: Pencil },
    { href: '/admin/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

async function getUser(): Promise<{ user: SupabaseUser | null, profile: any | null }> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, profile: null };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    
    return { user, profile };
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getUser();

  if (!user) {
    return redirect('/login');
  }

  // Temporary debugging block
  if (!profile || !['superadmin', 'admin', 'staff'].includes(profile.role)) {
    return (
        <div className="w-full min-h-screen bg-background flex items-center justify-center">
            <div className="bg-card p-8 rounded-lg shadow-lg border max-w-2xl text-card-foreground">
                <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
                <p className="text-muted-foreground mb-6">You are being redirected. Here is the profile data we found for your user. If "profile" is null, it means no matching record was found in the 'profiles' table for your user ID.</p>
                <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto text-sm">
                    <code>
                        {JSON.stringify({ user, profile }, null, 2)}
                    </code>
                </pre>
                <div className="mt-6">
                    <p className="font-semibold">User ID:</p>
                    <p className="text-sm text-muted-foreground break-all">{user?.id}</p>
                </div>
                <div className="mt-4">
                    <p className="font-semibold">Profile Role Found:</p>
                    <p className="text-sm text-muted-foreground">{profile?.role || 'No role found'}</p>
                </div>
                 <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                    <p><strong>Next Steps:</strong></p>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Verify the User ID above matches the `id` in your `profiles` table exactly.</li>
                        <li>Ensure the `role` in your `profiles` table is one of: `superadmin`, `admin`, or `staff`.</li>
                         <li>Check that you have disabled Row Level Security (RLS) on the `profiles` table for now.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
  }

  const allowedRoles = ['superadmin', 'admin', 'staff'];
  if (!profile || !allowedRoles.includes(profile.role)) {
    return redirect('/');
  }

  return (
      <SidebarProvider>
        <div className="flex h-screen">
            <Sidebar>
                <SidebarHeader>
                    <h2 className="text-xl font-bold p-2">Admin Panel</h2>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {adminNavItems.map(item => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                 <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <ArrowLeft />
                                    <span>Back to Site</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/admin/settings">
                                    <User />
                                    <span>{profile.email}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
      </SidebarProvider>
  );
}
