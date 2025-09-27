import { createClient } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";

async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }

  return data;
}

export default async function AdminContactsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Here are the latest messages from your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submitted At</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      {format(
                        new Date(submission.created_at),
                        "MMM d, yyyy h:mm a"
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {submission.name}
                    </TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.subject}</TableCell>
                    <TableCell className="text-right max-w-xs truncate">
                      {submission.message}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No submissions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
