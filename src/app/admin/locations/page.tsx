import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLocationsPage() {
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
          <p>Location management interface will be here.</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing 0 of 0 locations.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
