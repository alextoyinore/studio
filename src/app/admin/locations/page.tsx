
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Location } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";

async function getLocations(): Promise<Location[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching locations:", error);
    return [];
  }

  return data;
}

export default async function AdminLocationsPage() {
  const locations = await getLocations();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Locations</h1>
        <Button asChild>
          <Link href="/admin/locations/new">
            <PlusCircle className="mr-2" />
            Add Location
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.length > 0 ? (
                locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell className="max-w-sm truncate">{location.description}</TableCell>
                    <TableCell>
                      {format(new Date(location.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin/locations/edit/${location.id}`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No locations added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Showing {locations.length} of {locations.length} locations.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
