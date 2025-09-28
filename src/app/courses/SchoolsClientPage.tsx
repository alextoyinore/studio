"use client";

import { useState, useMemo } from 'react';
import type { School } from '@/lib/types';
import { SchoolCard } from '@/components/SchoolCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Region = 'all' | 'Europe' | 'North America' | 'Other';

export default function SchoolsClientPage({ allSchools }: { allSchools: School[] }) {
  const [activeFilter, setActiveFilter] = useState<Region>('all');

  const getRegion = (country: string): Region => {
    const europeCountries = ['France', 'Italy', 'Romania', 'United Kingdom', 'Netherlands', 'Luxembourg'];
    const northAmericaCountries = ['USA', 'Canada'];
    
    if (europeCountries.includes(country)) return 'Europe';
    if (northAmericaCountries.includes(country)) return 'North America';
    return 'Other';
  }

  const filteredSchools = useMemo(() => {
    if (activeFilter === 'all') {
      return allSchools;
    }
    return allSchools.filter((school) => getRegion(school.country) === activeFilter);
  }, [allSchools, activeFilter]);

  return (
    <>
      <div className="flex justify-center mb-8">
         <Tabs
          value={activeFilter}
          onValueChange={(value) => setActiveFilter(value as Region)}
          className="flex justify-center"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="North America">North America</TabsTrigger>
            <TabsTrigger value="Europe">Europe</TabsTrigger>
            <TabsTrigger value="Other">Other</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => <SchoolCard key={school.id} school={school} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No Schools Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
