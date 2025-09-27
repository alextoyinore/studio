import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminSchoolsPage() {
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
          <p>School management interface will be here.</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing 0 of 0 schools.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
