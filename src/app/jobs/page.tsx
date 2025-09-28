
import { createClient } from '@/lib/supabase/server';
import type { Job } from '@/lib/types';
import JobsClientPage from './JobsClientPage';

async function getJobs() {
  const supabase = createClient();
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
  return data as Job[];
}

export default async function JobsPage() {
  const allJobs = await getJobs();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
          Find Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
          Search for jobs around the world, enhanced by AI to match your skills and passions.
        </p>
      </section>

      <JobsClientPage allJobs={allJobs} />
    </div>
  );
}
