import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="section-container text-center space-y-8 max-w-md">
        <div>
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-dark-text mb-2">Page not found</h2>
          <p className="text-light-text">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/download" className="btn-secondary">
            Download app
          </Link>
          <Link href="/support" className="btn-text">
            Get help
          </Link>
        </div>
      </div>
    </div>
  );
}
