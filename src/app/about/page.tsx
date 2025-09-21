import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            About Oceanic Travels
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your passport to a world of adventure, opportunity, and learning.
          </p>
        </section>

        <section className="mb-12">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src="https://picsum.photos/seed/106/1200/400"
                    alt="Team of Oceanic Travels"
                    fill
                    data-ai-hint="team collaboration"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 p-8">
                    <h2 className="text-white font-headline text-3xl font-bold">Our Mission</h2>
                </div>
            </div>
             <div className="mt-6 text-foreground/90 space-y-4">
                <p>
                At Oceanic Travels, we believe that travel is more than just visiting new places; it's about experiencing the world in a meaningful way. Our mission is to connect adventurous souls with opportunities that enrich their lives, whether it's through a dream job in a foreign land, a course that expands their horizons, or a journey to a breathtaking destination.
                </p>
                <p>
                We were founded on the principle that everyone deserves the chance to explore their potential, and we are dedicated to making that a reality. By curating a selection of unique jobs, courses, and destinations, we empower our users to design a life they love, filled with discovery and personal growth.
                </p>
            </div>
        </section>

        <section>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">
                What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-semibold mb-2">Global Jobs</h3>
                    <p className="text-muted-foreground">Find work opportunities that take you around the globe. From tech to tourism, we connect you with employers who value a global perspective.</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-semibold mb-2">Curated Courses</h3>
                    <p className="text-muted-foreground">Learn a new skill or language with our selection of courses from partner institutions worldwide. Education is a journey, and we're your guide.</p>
                </div>
                 <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-semibold mb-2">Dream Destinations</h3>
                    <p className="text-muted-foreground">Explore our featured destinations, handpicked for their beauty, culture, and adventure. Your next story begins with a single step.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
