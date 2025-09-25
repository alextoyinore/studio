import { destinations } from '@/lib/data';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedText } from '@/components/AnimatedText';

export default function Home() {
  const featuredDestinations = destinations.slice(0, 6);
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Discover Your Next <AnimatedText />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore breathtaking destinations, find unique job opportunities, and expand your horizons with our curated schools and courses. Your adventure starts here.
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
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
