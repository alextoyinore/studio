import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SchoolCard } from '@/components/SchoolCard';
import { JobCard } from '@/components/JobCard';
import { CheckCircle, Info, Star } from 'lucide-react';
import type { Location, School, Job } from '@/lib/types';
import { Markdown } from '@/components/Markdown';

type LocationPageParams = {
  params: {
    locationId: string;
  };
};

type LocationWithRelations = Location & {
    schools: School[];
    jobs: Job[];
}

async function getLocation(locationId: string): Promise<LocationWithRelations | null> {
    const supabase = createClient();
    
    const { data: locationData, error: locationError } = await supabase
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .single();
    
    if (locationError || !locationData) {
        console.error("Error fetching location:", locationError);
        return null;
    }

    const countryName = locationData.name.split(',')[0].trim();

    const schoolsPromise = supabase
        .from('schools')
        .select('*, courses(*)')
        .ilike('country', `%${countryName}%`);

    const jobsPromise = supabase
        .from('jobs')
        .select('*')
        .ilike('location', `%${countryName}%`);
    
    const [
        { data: schoolsData, error: schoolsError },
        { data: jobsData, error: jobsError }
    ] = await Promise.all([schoolsPromise, jobsPromise]);


    if(schoolsError) console.error("Error fetching schools:", schoolsError);
    if(jobsError) console.error("Error fetching jobs:", jobsError);


    return {
        ...locationData,
        schools: (schoolsData as School[]) || [],
        jobs: (jobsData as Job[]) || [],
    };
}


export default async function LocationPage({ params }: LocationPageParams) {
  const location = await getLocation(params.locationId);

  if (!location) {
    notFound();
  }

  const { schools: relatedSchools, jobs: relatedJobs } = location;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <article className="max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={location.image_url}
              alt={location.image_description}
              data-ai-hint={location.image_hint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="relative -mt-20 md:-mt-24 max-w-4xl mx-auto text-center z-10 px-4">
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-2 tracking-tight text-white">
              {location.name}
            </h1>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
                 <Markdown content={location.description} />
                 
                {relatedSchools.length > 0 && (
                <section className="mt-16">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">
                    Top Schools in {location.name.split(',')[0]}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedSchools.map((school) => (
                        <SchoolCard key={school.id} school={school} />
                    ))}
                    </div>
                </section>
                )}

                {relatedJobs.length > 0 && (
                <section className="mt-16">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">
                    Job Opportunities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                    </div>
                </section>
                )}
            </div>

            <aside className="w-full md:w-72 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                    {location.attractions && Array.isArray(location.attractions) && location.attractions.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="text-accent"/>
                                    Top Attractions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {location.attractions.map((attraction) => (
                                        <Badge key={attraction} variant="secondary">
                                        {attraction}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="bg-card/50">
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="text-accent" />
                            General Visa Guidelines
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                        <p className="text-muted-foreground">
                            Visa requirements vary greatly depending on your nationality and the purpose of your visit.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>
                                <strong>Check Official Sources:</strong> Always consult the official embassy or consulate website of {location.name} in your country.
                            </span>
                            </li>
                            <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>
                                <strong>Apply in Advance:</strong> Visa processing can take several weeks or months.
                            </span>
                            </li>
                            <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>
                                <strong>Required Documents:</strong> Common documents include a valid passport, photos, proof of funds, and insurance.
                            </span>
                            </li>
                        </ul>
                        <p className="text-xs text-muted-foreground pt-4">
                            We strongly recommend verifying all details with official government sources.
                        </p>
                        </CardContent>
                    </Card>
                </div>
            </aside>
        </div>
      </article>
    </div>
  );
}
