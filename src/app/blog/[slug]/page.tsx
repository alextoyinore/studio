
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, UserCircle, Tag } from "lucide-react";
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
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10 px-4">
                {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
                <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                    {post.title}
                </h1>
            </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
                <Markdown content={post.content} />
            </div>

            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">About This Post</h3>
                    <div className="flex items-center text-muted-foreground">
                        <UserCircle className="h-5 w-5 mr-3 text-accent" />
                        <span>{authorName}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <Clock className="h-5 w-5 mr-3 text-accent" />
                        <span>{format(new Date(post.created_at), "MMMM d, yyyy")}</span>
                    </div>
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
