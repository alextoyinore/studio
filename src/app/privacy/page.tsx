export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="lead text-muted-foreground">
          Your privacy is important to us. This policy explains how we collect, use, and share your information.
        </p>

        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, and any other information you choose to provide. We also collect anonymous data about your use of our services, such as your IP address, browser type, and pages visited.
        </p>
        
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, maintain, and improve our services.</li>
          <li>Communicate with you about products, services, offers, and events.</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
          <li>Personalize the services and provide advertisements, content, or features that match user profiles or interests.</li>
        </ul>
        
        <h2>3. Sharing of Information</h2>
        <p>
          We may share your information with third-party vendors and service providers that perform services on our behalf. We do not sell your personal information to third parties.
        </p>

        <h2>4. Your Choices</h2>
        <p>
            You have choices regarding your information. You can update your profile information at any time. You can also opt-out of receiving promotional emails from us by following the instructions in those emails.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@oceanictravels.com.
        </p>
        
        <p className="text-sm text-muted-foreground mt-12">
          This is a sample Privacy Policy. You should consult with a legal professional to ensure it meets your specific needs.
        </p>
      </div>
    </div>
  );
}
