import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";

type CourseWithSchool = Course & {
    schools: { name: string } | null;
}

async function getCourses(): Promise<CourseWithSchool[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*, schools(name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  return data as CourseWithSchool[];
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <PlusCircle className="mr-2" />
            Add Course
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.schools?.name || 'N/A'}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell className="text-right">
                      {format(new Date(course.created_at), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No courses added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Showing {courses.length} of {courses.length} courses.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
