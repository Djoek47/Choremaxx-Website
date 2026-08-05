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
    <>
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-muted mb-8">Last updated: {lastUpdated}</p>
          )}
          <div className="prose prose-sm max-w-none text-foreground">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .prose {
          color: var(--color-light-text);
        }
        
        .prose h2 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: var(--color-dark-text);
        }
        
        .prose h3 {
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: var(--color-dark-text);
        }
        
        .prose p {
          margin-bottom: 1em;
        }
        
        .prose ul,
        .prose ol {
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        
        .prose li {
          margin-bottom: 0.5em;
        }
        
        .prose strong {
          color: var(--color-dark-text);
          font-weight: 600;
        }
        
        .prose a {
          color: var(--color-primary);
          text-decoration: none;
        }
        
        .prose a:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}
