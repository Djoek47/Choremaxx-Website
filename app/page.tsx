import type { Metadata } from 'next';
import Link from 'next/link';

import DeadlineDemo from '@/components/home/DeadlineDemo';
import HeroPhone from '@/components/home/HeroPhone';
import Reveal from '@/components/home/Reveal';
import SupportFaq from '@/components/support/SupportFaq';
import {
  MarkBolt, MarkBook, MarkCart, MarkChart, MarkClipboard, MarkClock, MarkCrown, MarkFlame,
  MarkMedal, MarkMoon, MarkPause, MarkScales, MarkShield, MarkTile,
} from '@/components/marks/Marks';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

export const metadata: Metadata = {
  title: 'ChoreMaxx — The chore app for families with standards',
  description:
    'Assign the work, track who actually did it, and make it worth doing. 150 ready-made chores, XP, streaks and weekly crowns. For families, not roommates.',
  alternates: { canonical: 'https://www.choremaxx.app/' },
  openGraph: {
    title: 'ChoreMaxx — Everyone knows what\u2019s theirs to do',
    description: 'Parents assign. Kids complete. XP, streaks, crowns and rewards keep it honest. Free for 7 days.',
  },
};

const DOES = [
  { Mark: MarkClipboard, label: 'Pick from 150 chores, not a blank text box', sub: 'Fifteen domains — kitchen, bathroom, laundry, pets, yard, car, homework and the rest. Tap what you want done instead of inventing chore names at 9pm.' },
  { Mark: MarkScales, label: 'Every task carries a weight', sub: 'Emptying the dishwasher isn\u2019t scrubbing the tub. Harder work is worth more XP, so effort actually shows up in the standings.' },
  { Mark: MarkClock, label: 'One deadline everyone can see', sub: 'You set the household\u2019s daily deadline. Daily, weekday, weekly and monthly tasks all land against it. Miss it and the task goes late; leave it overnight and it expires.' },
  { Mark: MarkBook, label: 'Homework has its own tab', sub: 'Because homework isn\u2019t a chore, and treating it like one never worked.' },
  { Mark: MarkCart, label: 'The grocery list sorts itself', sub: 'Type \u201Cmilk,\u201D it files under Dairy & Eggs. Type \u201Csteak,\u201D it goes to Meat & Seafood. Shop the list by aisle instead of walking the store three times.' },
];

const POINTS = [
  { Mark: MarkBolt, label: 'Instant XP', sub: 'Your child finishes, taps, and the points land. You get notified and can ask for a photo afterward if something looks suspiciously clean.' },
  { Mark: MarkFlame, label: 'Streaks', sub: 'Daily and weekday tasks build a streak. Personal hygiene is tracked as a streak too, with no points attached, because brushing your teeth shouldn\u2019t be a transaction.' },
  { Mark: MarkMoon, label: 'Late Credit', sub: 'Finished after the deadline but before midnight? Reduced XP, streak intact. Late is better than never, and the app says so.' },
  { Mark: MarkShield, label: 'Streak Rescue', sub: 'Miss a day and you can pay part of the week\u2019s XP to save the streak. Miss three, and it\u2019s gone. Nobody gets it back for free.' },
  { Mark: MarkPause, label: 'Recess', sub: 'Going away? Freeze everything. Leave with a 12-day streak, come home with a 12-day streak.' },
];

const TROPHIES = [
  { Mark: MarkCrown, title: 'The Week\u2019s Crown', sub: 'Highest XP of the week' },
  { Mark: MarkMedal, title: 'The Monthly Sovereign', sub: 'Highest XP of the month' },
  { Mark: MarkChart, title: 'Champion\u2019s Record', sub: 'Tasks done, on time vs. late' },
];

const glass: React.CSSProperties = {
  background: 'var(--gl)', border: '1px solid var(--glb)',
  backdropFilter: 'blur(22px) saturate(170%)', boxShadow: 'var(--shadow)',
};

const h2: React.CSSProperties = {
  margin: 0, fontSize: 'clamp(34px,4.2vw,58px)', fontWeight: 700,
  letterSpacing: '-.04em', lineHeight: 1.04, color: 'var(--tx)', textWrap: 'balance',
};

