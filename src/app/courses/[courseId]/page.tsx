

import { createClient } from '@/lib/supabase/server';
import type { Course, School } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, School as SchoolIcon } from 'lucide-react';
import { Markdown } from '@/components/Markdown';

type CourseWithSchool = Course & {
    school: School | null;
}

async function getCourse(courseId: string): Promise<CourseWithSchool | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            schools (*)
        `)
        .eq('id', courseId)
        .single();
    
    if (error) {
        console.error('Error fetching course with school:', error);
        return null;
    }
    return data as CourseWithSchool;
}

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = await getCourse(params.courseId);

  if (!course) {
    notFound();
  }

  const school = course.school;
  const imageUrl = school?.image_url || `https://picsum.photos/seed/${course.id}/1200/400`;
  const imageDescription = school?.image_description || `Image for ${course.title}`;
  const imageHint = school?.image_hint || `school campus`;


  return (
    <div className="container mx-auto py-8 md:py-16">
      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
            <div className="relative h-64 md:h-80 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={imageUrl}
                    alt={imageDescription}
                    data-ai-hint={imageHint}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10 px-4">
                <h1 className="font-headline text-3xl md:text-5xl font-bold mb-3 tracking-tight text-white">
                    {course.title}
                </h1>
                 {school && (
                    <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                        <div className="flex items-center gap-2">
                            <SchoolIcon className="h-5 w-5" />
                            <Link href={`/schools/${school.id}`} className="hover:underline">{school.name}</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            <span>{school.location}, {school.country}</span>
                        </div>
                    </div>
                 )}
            </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
                 <Markdown content={course.description} />
            </div>
            <aside className="w-full md:w-72 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                    <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={course.enroll_url} target="_blank">Enroll Now</Link>
                    </Button>
                    <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                        <h3 className="font-semibold text-lg">Course Details</h3>
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="h-5 w-5 mr-3 text-accent" />
                            <span>{course.duration}</span>
                        </div>
                         {Array.isArray(course.travel_type) && course.travel_type.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="font-medium text-foreground">Relevant Travel Types</h4>
                                <div className="flex flex-wrap gap-2">
                                    {course.travel_type.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                        {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {school && (
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/schools/${school.id}`}>
                                    <SchoolIcon className="mr-2" />
                                    More from {school.name}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </aside>
        </div>
      </article>
    </div>
  );
}
