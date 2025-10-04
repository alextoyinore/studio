

import type { Course, School } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { Markdown } from './Markdown';

type CourseCardProps = {
  course: Course;
  school?: School;
};

export function CourseCard({ course, school }: CourseCardProps) {
  const schoolName = school?.name || course.institution;
  const schoolLocation = school?.location || course.location;

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-xl">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </CardTitle>
        {schoolName && <CardDescription>{schoolName}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {schoolLocation && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            {schoolLocation}
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-accent" />
          {course.duration}
        </div>
        <div className="text-sm text-foreground/90 line-clamp-3">
            <Markdown content={course.description} />
        </div>
        <div className="flex flex-wrap gap-2">
            {Array.isArray(course.travel_type) && course.travel_type.map(type => (
                <Badge key={type} variant="secondary">{type}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={course.enroll_url} target="_blank">Enroll Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
