

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, UserCircle } from "lucide-react";
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

  const authorName = post.author_email || 'Anonymous';

  return (
    <div className="container mx-auto py-8 md:py-16">
      <article className="max-w-4xl mx-auto">
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
            <div className="relative -mt-20 md:-mt-24 max-w-3xl mx-auto text-center z-10 px-4">
                {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
                <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                    {post.title}
                </h1>
                <div className="flex justify-center items-center gap-6 text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5" />
                        <span>{authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{format(new Date(post.created_at), "MMMM d, yyyy")}</span>
                    </div>
                </div>
            </div>
        </header>

        <Markdown content={post.content} />

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
    
    
