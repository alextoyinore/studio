import type { BlogPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';

type BlogCardFeaturedProps = {
  post: BlogPost;
};

export function BlogCardFeatured({ post }: BlogCardFeaturedProps) {
  return (
    <div className="relative rounded-lg overflow-hidden group shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="h-[500px]">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
            {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 max-w-2xl">{post.title}</h2>
          <p className="text-slate-300 mb-4 max-w-2xl hidden md:line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center text-sm gap-4">
            <span>By {post.author}</span>
            <span>&bull;</span>
            <time dateTime={post.created_at}>{format(new Date(post.created_at), 'MMMM d, yyyy')}</time>
          </div>
        </div>
      </Link>
    </div>
  );
}
