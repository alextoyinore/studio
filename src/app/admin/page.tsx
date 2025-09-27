import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Use the navigation on the left to manage your site's content.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
