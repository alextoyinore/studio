
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedText } from '@/components/AnimatedText';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plane, Briefcase, HomeIcon, School, FileText, ArrowRight, Quote } from 'lucide-react';
import type { Job, School as SchoolType, BlogPost, Location, Profile } from '@/lib/types';
import { JobCard } from '@/components/JobCard';
import { SchoolCard } from '@/components/SchoolCard';
import { BlogCard } from '@/components/BlogCard';
import { createClient } from '@/lib/supabase/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LocationCard } from '@/components/LocationCard';

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
];

const faqs = [
    {
        question: "What kind of visa assistance do you provide?",
        answer: "We offer comprehensive visa processing assistance for various countries, specializing in work, study, and relocation visas for Canada and Europe. Our team guides you through the entire application process, from documentation to submission."
    },
    {
        question: "How do you help with job placement?",
        answer: "We partner with a network of employers in several European countries to help our clients secure jobs before they relocate. We match your skills and experience with suitable opportunities to ensure you start your new life on the right foot."
    },
    {
        question: "Do you provide accommodation services?",
        answer: "Yes, we provide accommodation assistance to ensure our clients are not stranded upon arrival. We help you find suitable and safe housing options that fit your budget and preferences."
    }
];

const testimonials = [
    {
        quote: "Oceanic Agency made my dream of working in Europe a reality. Their team was professional, supportive, and handled my visa and job placement with incredible efficiency. I couldn't have done it without them!",
        author: "Samuel L.",
        location: "Software Engineer in Luxembourg"
    },
    {
        quote: "The accommodation assistance was a lifesaver! I arrived in Canada with a safe and comfortable place to stay, all thanks to their dedicated team. It made my transition as a student so much smoother.",
        author: "Fatima A.",
        location: "Student in Toronto"
    },
    {
        quote: "I was overwhelmed with the visa paperwork, but Oceanic Agency simplified everything. They were patient, clear, and guided me every step of the way. Highly recommended for anyone looking to relocate.",
        author: "David C.",
        location: "Marketing Manager in Italy"
    }
]

type BlogPostWithAuthor = Omit<BlogPost, 'author'> & {
    profiles: Pick<Profile, 'email'> | null;
}

async function getFeaturedData() {
    const supabase = createClient();
    
    const jobsPromise = supabase.from('jobs').select('*').limit(3).order('created_at', { ascending: false });
    const schoolsPromise = supabase.from('schools').select('*, courses(*)').limit(3).order('created_at', { ascending: false });
    const blogPromise = supabase.from('blog_posts').select('*, profiles(email)').limit(3).order('created_at', { ascending: false });
    const locationsPromise = supabase.from('locations').select('*').limit(3).order('created_at', { ascending: false });

    const [
        { data: jobs, error: jobsError },
        { data: schools, error: schoolsError },
        { data: blogPosts, error: blogError },
        { data: locations, error: locationsError }
    ] = await Promise.all([jobsPromise, schoolsPromise, blogPromise, locationsPromise]);

    if(jobsError) console.error("Error fetching jobs:", jobsError.message)
    if(schoolsError) console.error("Error fetching schools:", schoolsError.message)
    if(blogError) console.error("Error fetching blog posts:", blogError.message)
    if(locationsError) console.error("Error fetching locations:", locationsError.message)

    return {
        jobs: (jobs || []) as Job[],
        schools: (schools || []) as SchoolType[],
        blogPosts: (blogPosts || []) as BlogPostWithAuthor[],
        locations: (locations || []) as Location[]
    }
}


export default async function Home() {
  const { jobs, schools, blogPosts, locations } = await getFeaturedData();

  return (
    <div className="container mx-auto py-8 md:py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Discover Your Next <AnimatedText />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore breathtaking destinations, find unique job opportunities, and obtain your degree or post-grad with our curated schools applications support. Find job support with our courses. Your adventure starts here.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/jobs">Find Jobs</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/courses">Explore Schools</Link>
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

      {locations.length > 0 && (
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Destinations</h2>
            <Button asChild variant="link">
                <Link href="/locations">View All <ArrowRight className="ml-2"/></Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </section>
      )}

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

        <section className="mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card/80 border-border/60">
                        <CardContent className="pt-6">
                            <Quote className="w-8 h-8 text-accent mb-4" />
                            <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                            <div className="font-semibold">{testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>


        <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-headline text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
             <div className="text-center mt-8">
                <Button asChild variant="link">
                    <Link href="/faq">View All FAQs <ArrowRight className="ml-2"/></Link>
                </Button>
            </div>
        </section>
    </div>
  );
}

