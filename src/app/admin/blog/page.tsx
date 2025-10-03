
import { createClient } from "@/lib/supabase/server";
import type { BlogPost, Profile } from "@/lib/types";
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

type BlogPostWithAuthor = Omit<BlogPost, 'author'> & {
    author: Profile | null;
}

async function getBlogPosts(): Promise<BlogPostWithAuthor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, author:profiles!blog_posts_author_fkey(email)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  
  // The query returns `author` as an object { email: string } but the type expects Profile.
  // We need to cast it correctly.
  return data.map(post => ({
      ...post,
      author: post.author as Profile | null,
  })) as BlogPostWithAuthor[];
}


export default async function AdminBlogPage() {
  const posts = await getBlogPosts();
  
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author?.email || 'N/A'}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell className="text-right">
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No posts added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing {posts.length} of {posts.length} posts.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
