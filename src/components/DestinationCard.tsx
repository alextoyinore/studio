import type { Destination } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={destination.image.imageUrl}
          alt={destination.image.description}
          data-ai-hint={destination.image.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{destination.name}</CardTitle>
        <CardDescription>{destination.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Button asChild variant="link" className="p-0 justify-start -ml-1">
            <Link href="#">Explore {destination.name.split(',')[0]}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
