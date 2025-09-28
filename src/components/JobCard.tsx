import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DollarSign, MapPin } from 'lucide-react';

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  // The API can return either `travel_type` (from Supabase) or `travelType` (from local data).
  const travelTypes = job.travel_type || job.travelType || [];
  // The API can return either `apply_url` (from Supabase) or `applyUrl` (from local data).
  const applyUrl = job.apply_url || job.applyUrl;

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 text-accent" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-2 text-accent" />
          {job.salary}
        </div>
        <p className="text-sm text-foreground/80 line-clamp-3">{job.description}</p>
        <div className="flex flex-wrap gap-2">
            {travelTypes.map(type => (
                <Badge key={type} variant="secondary">{type}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={applyUrl || '#'}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