const kicker: React.CSSProperties = {
  fontSize: 11.5, fontWeight: 650, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--p)',
};

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SiteHeader />

      {/* ── HERO ── */}
      <section
        id="top"
        style={{
          position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '150px 32px 90px',
          background: 'linear-gradient(160deg, color-mix(in srgb,var(--p) 12%,var(--bg)) 0%, var(--bg) 45%, color-mix(in srgb,var(--p) 8%,var(--bg)) 100%)',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -220, right: -160, width: 720, height: 720, borderRadius: '50%', filter: 'blur(90px)', animation: 'cmDrift 26s ease-in-out infinite alternate', background: 'radial-gradient(circle, color-mix(in srgb,var(--p) 30%,transparent) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -180, left: -140, width: 520, height: 520, borderRadius: '50%', filter: 'blur(80px)', animation: 'cmDrift 34s ease-in-out infinite alternate-reverse', background: 'radial-gradient(circle, color-mix(in srgb,var(--sec) 22%,transparent) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', top: -160, right: -190, width: 600, height: 600, borderRadius: '50%', border: '9px solid color-mix(in srgb,var(--p) 15%,transparent)', animation: 'cmSpin 120s linear infinite' }} />
        </div>

        <div className="cm-hero-grid" style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,540px)', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 760 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '6px 14px', borderRadius: 999, background: 'var(--pl)', border: '1px solid color-mix(in srgb,var(--p) 24%,transparent)', boxShadow: 'var(--spec)', fontSize: 12.5, fontWeight: 600, color: 'var(--p)', animation: 'cmFade .8s .1s both' }}>
              Built for real families with high standards
            </div>

            {/* Each sentence is its own nowrap block — the break is always between them. */}
            <h1 style={{ margin: 0, fontSize: 'clamp(26px,3.5vw,51px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-.045em', color: 'var(--tx)' }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Your house. Your <span style={{ color: 'var(--p)' }}>rules</span>.</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Actually followed.</span>
            </h1>

            <p style={{ margin: 0, maxWidth: 470, fontSize: 19, lineHeight: 1.6, color: 'var(--txs)', animation: 'cmRise .9s cubic-bezier(.22,1,.36,1) .62s both' }}>
              With ChoreMaxx, hand out the work, track who actually did it, and make it worth doing. You stay in charge — the app just stops the arguing.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, animation: 'cmRise .9s cubic-bezier(.22,1,.36,1) .70s both' }}>
              <Link href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 999, background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 8px 28px color-mix(in srgb,var(--p) 45%,transparent)' }}>
                Start 7 days free
              </Link>
              <Link href="/#deadline" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 999, background: 'color-mix(in srgb,var(--gl) 55%,transparent)', border: '1.5px solid var(--bd)', color: 'var(--txs)', fontSize: 15, fontWeight: 600 }}>
                See how it works
              </Link>
            </div>
          </div>

          <HeroPhone />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: '110px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
        <Reveal style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h2, fontSize: 'clamp(32px,4vw,54px)', marginBottom: 20 }}>The chore chart lasted eleven days</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: 'var(--txm)' }}>
            You wrote it out. You taped it to the fridge. Then someone &ldquo;already did that one,&rdquo; someone else swears it wasn&rsquo;t theirs,
            and by the second week you&rsquo;re doing the dishes yourself again. The chart wasn&rsquo;t the problem. Nothing was keeping score.
          </p>
        </Reveal>
      </section>

      {/* ── WHAT IT DOES ── */}
      <section id="does" style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Reveal style={{ maxWidth: 620, marginBottom: 52 }}>
            <p style={{ ...kicker, margin: '0 0 14px' }}>What ChoreMaxx does</p>
            <h2 style={h2}>Assign it once. It holds.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 18 }}>
            {DOES.map(({ Mark, label, sub }) => (
              <Reveal key={label}>
                <div style={{ ...glass, display: 'flex', alignItems: 'flex-start', gap: 16, padding: 26, borderRadius: 24, height: '100%' }}>
                  <MarkTile><Mark /></MarkTile>
                  <div>
                    <p style={{ margin: '0 0 7px', fontSize: 16, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEADLINE ── */}
      <section id="deadline" style={{ padding: '120px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Reveal style={{ maxWidth: 660, marginBottom: 52 }}>
            <p style={{ ...kicker, margin: '0 0 14px' }}>Try it right here</p>
            <h2 style={{ ...h2, marginBottom: 14 }}>One deadline. Three ways the night can end.</h2>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              You set the household&rsquo;s daily deadline. Pick when Liam actually taps Complete and watch what the app does about it — full XP,
              Late Credit, or an expired task and a broken streak he has to buy back.
            </p>
          </Reveal>
          <DeadlineDemo />
        </div>
      </section>

      {/* ── POINTS ── */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Reveal style={{ maxWidth: 660, marginBottom: 52 }}>
            <p style={{ ...kicker, margin: '0 0 14px' }}>Points that mean something</p>
            <h2 style={{ ...h2, marginBottom: 14 }}>XP hits the second they tap Complete</h2>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              No waiting on a parent to log in and bless it. Your child finishes, taps, and the points land. You get notified and can ask for a photo afterward if something looks suspiciously clean.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 18 }}>
            {POINTS.map(({ Mark, label, sub }) => (
              <Reveal key={label}>
                <div style={{ ...glass, display: 'flex', flexDirection: 'column', gap: 11, padding: 26, borderRadius: 24, height: '100%' }}>
                  <MarkTile><Mark /></MarkTile>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--txm)' }}>{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TROPHIES (halo, colourless) ── */}
      <section style={{ padding: '120px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'center' }}>
          <Reveal>
            <h2 style={{ ...h2, fontSize: 'clamp(34px,4.2vw,54px)', marginBottom: 16 }}>Somebody wins the week</h2>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              The Week&rsquo;s Crown goes to the highest XP of the week. The Monthly Sovereign takes the month. Gold, silver, bronze — and a Champion&rsquo;s Record anyone in the house can open: tasks completed, how many were on time, how many were late.
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 17.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              Only one child? They compete against their own best week. That&rsquo;s usually harder.
            </p>
          </Reveal>
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TROPHIES.map(({ Mark, title, sub }) => (
              <div key={title} style={{ ...glass, display: 'flex', alignItems: 'center', gap: 18, padding: '24px 26px', borderRadius: 24 }}>
                <MarkTile tone="colourless"><Mark /></MarkTile>
                <div>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>{title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--txm)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── REWARDS ── */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <p style={{ ...kicker, margin: '0 0 14px' }}>Rewards &amp; allowance</p>
            <h2 style={{ ...h2, marginBottom: 18 }}>You decide what the work is worth</h2>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Run it however your house runs. XP only. Allowance only. XP plus rewards. Or the full system.
            </p>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Pick from the reward library or mint your own — extra screen time, choosing dinner, a later bedtime, whatever actually motivates your child. Set each one to grant instantly or require your approval.
            </p>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Once the day&rsquo;s tasks and homework are done, a Sidekick can hold to request a reward. Before that, the button just tells them to go finish.
            </p>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              About allowance, plainly: ChoreMaxx is not a payment app. It never touches your bank, and no money moves through it. You approve an amount, the app records it, and you settle up the way you already do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── POPPINS ── */}
      <section id="poppins" style={{ padding: '130px 32px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 56, alignItems: 'center' }}>
          <Reveal>
            <p style={{ ...kicker, margin: '0 0 16px' }}>Poppins</p>
            <h2 style={{ ...h2, marginBottom: 18 }}>Poppins does the admin so you don&rsquo;t</h2>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              Poppins is the AI built into ChoreMaxx, and it&rsquo;s yours — parents only. Ask it anything about how the app works, or just tell it
              what you want: assign Saturday&rsquo;s yard work, move a task to Noah, remind everyone thirty minutes before the deadline.
            </p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>
              It answers, and it acts. Kids don&rsquo;t get access to it. Kids get their tasks.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ ...glass, padding: 30, borderRadius: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
                <span style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--p)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                </span>
                <p style={{ margin: 0, fontSize: 15.5, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>Poppins</p>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--txm)' }}>Parents only</span>
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, fontStyle: 'italic', color: 'var(--txs)' }}>
                &ldquo;Assigned Saturday yard work to Noah and moved Sunday dishes to Emma. Reminder set for 30 minutes before tonight&rsquo;s deadline.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOUSE RULES ── */}
      <section style={{ padding: '120px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ ...h2, marginBottom: 18 }}>The rules are written down, and everyone can read them</h2>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Every mechanic in ChoreMaxx — how XP is earned, when things expire, what breaks a streak, how crowns are won — lives on one screen. Thirty-six rules, seven chapters, no mystery.
            </p>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              There are two versions. The Admin version, and a Sidekick version written for a nine-year-old. When your child says the app cheated them, you both open the same page.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHO ── */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ ...h2, marginBottom: 18 }}>Families. That&rsquo;s the whole list.</h2>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              ChoreMaxx is built for parents and the kids who live with them. We took out the roommate mode, the coworking mode, and everything else that made it a general task app.
            </p>
            <p style={{ margin: '0 0 16px', fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Two admins maximum, so authority is clear. Everyone else joins as a Sidekick with a personal invite link — one per child, expires in a week, and they&rsquo;re in the second they tap it.
            </p>
            <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              Best for kids old enough to be responsible for something. If you&rsquo;re still in bottles and naps, come back in a few years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '120px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ ...kicker, margin: '0 0 14px' }}>Pricing</p>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,4vw,54px)' }}>One price. Everyone in the house.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {[
              {
                title: 'Monthly',
                price: '$4.99',
                period: '/month',
                note: '7 days free, then billed monthly through Apple.',
                bullets: [
                  'Every member of the household',
                  'All 150 chores across 15 domains',
                  'XP, streaks, crowns and Streak Rescue',
                  'Rewards, allowance tracking and the grocery list',
                  'Poppins',
                  'Cancel anytime',
                ],
                highlight: false,
              },
              {
                title: 'Yearly',
                price: '$48',
                period: '/year',
                note: '7 days free, then billed yearly through Apple. Everything above, two months cheaper.',
                bullets: [
                  'Every member of the household',
                  'All 150 chores across 15 domains',
                  'XP, streaks, crowns and Streak Rescue',
                  'Rewards, allowance tracking and the grocery list',
                  'Poppins',
                  'Cancel anytime',
                ],
                highlight: true,
              },
            ].map((tier) => (
              <Reveal key={tier.title}>
                <div
                  style={{
                    ...glass, padding: 34, borderRadius: 30, position: 'relative', height: '100%',
                    display: 'flex', flexDirection: 'column', gap: 22,
                    border: tier.highlight ? '1.5px solid var(--p)' : '1px solid var(--glb)',
                  }}
                >
                  {tier.highlight ? (
                    <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', padding: '5px 15px', borderRadius: 999, background: 'var(--p)', color: '#fff', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      Save 20%
                    </span>
                  ) : null}
                  <div>
                    <p style={{ margin: '0 0 6px', fontSize: 12.5, fontWeight: 650, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txm)' }}>{tier.title}</p>
                    <p style={{ margin: 0, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-.045em', color: 'var(--tx)', lineHeight: 1 }}>{tier.price}</span>
                      <span style={{ fontSize: 15, color: 'var(--txm)', fontWeight: 550 }}>{tier.period}</span>
                    </p>
                    <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.55, color: 'var(--txm)' }}>{tier.note}</p>
                    <ul style={{ margin: '16px 0 0', padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tier.bullets.map((b) => (
                        <li key={b} style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--txs)' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/download"
                    style={{
                      marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 999,
                      fontSize: 14.5, fontWeight: 650,
                      background: tier.highlight ? 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)' : 'transparent',
                      color: tier.highlight ? '#fff' : 'var(--txs)',
                      border: tier.highlight ? 'none' : '1.5px solid var(--bd)',
                    }}
                  >
                    Start 7 days free
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ ...h2, fontSize: 'clamp(32px,3.8vw,50px)', textAlign: 'center', marginBottom: 44 }}>Frequently asked questions</h2>
          </Reveal>
          <SupportFaq />
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section style={{ padding: '120px 32px', background: 'var(--bgs)', borderTop: '1px solid var(--bd)' }}>
        <Reveal style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h2, marginBottom: 16 }}>Everyone knows what&rsquo;s theirs to do.</h2>
          <p style={{ margin: '0 0 28px', fontSize: 18, lineHeight: 1.6, color: 'var(--txm)' }}>
            Seven days free. No card until you&rsquo;ve seen whether it holds.
          </p>
          <a
            href="https://apps.apple.com/app/id6796850110"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 999,
              background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)',
              color: '#fff', fontSize: 15, fontWeight: 600,
              boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 8px 28px color-mix(in srgb,var(--p) 45%,transparent)',
            }}
          >
            Get ChoreMaxx on the App Store
          </a>
        </Reveal>
      </section>

      <SiteFooter />

      {/* Hero collapses to one column before the phone is dropped. */}
      <style>{`@media (max-width: 1180px) { .cm-hero-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
    </div>
  );
}
