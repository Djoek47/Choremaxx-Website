export default function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 40, borderRadius: 30, maxWidth: 760,
        background: 'var(--gl)', border: '1px solid var(--glb)',
        backdropFilter: 'blur(34px) saturate(185%)', boxShadow: 'var(--shadow)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      {children}
    </div>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ margin: '22px 0 0', fontSize: 21, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>
      {children}
    </h2>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: 'var(--txm)' }}>{children}</p>;
}

export function LegalLead({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, color: 'var(--txs)' }}>{children}</p>;
}

export function LegalFoot() {
  return (
    <p style={{ margin: '26px 0 0', paddingTop: 22, borderTop: '1px solid var(--bd)', fontSize: 13.5, color: 'var(--txm)' }}>
      &copy; 2026 ChoreMaxx. All rights reserved.
    </p>
  );
}
