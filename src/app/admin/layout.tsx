import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Map, School, Briefcase, Pencil, Settings } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/locations', label: 'Locations', icon: Map },
    { href: '/admin/schools', label: 'Schools', icon: School },
    { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/admin/blog', label: 'Blog', icon: Pencil },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');

  if (authCookie?.value !== 'true') {
    return redirect('/login');
  }

  return (
      <SidebarProvider>
        <div className="flex h-screen w-full">
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
            </Sidebar>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
      </SidebarProvider>
  );
}
