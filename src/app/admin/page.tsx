import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, BookOpen, Map, School, Pencil, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
    const supabase = createClient();

    const counts = [
        supabase.from("locations").select('*', { count: 'exact', head: true }),
        supabase.from("schools").select('*', { count: 'exact', head: true }),
        supabase.from("courses").select('*', { count: 'exact', head: true }),
        supabase.from("jobs").select('*', { count: 'exact', head: true }),
        supabase.from("blog_posts").select('*', { count: 'exact', head: true }),
        supabase.from("contacts").select('*', { count: 'exact', head: true }),
    ];

    const [
        { count: locationsCount },
        { count: schoolsCount },
        { count: coursesCount },
        { count: jobsCount },
        { count: blogCount },
        { count: contactsCount },
    ] = await Promise.all(counts.map(p => p.then(res => ({ count: res.count ?? 0 }))));

    return [
        { title: "Locations", count: locationsCount, icon: Map, href: "/admin/locations" },
        { title: "Schools", count: schoolsCount, icon: School, href: "/admin/schools" },
        { title: "Courses", count: coursesCount, icon: BookOpen, href: "/admin/courses" },
        { title: "Jobs", count: jobsCount, icon: Briefcase, href: "/admin/jobs" },
        { title: "Blog Posts", count: blogCount, icon: Pencil, href: "/admin/blog" },
        { title: "Contacts", count: contactsCount, icon: Mail, href: "/admin/contacts" },
    ];
}

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
             <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <Link href={stat.href}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.count}</div>
                        <p className="text-xs text-muted-foreground pt-2 flex items-center">
                            Manage {stat.title} <ArrowRight className="ml-1 h-3 w-3" />
                        </p>
                    </CardContent>
                </Link>
            </Card>
        ))}
      </div>
    </div>
  );
}
