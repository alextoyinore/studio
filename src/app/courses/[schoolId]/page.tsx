
import { schools } from '@/lib/data';
import type { School } from '@/lib/types';
import { CourseCard } from '@/components/CourseCard';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type SchoolPageParams = {
  params: {
    schoolId: string;
  };
};

export function generateStaticParams() {
  return schools.map((school) => ({
    schoolId: school.id,
  }));
}

export default function SchoolPage({ params }: SchoolPageParams) {
  const school = schools.find((s) => s.id === params.schoolId);

  if (!school) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
                src={school.image.imageUrl}
                alt={school.image.description}
                data-ai-hint={school.image.imageHint}
                fill
                className="object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10">
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-2 tracking-tight text-white">
                {school.name}
            </h1>
            <Badge variant="secondary">{school.location}</Badge>
            <p className="text-lg md:text-xl text-slate-200 mt-4">
                {school.description}
            </p>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
          Courses Offered
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {school.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </section>
    </div>
  );
}

