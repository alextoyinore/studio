export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
        <p className="lead text-muted-foreground">
          Understanding how we use cookies to improve your experience.
        </p>

        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. What are cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.
        </p>
        
        <h2>2. How we use cookies</h2>
        <p>
          We use cookies for several purposes:
        </p>
        <ul>
          <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.</li>
          <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
          <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
        </ul>
        
        <h2>3. Managing Cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
        </p>

        <p className="text-sm text-muted-foreground mt-12">
          This is a sample Cookie Policy. You should consult with a legal professional to ensure it meets your specific needs.
        </p>
      </div>
    </div>
  );
}
