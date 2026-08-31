export default function LegalDocument({
  children,
  title,
  lastUpdated,
}: {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}) {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container-page" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="flex flex-col gap-2 mb-10">
          <h1 style={{ color: 'var(--color-text-primary)' }}>{title}</h1>
          {lastUpdated && (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Last updated: {lastUpdated}</p>
          )}
        </div>

        <div className="glass-card p-8 md:p-12 max-w-3xl legal-prose">
          {children}
        </div>
      </div>

      <style>{`
        .legal-prose {
          color: var(--color-text-secondary);
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .legal-prose h2 {
          margin-top: 2em;
          margin-bottom: 0.6em;
          color: var(--color-text-primary);
          font-size: 1.15rem;
          font-weight: 700;
        }
        .legal-prose h3 {
          margin-top: 1.4em;
          margin-bottom: 0.5em;
          color: var(--color-text-primary);
          font-weight: 600;
        }
        .legal-prose p  { margin-bottom: 1em; }
        .legal-prose ul,
        .legal-prose ol { margin-bottom: 1em; padding-left: 1.5em; }
        .legal-prose li { margin-bottom: 0.5em; }
        .legal-prose strong { color: var(--color-text-primary); font-weight: 600; }
        .legal-prose a {
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-prose a:hover { color: var(--color-primary-dark); }
      `}</style>
    </div>
  );
}
