
import type { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { Markdown } from './Markdown';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
        <CardDescription>{course.institution}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 text-accent" />
          {course.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-accent" />
          {course.duration}
        </div>
        <Markdown content={course.description} className="text-sm" />
        <div className="flex flex-wrap gap-2">
            {course.travel_type.map(type => (
                <Badge key={type} variant="secondary">{type}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={course.enroll_url}>Enroll Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
