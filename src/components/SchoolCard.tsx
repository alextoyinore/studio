import type { School } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

type SchoolCardProps = {
  school: School;
};

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full">
            <Image
                src={school.image_url}
                alt={school.image_description}
                data-ai-hint={school.image_hint}
                fill
                className="object-cover"
            />
        </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{school.name}</CardTitle>
        <CardDescription>{school.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-3">{school.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={`/courses/${school.id}`}>View School</Link>
        </Button>
         {school.courses && school.courses.length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground ml-4">
            <BookOpen className="h-4 w-4 mr-2" />
            {school.courses.length} {school.courses.length === 1 ? 'course' : 'courses'}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}