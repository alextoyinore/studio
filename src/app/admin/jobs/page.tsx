import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminJobsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Button>
          <PlusCircle className="mr-2" />
          Post Job
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Job posting management interface will be here.</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing 0 of 0 jobs.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
