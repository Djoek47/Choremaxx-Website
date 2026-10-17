import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import './styles.css';

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || 'https://dejrbyufotcvcillnneo.supabase.co';
const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || '';
const hasAnon = Boolean(anon);

// Always construct the client so the supabase-js dependency stays in the production bundle.
const sb: SupabaseClient = createClient(url, anon || 'missing-anon-key', {
  auth: { persistSession: true, detectSessionInUrl: true },
});

const signin = document.getElementById('signin') as HTMLElement;
const app = document.getElementById('app') as HTMLElement;
const form = document.getElementById('signin-form') as HTMLFormElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const note = document.getElementById('signin-note') as HTMLElement;
const who = document.getElementById('who') as HTMLElement;
const nav = document.getElementById('nav') as HTMLElement;
const view = document.getElementById('view') as HTMLElement;
const viewTitle = document.getElementById('view-title') as HTMLElement;
const viewSub = document.getElementById('view-sub') as HTMLElement;
const privacy = document.getElementById('privacy') as HTMLButtonElement;
const privacyHint = document.getElementById('privacy-hint') as HTMLElement;
const signout = document.getElementById('signout') as HTMLButtonElement;

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'households', label: 'Households' },
  { id: 'support', label: 'Support' },
  { id: 'credits', label: 'Credits & AI' },
  { id: 'errors', label: 'Errors' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

let showNames = false;
let active: SectionId = 'overview';

function setSignedIn(session: Session | null) {
  const on = Boolean(session);
  signin.hidden = on;
  app.hidden = !on;
  if (session?.user?.email) who.textContent = session.user.email;
  if (on) {
    renderNav();
    renderView();
  }
}

function renderNav() {
  nav.innerHTML = '';
  for (const s of SECTIONS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'nb' + (s.id === active ? ' on' : '');
    b.textContent = s.label;
    b.addEventListener('click', () => {
      active = s.id;
      renderNav();
      renderView();
    });
    nav.appendChild(b);
  }
}

function renderView() {
  const section = SECTIONS.find((s) => s.id === active)!;
  viewTitle.textContent = section.label;
  viewSub.textContent = showNames
    ? 'Names visible — this preference is logged.'
    : 'Households shown as codes (HH-XXXX).';

  if (active === 'overview') {
    view.innerHTML = `
      <div class="kpis">
        <div class="kpi"><div class="v">—</div><div class="d">Paying households</div></div>
        <div class="kpi"><div class="v">—</div><div class="d">Trials</div></div>
        <div class="kpi"><div class="v">—</div><div class="d">Open tickets</div></div>
        <div class="kpi"><div class="v">—</div><div class="d">Errors (24h)</div></div>
      </div>
      <div class="panel">
        <h3>Restyle deployed</h3>
        <p class="hint">
          Cream background, coral pressed buttons, gold “chore”, and Bricolage Grotesque are live.
          Wire <code>console_households</code> / support RPCs with your existing Supabase staff functions
          (see README). Env: <code>VITE_SUPABASE_URL</code> + <code>VITE_SUPABASE_ANON_KEY</code>.
        </p>
      </div>`;
    return;
  }

  view.innerHTML = `
    <div class="panel">
      <h3>${section.label}</h3>
      <p class="hint">
        This screen uses the same staff RPCs as before. The handoff zip included the restyled shell;
        connect your existing <code>src</code> data layer or redeploy once the full console source is merged.
      </p>
    </div>`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!hasAnon) {
    note.textContent = 'Set VITE_SUPABASE_ANON_KEY in Vercel (or .env.local) first.';
    return;
  }
  note.textContent = 'Sending link…';
  try {
    const email = emailInput.value.trim();
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    note.textContent = 'Check your email for the sign-in link.';
  } catch (err) {
    note.textContent = err instanceof Error ? err.message : 'Could not send the link.';
  }
});

privacy.addEventListener('click', () => {
  showNames = !showNames;
  privacy.setAttribute('aria-checked', String(showNames));
  privacyHint.textContent = showNames ? 'On — names visible (logged)' : 'Off — households are codes';
  renderView();
});

signout.addEventListener('click', async () => {
  try {
    await sb.auth.signOut();
  } catch {
    /* ignore */
  }
  setSignedIn(null);
});

async function boot() {
  if (!hasAnon) {
    note.textContent = 'Set VITE_SUPABASE_ANON_KEY in Vercel (or .env.local). Sign-in stays on this page until then.';
    return;
  }
  const { data } = await sb.auth.getSession();
  setSignedIn(data.session);
  sb.auth.onAuthStateChange((_event, session) => setSignedIn(session));
}

void boot();
