"use client";

import { useState, useMemo } from 'react';
import { courses } from '@/lib/data';
import type { Course, TravelType } from '@/lib/types';
import { CourseCard } from '@/components/CourseCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CoursesPage() {
  const [allCourses] = useState<Course[]>(courses);
  const [activeFilter, setActiveFilter] = useState<TravelType | 'all'>('all');

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') {
      return allCourses;
    }
    return allCourses.filter((course) => course.travelType.includes(activeFilter));
  }, [allCourses, activeFilter]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
          Expand Your Horizons
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
          Discover courses that blend education with adventure, tailored to your travel style.
        </p>
      </section>

      <div className="flex justify-center mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
