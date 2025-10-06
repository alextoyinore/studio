

import { createClient } from '@/lib/supabase/server';
import type { School } from '@/lib/types';
import { CourseCard } from '@/components/CourseCard';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MapPin } from 'lucide-react';
import { Markdown } from '@/components/Markdown';

type SchoolPageParams = {
  params: {
    schoolId: string;
  };
};

async function getSchool(schoolId: string): Promise<School | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('schools')
        .select(`
            *,
            courses (*)
        `)
        .eq('id', schoolId)
        .single();
    
    if (error) {
        console.error('Error fetching school with courses:', error);
        return null;
    }
    return data as School;
}

export default async function SchoolPage({ params }: SchoolPageParams) {
  const school = await getSchool(params.schoolId);

  if (!school) {
    notFound();
  }

  const courses = school.courses || [];

  return (
    <div className="container mx-auto py-8 md:py-16">
      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
            <div className="relative h-64 md:h-80 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={school.image_url}
                    alt={school.image_description}
                    data-ai-hint={school.image_hint}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10 px-4">
                <h1 className="font-headline text-3xl md:text-5xl font-bold mb-3 tracking-tight text-white">
                    {school.name}
                </h1>
                 <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>{school.location}, {school.country}</span>
                    </div>
                </div>
            </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
                 <Markdown content={school.description} />
            </div>
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">School Details</h3>
                     {courses.length > 0 && (
                        <div className="flex items-center text-muted-foreground">
                            <BookOpen className="h-5 w-5 mr-3 text-accent" />
                            <span>{courses.length} {courses.length === 1 ? 'course' : 'courses'} available</span>
                        </div>
                    )}
                    <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-5 w-5 mr-3 text-accent" />
                        <span>{school.location}, {school.country}</span>
                    </div>
                </div>
            </aside>
        </div>

        {courses.length > 0 && (
            <section className="mt-16">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
                Courses Offered at {school.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>
        )}

        {courses.length === 0 && (
             <div className="text-center py-16 mt-8 border-t">
                <h3 className="text-2xl font-semibold mb-2">No Courses Found</h3>
                <p className="text-muted-foreground">
                    This school has not listed any courses yet. Please check back soon!
                </p>
            </div>
        )}
      </article>
    </div>
  );
}
