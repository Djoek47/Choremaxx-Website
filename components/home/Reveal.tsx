'use client';

import { useEffect, useRef, useState } from 'react';

/** Fades a section up on first entry. Renders visible if IO is unavailable. */
export default function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cm-reveal${shown ? ' cm-in' : ''}`} style={style}>
      {children}
    </div>
  );
}
