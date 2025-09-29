import { createClient } from "@/lib/supabase/server";
import type { School } from "@/lib/types";
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

async function getSchools(): Promise<School[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching schools:", error);
    return [];
  }

  return data;
}


export default async function AdminSchoolsPage() {
  const schools = await getSchools();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Schools</h1>
        <Button asChild>
          <Link href="/admin/schools/new">
            <PlusCircle className="mr-2" />
            Add School
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.length > 0 ? (
                schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.location}</TableCell>
                    <TableCell>{school.country}</TableCell>
                    <TableCell className="text-right">
                      {format(new Date(school.created_at), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No schools added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">
             Showing {schools.length} of {schools.length} schools.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
