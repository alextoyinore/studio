import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2" />
            New Post
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Blog post management interface will be here.</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing 0 of 0 posts.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
