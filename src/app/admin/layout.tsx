import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar';
import { Home, Map, School, Briefcase, Pencil, Settings, User, ArrowLeft, Mail, LogOut } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { logout } from '@/app/login/actions';

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
  
  const allowedRoles = ['superadmin', 'admin', 'staff'];
  if (!profile || !allowedRoles.includes(profile.role)) {
    return redirect('/');
  }

  return (
      <SidebarProvider>
        <div className="flex w-full h-screen">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User />
                                    <span>{profile.email}</span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                                <DropdownMenuItem asChild>
                                     <Link href="/admin/settings">
                                        <Settings className="mr-2" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                     <form action={logout}>
                                        <button type="submit" className="w-full flex items-center">
                                            <LogOut className="mr-2" />
                                            <span>Logout</span>
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-4 mt-4 md:p-8 overflow-y-auto">
                 <header className="flex items-center gap-4 p-4 bg-background border-b md:hidden -mx-4 -mt-4 mb-4 sticky top-0 z-30">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                </header>
                {children}
            </main>
        </div>
      </SidebarProvider>
  );
}