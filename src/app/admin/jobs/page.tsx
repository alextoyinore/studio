
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
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
import { DeleteJobButton } from "@/components/admin/jobs/DeleteJobButton";

async function getJobs(): Promise<Job[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return data;
}

export default async function AdminJobsPage() {
  const jobs = await getJobs();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Button asChild>
          <Link href="/admin/jobs/new">
            <PlusCircle className="mr-2" />
            Post Job
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      {format(new Date(job.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin/jobs/edit/${job.id}`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                        </Button>
                        <DeleteJobButton jobId={job.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No jobs posted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Showing {jobs.length} of {jobs.length} jobs.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
