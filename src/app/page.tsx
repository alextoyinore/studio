
import { destinations, jobs as mockJobs, schools as mockSchools } from '@/lib/data';
import { DestinationCard } from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedText } from '@/components/AnimatedText';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plane, Briefcase, HomeIcon, School, FileText, ArrowRight } from 'lucide-react';
import type { Job, School as SchoolType, BlogPost } from '@/lib/types';
import { JobCard } from '@/components/JobCard';
import { SchoolCard } from '@/components/SchoolCard';
import { BlogCard } from '@/components/BlogCard';
import { createClient } from '@/lib/supabase/server';

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

async function getFeaturedData() {
    const supabase = createClient();
    // For now, we will use mock data for jobs and schools and only fetch blog posts.
    // This avoids errors if the tables don't exist yet.
    const blogPromise = supabase.from('blog_posts').select('*').limit(3).order('created_at', { ascending: false });

    const [{ data: blogPosts, error: blogError }] = await Promise.all([blogPromise]);

    if(blogError) console.error("Error fetching blog posts:", blogError.message);

    return {
        jobs: (mockJobs.slice(0, 3) || []) as Job[],
        schools: (mockSchools.slice(0, 3) || []) as SchoolType[],
        blogPosts: (blogPosts || []) as BlogPost[]
    }
}


export default async function Home() {
  const featuredDestinations = destinations.slice(0, 3);
  const { jobs, schools, blogPosts } = await getFeaturedData();

  return (
    <div className="container mx-auto py-8 md:py-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
          {services.map((service, index) => (
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

      <section className="mb-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

       {jobs.length > 0 && (
        <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Jobs</h2>
                 <Button asChild variant="link">
                    <Link href="/jobs">View All <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
        </section>
      )}

      {schools.length > 0 && (
        <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Schools</h2>
                <Button asChild variant="link">
                    <Link href="/courses">View All <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {schools.map((school) => <SchoolCard key={school.id} school={school} />)}
            </div>
        </section>
      )}

       {blogPosts.length > 0 && (
        <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">From Our Blog</h2>
                <Button asChild variant="link">
                    <Link href="/blog">Read All <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
        </section>
      )}

    </div>
  );
}
