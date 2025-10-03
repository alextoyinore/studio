
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Job } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DollarSign, MapPin, Briefcase } from "lucide-react";
import { Markdown } from "@/components/Markdown";

async function getJob(jobId: string): Promise<Job | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single();

    if (error) {
        console.error("Error fetching job:", error);
        return null;
    }

    return data;
}

export default async function JobDetailsPage({ params }: { params: { jobId: string } }) {
    const job = await getJob(params.jobId);

    if (!job) {
        notFound();
    }

    const imageUrl = job.image_url || `https://picsum.photos/seed/${job.id}/1200/600`;
    const imageDescription = job.image_description || `Image for ${job.title}`;
    const imageHint = job.image_hint || `${job.company} office`;

    return (
        <div className="container mx-auto py-8 md:py-16">
            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <div className="relative h-64 md:h-80 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={imageUrl}
                            alt={imageDescription}
                            data-ai-hint={imageHint}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="relative -mt-20 md:-mt-24 max-w-3xl mx-auto text-center z-10 px-4">
                        <h1 className="font-headline text-3xl md:text-5xl font-bold mb-3 tracking-tight text-white">
                            {job.title}
                        </h1>
                        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                <span>{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                <span>{job.salary}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-grow">
                         <Markdown content={job.description} />
                    </div>
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                             <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                            </Button>
                            {job.travel_type && job.travel_type.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Relevant Travel Types</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {job.travel_type.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                        {tag}
                                        </Badge>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </article>
        </div>
    );
}
