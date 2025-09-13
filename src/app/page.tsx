import { destinations } from '@/lib/data';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Discover Your Next Journey
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore breathtaking destinations, find unique job opportunities, and expand your horizons with our curated courses. Your adventure starts here.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/jobs">Find Jobs</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
