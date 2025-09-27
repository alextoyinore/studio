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

async function getUser(): Promise<SupabaseUser | null> {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data.user;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
      <SidebarProvider>
        <div className="flex h-screen bg-background">
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
                                    <span>Admin Profile</span>
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
