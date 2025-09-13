"use client";

import { useState, useMemo, useTransition } from 'react';
import { jobs } from '@/lib/data';
import type { Job, TravelType } from '@/lib/types';
import { JobCard } from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Loader2 } from 'lucide-react';
import { enhanceSearchQuery } from './actions';

export default function JobsPage() {
  const [allJobs] = useState<Job[]>(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [enhancedSearchTerm, setEnhancedSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<TravelType | 'all'>('all');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      if (searchTerm.trim() === '') {
        setEnhancedSearchTerm('');
        return;
      }
      const result = await enhanceSearchQuery(searchTerm);
      setEnhancedSearchTerm(result.enhancedQuery);
    });
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesFilter =
        activeFilter === 'all' || job.travelType.includes(activeFilter);

      const searchKeywords = (enhancedSearchTerm || searchTerm)
        .toLowerCase()
        .split(/[\s,]+| or /)
        .filter(Boolean);

      const matchesSearch =
        searchKeywords.length === 0 ||
        searchKeywords.some((keyword) =>
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.location.toLowerCase().includes(keyword)
        );

      return matchesFilter && matchesSearch;
    });
  }, [allJobs, activeFilter, searchTerm, enhancedSearchTerm]);

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

      <div className="sticky top-16 bg-background/80 backdrop-blur-sm z-10 py-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4 max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by keyword, e.g., 'developer in Paris'"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5 md:hidden" />
            )}
            <span className="hidden md:inline">Search</span>
          </Button>
        </form>

        <Tabs
          value={activeFilter}
          onValueChange={(value) => setActiveFilter(value as TravelType | 'all')}
          className="flex justify-center"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="work">Work Travel</TabsTrigger>
            <TabsTrigger value="student">Student Travel</TabsTrigger>
            <TabsTrigger value="vacation">Vacation Travel</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isPending && (
          <div className="text-center text-muted-foreground">
              <p>Enhancing search with AI...</p>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
