
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, UserCircle, Tag, Folder } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import type { BlogPost } from "@/lib/types";

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }
  
  return data as BlogPost;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const authorName = post.author_name || 'Anonymous';

  return (
    <div className="container mx-auto py-8 md:py-16">
      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={post.image_url}
                    alt={post.image_description || post.title}
                    data-ai-hint={post.image_hint}
                    fill
                    className="object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
                <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-8 text-sm">
                    <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5" />
                        <span>{authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{format(new Date(post.created_at), "MMMM d, yyyy")}</span>
                    </div>
                    {post.category && (
                        <div className="flex items-center gap-2">
                            <Folder className="h-5 w-5" />
                            <span>{post.category}</span>
                        </div>
                    )}
                </div>

                <Markdown content={post.content} />
            </div>

            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg shadow-sm">
                     <h3 className="font-semibold text-lg">About This Post</h3>
                    
                     <div className="flex items-center text-muted-foreground">
                        <UserCircle className="h-5 w-5 mr-3 text-accent" />
                        <span>By {authorName}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <Clock className="h-5 w-5 mr-3 text-accent" />
                        <span>{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                    </div>

                    {post.category && (
                         <div className="space-y-3">
                            <div className="flex items-center text-muted-foreground">
                                <Folder className="h-5 w-5 mr-3 text-accent" />
                                <h4 className="font-medium text-foreground">Category</h4>
                            </div>
                            <Badge variant="outline">{post.category}</Badge>
                        </div>
                    )}

                    {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="space-y-3">
                             <div className="flex items-center text-muted-foreground">
                                <Tag className="h-5 w-5 mr-3 text-accent" />
                                <h4 className="font-medium text-foreground">Tags</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                {tag}
                                </Badge>
                            ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
      </article>
    </div>
  );
}
