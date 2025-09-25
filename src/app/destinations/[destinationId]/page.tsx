import { destinations, schools, jobs } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SchoolCard } from '@/components/SchoolCard';
import { JobCard } from '@/components/JobCard';
import { CheckCircle, Info } from 'lucide-react';

type DestinationPageParams = {
  params: {
    destinationId: string;
  };
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    destinationId: destination.id,
  }));
}

export default function DestinationPage({ params }: DestinationPageParams) {
  const destination = destinations.find((d) => d.id === params.destinationId);

  if (!destination) {
    notFound();
  }

  const relatedSchools = schools.filter(school => school.country.toLowerCase() === destination.name.toLowerCase());
  const relatedJobs = jobs.filter(job => job.location.toLowerCase().includes(destination.name.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={destination.image.imageUrl}
            alt={destination.image.description}
            data-ai-hint={destination.image.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-2 tracking-tight text-white">
            {destination.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mt-4">
            {destination.description}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto">
        <section className="mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
                Top Attractions
            </h2>
             <div className="flex flex-wrap justify-center gap-4">
                {destination.attractions.map((attraction) => (
                    <Badge key={attraction} variant="secondary" className="text-base px-4 py-2">
                       {attraction}
                    </Badge>
                ))}
            </div>
        </section>


        {relatedSchools.length > 0 && (
          <section className="mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
              Top Schools in {destination.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          </section>
        )}

        {relatedJobs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
              Job Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
            Visa Information
          </h2>
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="text-accent" />
                General Visa Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Visa requirements vary greatly depending on your nationality, the purpose of your visit, and the duration of your stay. The information below is a general guide and should not be considered legal advice.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-1 shrink-0" />
                  <span>
                    <strong>Check Official Sources:</strong> Always consult the official embassy or consulate website of {destination.name} in your country for the most accurate and up-to-date information.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-1 shrink-0" />
                  <span>
                    <strong>Apply in Advance:</strong> Visa processing can take several weeks or even months, so it is crucial to start your application well in advance of your planned travel dates.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-1 shrink-0" />
                   <span>
                    <strong>Required Documents:</strong> Common documents include a valid passport, application forms, passport-sized photos, proof of financial means, travel itinerary, and health insurance. Specific requirements will vary.
                  </span>
                </li>
              </ul>
               <p className="text-sm text-muted-foreground pt-4">
                We strongly recommend verifying all details with official government sources before making any travel arrangements.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
