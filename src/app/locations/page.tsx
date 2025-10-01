
import { createClient } from '@/lib/supabase/server';
import type { Location } from '@/lib/types';
import { LocationCard } from '@/components/LocationCard';

async function getLocations(): Promise<Location[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('locations').select('*').order('name', { ascending: true });

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
  return data as Location[];
}

export default async function LocationsPage() {
  const allLocations = await getLocations();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
          Explore Our Destinations
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
          From bustling cities to serene landscapes, discover the perfect backdrop for your next adventure.
        </p>
      </section>

      {allLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No Destinations Added Yet</h3>
            <p className="text-muted-foreground">
              Please check back later to see our amazing travel destinations.
            </p>
          </div>
      )}
    </div>
  );
}
