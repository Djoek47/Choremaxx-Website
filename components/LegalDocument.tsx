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
    <div style={{ background: '#FBF4EE', minHeight: '100vh' }}>
      <div className="container-page" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="flex flex-col gap-2 mb-10">
          <h1 style={{ color: '#2A1A12' }}>{title}</h1>
          {lastUpdated && (
            <p className="text-sm" style={{ color: '#8F7A6C' }}>Last updated: {lastUpdated}</p>
          )}
        </div>

        <div className="glass-card p-8 md:p-12 max-w-3xl legal-prose">
          {children}
        </div>
      </div>

      <style>{`
        .legal-prose {
          color: #5A4438;
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .legal-prose h2 {
          margin-top: 2em;
          margin-bottom: 0.6em;
          color: #2A1A12;
          font-size: 1.15rem;
          font-weight: 700;
        }
        .legal-prose h3 {
          margin-top: 1.4em;
          margin-bottom: 0.5em;
          color: #2A1A12;
          font-weight: 600;
        }
        .legal-prose p  { margin-bottom: 1em; }
        .legal-prose ul,
        .legal-prose ol { margin-bottom: 1em; padding-left: 1.5em; }
        .legal-prose li { margin-bottom: 0.5em; }
        .legal-prose strong { color: #2A1A12; font-weight: 600; }
        .legal-prose a {
          color: #D85A30;
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-prose a:hover { color: #A8411F; }
      `}</style>
    </div>
  );
}
