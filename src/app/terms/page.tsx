export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="lead text-muted-foreground">
          Please read these terms carefully before using our services.
        </p>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the services provided by Oceanic Agency, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
        </p>
        
        <h2>2. Description of Service</h2>
        <p>
          Oceanic Agency provides a platform for users to find job listings, educational courses, and travel destinations. We do not own or operate these third-party services and are not responsible for their quality or safety.
        </p>
        
        <h2>3. User Conduct</h2>
        <p>
          You agree not to use the service for any unlawful purpose or to engage in any conduct that could damage, disable, or impair the service. You are solely responsible for your interactions with other users and third-party providers.
        </p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
            Our service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted or error-free.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall Oceanic Agency be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service.
        </p>
        
        <p className="text-sm text-muted-foreground mt-12">
          This is a sample Terms of Service. You should consult with a legal professional to ensure it meets your specific needs.
        </p>
      </div>
    </div>
  );
}
