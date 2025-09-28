import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, UserCircle } from 'lucide-react';
import { Badge } from './ui/badge';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader>
        {post.category && <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>}
        <CardTitle className="font-headline text-xl leading-tight">
           <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <time dateTime={post.created_at}>{format(new Date(post.created_at), 'MMM d, yyyy')}</time>
        </div>
      </CardFooter>
    </Card>
  );
}