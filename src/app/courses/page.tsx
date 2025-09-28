
import { createClient } from '@/lib/supabase/server';
import type { School } from '@/lib/types';
import SchoolsClientPage from './SchoolsClientPage';

async function getSchools() {
  const supabase = createClient();
  const { data, error } = await supabase.from('schools').select('*').order('name', { ascending: true });

  if (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
  return data as School[];
}

export default async function SchoolsPage() {
  const allSchools = await getSchools();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
          Find Your School
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
          Browse our partner schools from around the world to find your perfect learning destination.
        </p>
      </section>

      <SchoolsClientPage allSchools={allSchools} />
    </div>
  );
}
