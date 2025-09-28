
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

const fullFaqList = [
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
    },
    {
        question: "What countries do you primarily focus on?",
        answer: "Our primary focus is on Canada and several countries in Europe, including Luxembourg, Italy, Romania, the UK, and the Netherlands. However, we are constantly expanding our network, so please contact us for specific inquiries."
    },
    {
        question: "How long does the visa application process take?",
        answer: "The processing time varies greatly depending on the country, visa type, and individual circumstances. It can range from a few weeks to several months. We always advise starting the process as early as possible."
    },
    {
        question: "Are your services guaranteed?",
        answer: "While we have a high success rate and provide expert guidance, the final decision for all visa and job applications rests with the respective government authorities and employers. We guarantee our full support and expertise throughout the process."
    },
    {
        question: "What are your service fees?",
        answer: "Our fees vary depending on the services you require. We offer a transparent fee structure and will provide you with a detailed quote after an initial consultation. Please <Link href='/contact' className='text-primary underline'>contact us</Link> for more information."
    }
];


export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Find answers to common questions about our services.
          </p>
        </section>

        <section>
             <Accordion type="single" collapsible className="w-full">
                {fullFaqList.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
      </div>
    </div>
  );
}
