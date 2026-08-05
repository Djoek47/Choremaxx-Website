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
    <div className="page-bg" style={{ minHeight: '100vh' }}>
      {/* Ambient blobs */}
      <div className="blob-1" aria-hidden style={{ top: -100, right: -80, opacity: 0.35 }} />
      <div className="blob-2" aria-hidden style={{ bottom: 0, left: -80, opacity: 0.25 }} />

      <div className="container-page relative z-10" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-white text-4xl font-bold">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-white/40">Last updated: {lastUpdated}</p>
          )}
        </div>

        {/* Content card */}
        <div className="glass-card p-8 md:p-12 max-w-3xl legal-prose">
          {children}
        </div>
      </div>

      <style>{`
        .legal-prose {
          color: rgba(255,255,255,0.70);
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .legal-prose h2 {
          margin-top: 2em;
          margin-bottom: 0.6em;
          color: #fff;
          font-size: 1.15rem;
          font-weight: 700;
        }
        .legal-prose h3 {
          margin-top: 1.4em;
          margin-bottom: 0.5em;
          color: rgba(255,255,255,0.90);
          font-weight: 600;
        }
        .legal-prose p {
          margin-bottom: 1em;
        }
        .legal-prose ul,
        .legal-prose ol {
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        .legal-prose li {
          margin-bottom: 0.5em;
        }
        .legal-prose strong {
          color: rgba(255,255,255,0.90);
          font-weight: 600;
        }
        .legal-prose a {
          color: rgba(196,181,253,1);
          text-decoration: none;
          transition: color 0.2s;
        }
        .legal-prose a:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
