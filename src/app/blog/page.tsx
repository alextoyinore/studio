

import { createClient } from "@/lib/supabase/server";
import type { BlogPost, Profile } from "@/lib/types";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardFeatured } from "@/components/BlogCardFeatured";

type BlogPostWithAuthor = Omit<BlogPost, 'author'> & {
    profiles: Pick<Profile, 'email'> | null;
}

async function getBlogPosts(): Promise<BlogPostWithAuthor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  return data as BlogPostWithAuthor[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-muted-foreground">No posts have been published yet. Check back soon!</p>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="container mx-auto py-8 md:py-16">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          From Our Blog
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, stories, and advice on travel, work, and study from the Oceanic Agency team.
        </p>
      </section>

      {featuredPost && (
        <section className="mb-16">
            <BlogCardFeatured post={featuredPost} />
        </section>
      )}

      {otherPosts.length > 0 && (
         <section>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
                More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
      )}
    </div>
  );
}
    
    