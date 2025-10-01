
import type { Location } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={location.image_url}
          alt={location.image_description}
          data-ai-hint={location.image_hint}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{location.name}</CardTitle>
        <CardDescription className="line-clamp-2">{location.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Button asChild variant="link" className="p-0 justify-start -ml-1">
            <Link href={`/locations/${location.id}`}>Explore {location.name.split(',')[0]}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
