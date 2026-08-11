import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-page text-center flex flex-col items-center gap-6 max-w-md">
        <div>
          <h1
            className="mb-3"
            style={{
              fontSize: '4.5rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            404
          </h1>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Page not found
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/support" className="btn-ghost">
            Get help
          </Link>
        </div>
      </div>
    </div>
  );
}
