import { destinations } from '@/lib/data';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedText } from '@/components/AnimatedText';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plane, Briefcase, HomeIcon, School, FileText } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Travel Processing',
    description: 'We help you process travel into Canada and Europe, whether for work, study, or relocation.',
  },
  {
    icon: Briefcase,
    title: 'Job Placement',
    description: 'We help secure jobs in European countries so you can start your new life employed.',
  },
  {
    icon: HomeIcon,
    title: 'Accommodation Assistance',
    description: 'We help process accommodation. We do not leave our clients stranded.',
  },
  {
    icon: FileText,
    title: 'Visa Processing',
    description: 'We help process Visas for a smooth and hassle-free experience.',
  },
  {
    icon: School,
    title: 'Study Applications',
    description: 'We are experts at Work/Study Visa and School applications.',
  },
]

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

      <section className="mb-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <Card key={index} className="bg-card/80 border-border/60 hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                    <service.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
           <div className="md:col-span-2 lg:col-span-1" />
            {services.slice(3, 5).map((service, index) => (
            <Card key={index} className="bg-card/80 border-border/60 hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                    <service.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
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
