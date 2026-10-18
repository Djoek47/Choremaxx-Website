import { moji } from './moji';
/**
 * ChoreMaxx Console — live.
 *
 * Reads the app's Supabase project with the anon key and the staff member's own session. Every
 * read goes through staff-only functions or RLS (see supabase/migrations), so a signed-in
 * non-staff account sees nothing. Replies go through the support-reply edge function.
 */
import './styles.css';
import { createClient, type Session } from '@supabase/supabase-js';

// ── Supabase ────────────────────────────────────────────────────────────────────────────
const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const sb = URL_ && KEY ? createClient(URL_, KEY, { auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' } }) : null;

// ── Types (shapes returned by the console functions) ────────────────────────────────────
type Status = 'paid' | 'trial' | 'cancel' | 'lapsed' | 'never';
type Household = {
  code: string;
  household_name: string;
  status: Status;
  product_id: string | null;
  in_trial: boolean;
  expires_at: string | null;
  will_renew: boolean | null;
  environment: string | null;
  days_left: number | null;
  members: number;
  shared_devices: number;
  bought_actions: number;
  spent_bought_actions: number;
  actions_this_month: number;
  last_active: string | null;
  created_at: string;
};
type Ticket = {
  id: string;
  ref: string;
  received_at: string;
  via: 'app' | 'email';
  status: 'new' | 'open' | 'waiting' | 'closed';
  category: string | null;
  subject: string;
  body: string;
  from_name: string | null;
  from_email: string | null;
  household_id: string | null;
  household_code: string | null;
  member_role: string | null;
  app_version: string | null;
  device: string | null;
  error_count: number;
  error_log: string | null;
  meta: { attachmentPaths?: string[]; screenshotUrls?: string[] } | null;
  section?: Section | null;
};
type Section = 'support' | 'credits' | 'errors';
type User = {
  user_code: string; display_name: string | null; email: string | null; role: string; member_status: string;
  household_code: string; household_status: Status; joined_at: string; last_seen_at: string | null;
  last_sign_in_at: string | null; xp: number; streak: number; tickets: number; errors_30d: number;
};
type Reply = { id: string; ticket_id: string; at: string; direction: 'in' | 'out'; author: string | null; body: string };
type ErrorGroup = { fingerprint: string; title: string; source: string; category: string | null; section?: Section | null; total: number; households: number; last_at: string; per_day: number[]; tickets?: string[] | null };

// ── State ───────────────────────────────────────────────────────────────────────────────
const S = {
  session: null as Session | null,
  view: 'overview' as 'overview' | 'households' | 'users' | 'support' | 'credits' | 'errors',
  section: 'all' as 'all' | Section,
  users: [] as User[],
  reveal: false,
  q: '',
  filter: 'all' as 'all' | Status,
  selected: null as string | null,
  households: [] as Household[],
  tickets: [] as Ticket[],
  replies: [] as Reply[],
  errors: [] as ErrorGroup[],
  packs: [] as { month: string; pack: string; packs: number; actions: number }[],
  mix: [] as { act_kind: string; acts: number; actions: number }[],
  deletion: [] as { reason: string; n: number }[],
  loaded: { households: false, tickets: false, extras: false, users: false },
  error: null as string | null,
  updatedAt: null as Date | null,
};

const PRICE = { monthly: 6.99, yearly: 49.99 };
const PACK_PRICE: Record<string, number> = { small: 1.99, medium: 4.99, large: 9.99 };
const PACK_SIZE: Record<string, number> = { small: 200, medium: 700, large: 2000 };
const DAY = 864e5;

// ── Helpers ─────────────────────────────────────────────────────────────────────────────
const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fmt = (iso: string | Date | null, o: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) =>
  iso ? new Date(iso).toLocaleDateString('en-CA', o) : '—';
const fmtTime = (iso: string) => fmt(iso, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
function ago(iso: string | null): string {
  if (!iso) return 'never';
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 6e4);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}
const hues = ['#D9620B', '#2F6FB5', '#1F8A55', '#8E44AD', '#B7700A', '#C2372B', '#0E7C86', '#5D6D7E'];
const hueFor = (code: string) => hues[[...code].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length];
const label = (h: Household) => (S.reveal ? h.household_name : h.code);
const initials = (h: Household) => (S.reveal ? h.household_name.replace(/^The /i, '').slice(0, 2) : h.code.slice(3, 5));
const plan = (h: Household) => (h.product_id?.includes('yearly') ? 'yearly' : h.product_id?.includes('monthly') ? 'monthly' : null);
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
const maskEmail = (e: string | null) => (e ? e.replace(/^(.)[^@]*/, '$1•••') : '—');
const STATUS: Record<Status, [string, string]> = {
  paid: ['Paid', 'p-paid'],
  trial: ['Trial', 'p-trial'],
  cancel: ['Cancelled', 'p-cancel'],
  lapsed: ['Lapsed', 'p-lapsed'],
  never: ['No plan', 'p-never'],
};
const pill = (s: Status) => `<span class="pill ${STATUS[s][1]}">${STATUS[s][0]}</span>`;
const ticketPill = (s: Ticket['status']) =>
  ({ new: '<span class="pill p-new">New</span>', open: '<span class="pill p-trial">Open</span>', waiting: '<span class="pill p-cancel">Waiting on them</span>', closed: '<span class="pill p-muted">Closed</span>' })[s];
function toast(text: string) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = text;
  document.body.append(el);
  setTimeout(() => el.remove(), 2400);
}
const monthlyRevenue = (h: Household) => {
  const p = plan(h);
  if (h.status !== 'paid' && h.status !== 'cancel') return 0;
  return p === 'yearly' ? PRICE.yearly / 12 : p === 'monthly' ? PRICE.monthly : 0;
};
async function audit(action: string, target?: string) {
  if (!sb) return;
  await sb.from('console_audit').insert({ action, target: target ?? null });
}

// ── Data ────────────────────────────────────────────────────────────────────────────────
async function loadHouseholds() {
  const { data, error } = await sb!.rpc('console_households');
  if (error) throw error;
  S.households = (data ?? []) as Household[];
  S.loaded.households = true;
}
async function loadUsers() {
  const { data, error } = await sb!.rpc('console_users');
  // Older databases without the users function still load everything else.
  if (error && !/console_users/.test(error.message)) throw error;
  S.users = (data ?? []) as User[];
  S.loaded.users = true;
}
/** Which console section a ticket belongs to (set by the database; guessed for old rows). */
function sectionOf(t: Ticket): Section {
  if (t.section) return t.section;
  const text = `${t.category ?? ''} ${t.subject} ${t.body}`;
  if (/billing|poppins|credit|pack|purchas|refund|charge|subscri|premium|trial|receipt|payment/i.test(text)) return 'credits';
  if (t.error_count > 0 || /crash|bug|error|broken|freez|stuck|not working/i.test(text)) return 'errors';
  return 'support';
}
const errSection = (e: ErrorGroup): Section => e.section ?? (/billing|poppins/i.test(e.category ?? '') ? 'credits' : 'errors');
const SECTION_NAME: Record<Section, string> = { support: 'Support', credits: 'Credits & billing', errors: 'Errors & bugs' };
async function loadTickets() {
  const [{ data: t, error: e1 }, { data: r, error: e2 }] = await Promise.all([
    sb!.from('support_tickets').select('*').order('received_at', { ascending: false }).limit(300),
    sb!.from('support_replies').select('*').order('at', { ascending: true }).limit(2000),
  ]);
  if (e1) throw e1;
  if (e2) throw e2;
  // Household codes for linking, from the households already loaded (no extra personal reads).
  const codeById = await householdCodes(((t ?? []) as Ticket[]).map((x) => x.household_id).filter(Boolean) as string[]);
  S.tickets = ((t ?? []) as Ticket[]).map((x) => ({ ...x, household_code: x.household_id ? codeById[x.household_id] ?? null : null }));
  S.replies = (r ?? []) as Reply[];
  S.loaded.tickets = true;
}
async function householdCodes(ids: string[]): Promise<Record<string, string>> {
  if (ids.length === 0) return {};
  const { data } = await sb!.rpc('console_household_codes', { p_ids: [...new Set(ids)] });
  const out: Record<string, string> = {};
  for (const row of (data ?? []) as { id: string; code: string }[]) out[row.id] = row.code;
  return out;
}
async function loadExtras() {
  const [errors, packs, mix, deletion] = await Promise.all([
    sb!.rpc('console_errors', { p_days: 9 }),
    sb!.rpc('console_pack_sales', { p_months: 6 }),
    sb!.rpc('console_ai_mix'),
    sb!.rpc('console_deletion_reasons', { p_days: 30 }),
  ]);
  for (const r of [errors, packs, mix, deletion]) if (r.error) throw r.error;
  S.errors = (errors.data ?? []) as ErrorGroup[];
  S.packs = (packs.data ?? []) as typeof S.packs;
  S.mix = (mix.data ?? []) as typeof S.mix;
  S.deletion = (deletion.data ?? []) as typeof S.deletion;
  S.loaded.extras = true;
}
async function loadAll() {
  S.error = null;
  try {
    await Promise.all([loadHouseholds(), loadTickets(), loadExtras(), loadUsers()]);
    S.updatedAt = new Date();
  } catch (e) {
    S.error = (e as { message?: string }).message ?? 'Could not load data.';
  }
  render();
}

// ── Charts ──────────────────────────────────────────────────────────────────────────────
function barSeries(values: number[], labels: string[], fmtValue: (n: number) => string, aria: string) {
  const W = 560, H = 190, P = { l: 10, r: 10, t: 22, b: 22 };
  const max = Math.max(1, ...values);
  const slot = (W - P.l - P.r) / values.length;
  const bw = Math.min(34, slot * 0.6);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">
    <line x1="${P.l}" x2="${W - P.r}" y1="${H - P.b}" y2="${H - P.b}" stroke="var(--line)" />
    ${values
      .map((v, i) => {
        const h = (v / max) * (H - P.t - P.b);
        const x = P.l + i * slot + (slot - bw) / 2;
        const y = H - P.b - h;
        const last = i === values.length - 1;
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" rx="5" fill="var(--accent)" opacity="${last ? 1 : 0.55}" />
          ${v ? `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" style="fill:var(--fg)">${esc(fmtValue(v))}</text>` : ''}
          <text x="${(x + bw / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle">${esc(labels[i])}</text>`;
      })
      .join('')}
  </svg>`;
}
function spark(v: number[]) {
  if (!v?.length) return '';
  const W = 90, H = 26, max = Math.max(...v, 1);
  const x = (i: number) => (v.length === 1 ? W : (i * W) / (v.length - 1));
  const y = (n: number) => H - 3 - (n / max) * (H - 6);
  const l = v.map((n, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(n).toFixed(1)}`).join('');
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="a" d="${l}L${W},${H}L0,${H}Z"/><path class="l" d="${l}"/><circle cx="${W}" cy="${y(v[v.length - 1])}" r="2.5" fill="var(--accent)"/></svg>`;
}

// ── Cells ───────────────────────────────────────────────────────────────────────────────
function daysCell(h: Household) {
  if (h.status === 'never') return '<span class="hint">No subscription yet</span>';
  if (h.status === 'lapsed') return `<div class="days"><span class="num">Ended ${fmt(h.expires_at)}</span><div class="bar bad"><i style="width:100%"></i></div></div>`;
  const left = Math.max(0, h.days_left ?? 0);
  const total = h.in_trial ? 7 : plan(h) === 'yearly' ? 365 : 30;
  const pct = Math.max(4, Math.min(100, (left / total) * 100));
  const cls = h.in_trial ? 'info' : left <= 3 || h.will_renew === false ? 'warn' : '';
  const word = h.in_trial ? (h.will_renew === false ? 'ends' : 'converts') : h.will_renew === false ? 'ends' : 'renews';
  return `<div class="days"><span class="num">${left}d · ${word} ${fmt(h.expires_at)}</span><div class="bar ${cls}"><i style="width:${pct}%"></i></div></div>`;
}
function creditsCell(h: Household) {
  const left = h.bought_actions - h.spent_bought_actions;
  if (!h.bought_actions && !h.actions_this_month) return '<span class="hint">No AI use yet</span>';
  const a = h.bought_actions ? (h.spent_bought_actions / h.bought_actions) * 100 : 0;
  return `<div class="credits"><span class="num">${h.actions_this_month} this month · ${left.toLocaleString()} banked</span><div class="stack"><i style="width:${a}%"></i><i style="width:${100 - a}%"></i></div></div>`;
}
const avatar = (h: Household, size = 30) =>
  `<div class="avatar" style="background:${hueFor(h.code)};width:${size}px;height:${size}px">${esc(initials(h))}</div>`;
const hhByCode = (code: string | null) => S.households.find((h) => h.code === code);
function ticketRow(t: Ticket) {
  return `<div class="row" data-ticket-go="${esc(t.id)}" role="button" tabindex="0"><div class="grow"><div class="title">${esc(t.subject || '(no subject)')}</div><div class="meta">${esc(t.ref)} · ${esc(SECTION_NAME[sectionOf(t)])}${t.category ? ` · ${esc(t.category)}` : ''} · ${t.via === 'email' ? 'Email' : 'App'} · ${ago(t.received_at)}</div></div>${ticketPill(t.status)}</div>`;
}

function ticketLinks(e: ErrorGroup) {
  const refs = (e.tickets ?? []).filter(Boolean);
  if (!refs.length) return '';
  return `<div class="refs">${refs.slice(0, 4).map((r) => {
    const t = S.tickets.find((x) => x.ref === r);
    return t ? `<a href="#" class="pill p-muted" data-ticket-go="${esc(t.id)}">${esc(r)}</a>` : `<span class="pill p-muted">${esc(r)}</span>`;
  }).join('')}</div>`;
}
const errRow = (e: ErrorGroup) =>
  `<div class="row"><div class="grow"><div class="title">${esc(e.title)}</div><div class="meta">${esc(e.source)} · ${e.total} times · last ${ago(e.last_at)}</div>${ticketLinks(e)}</div>${spark(e.per_day)}</div>`;

// ── Views ───────────────────────────────────────────────────────────────────────────────
const V = {
  overview() {
    const H = S.households;
    const paid = H.filter((h) => h.status === 'paid' || h.status === 'cancel');
    const trial = H.filter((h) => h.status === 'trial');
    const mrr = H.reduce((s, h) => s + monthlyRevenue(h), 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const packsMonth = S.packs.filter((p) => String(p.month).slice(0, 7) === thisMonth);
    const packRevenue = packsMonth.reduce((s, p) => s + p.packs * (PACK_PRICE[p.pack] ?? 0), 0);
    const open = S.tickets.filter((t) => t.status !== 'closed').length;
    const unanswered = S.tickets.filter((t) => t.status === 'new').length;
    const soon = H.filter((h) => (h.status === 'trial' || h.status === 'cancel') && (h.days_left ?? 99) >= 0 && (h.days_left ?? 99) <= 7)
      .sort((a, b) => (a.days_left ?? 0) - (b.days_left ?? 0));
    // New households per month, last 12 months.
    const months: string[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) months.push(new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().slice(0, 7));
    const signups = months.map((m) => H.filter((h) => h.created_at?.slice(0, 7) === m).length);
    const letters = months.map((m) => new Date(m + '-15').toLocaleDateString('en-CA', { month: 'narrow' }));
    return `
    <div class="grid kpis">
      <div class="card kpi"><div class="label">Paying households</div><div class="value num">${paid.length}</div><div class="delta">${paid.filter((h) => h.status === 'cancel').length} set to end</div></div>
      <div class="card kpi"><div class="label">On free trial</div><div class="value num">${trial.length}</div><div class="delta">${trial.filter((h) => h.will_renew !== false).length} set to convert</div></div>
      <div class="card kpi"><div class="label">Monthly revenue (est.)</div><div class="value num">$${mrr.toFixed(0)}</div><div class="delta">USD list price, before Apple’s cut</div></div>
      <div class="card kpi"><div class="label">Credit packs this month</div><div class="value num">$${packRevenue.toFixed(0)}</div><div class="delta">${packsMonth.reduce((s, p) => s + p.packs, 0)} packs sold</div></div>
      <div class="card kpi"><div class="label">People</div><div class="value num">${S.users.filter((u) => u.role !== 'shared-device').length}</div><div class="delta">${S.users.filter((u) => u.last_seen_at && Date.now() - new Date(u.last_seen_at).getTime() < 7 * DAY).length} active this week</div></div>
      <div class="card kpi"><div class="label">Open support</div><div class="value num">${open}</div><div class="delta ${unanswered ? 'down' : ''}">${unanswered} unanswered</div></div>
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="card chart">
        <div class="section-title" style="margin-top:0"><h2>New households</h2><p class="hint">per month, last 12 months</p></div>
        ${barSeries(signups, letters, (n) => String(n), `New households per month: ${signups.join(', ')}`)}
      </div>
      <div class="card">
        <div class="section-title" style="margin-top:0"><h2>Ending in the next 7 days</h2><p class="hint">trials and cancelled plans</p></div>
        <div class="list">${
          soon.map((h) => `
          <div class="row" data-open="${esc(h.code)}" role="button" tabindex="0">
            ${avatar(h)}
            <div class="grow"><div class="title">${esc(label(h))}</div><div class="meta">${h.status === 'trial' ? (h.will_renew === false ? 'Trial ends, renewal off' : 'Trial converts') : 'Renewal off'} · ${fmt(h.expires_at)}</div></div>
            ${pill(h.status)}
          </div>`).join('') || '<p class="empty">Nothing ending this week.</p>'
        }</div>
      </div>
    </div>
    <div class="section-title"><h2>Latest support</h2><button class="btn ghost small" data-go="support" type="button">Open inbox</button></div>
    <div class="card"><div class="list">${S.tickets.slice(0, 4).map(ticketRow).join('') || '<p class="empty">No support messages yet.</p>'}</div></div>`;
  },

  households() {
    const q = S.q;
    const rows = S.households
      .filter((h) => S.filter === 'all' || h.status === S.filter)
      .filter((h) => !q || `${h.code} ${S.reveal ? h.household_name : ''}`.toLowerCase().includes(q))
      .sort((a, b) => (b.last_active ?? '').localeCompare(a.last_active ?? ''));
    const n = (s: Status) => S.households.filter((h) => h.status === s).length;
    const chips: [string, string, number][] = [
      ['all', 'All', S.households.length], ['paid', 'Paid', n('paid')], ['trial', 'Trial', n('trial')],
      ['cancel', 'Cancelled', n('cancel')], ['lapsed', 'Lapsed', n('lapsed')], ['never', 'No plan', n('never')],
    ];
    return `
    <div class="filters" role="group" aria-label="Filter by status">
      ${chips.map(([k, t, c]) => `<button class="chip" type="button" data-filter="${k}" aria-pressed="${S.filter === k}">${t} <span class="num">${c}</span></button>`).join('')}
    </div>
    <div class="tablewrap"><table>
      <thead><tr><th>Household</th><th>Status</th><th>Plan</th><th>Time left</th><th>Poppins actions</th><th>People</th><th>Last active</th></tr></thead>
      <tbody>${
        rows.map((h) => `
        <tr data-open="${esc(h.code)}" tabindex="0">
          <td><div class="hh">${avatar(h)}<div><div style="font-weight:600">${esc(label(h))}</div><div class="mono" style="color:var(--subtle)">${S.reveal ? esc(h.code) + ' · ' : ''}${esc(h.environment ?? '')}</div></div></div></td>
          <td>${pill(h.status)}</td>
          <td>${plan(h) === 'yearly' ? 'Yearly' : plan(h) === 'monthly' ? 'Monthly' : '—'}</td>
          <td>${daysCell(h)}</td>
          <td>${creditsCell(h)}</td>
          <td class="num">${h.members}${h.shared_devices ? ` <span class="hint">+${h.shared_devices} tablet</span>` : ''}</td>
          <td class="num">${ago(h.last_active)}</td>
        </tr>`).join('') || '<tr><td colspan="7" class="empty">No households match.</td></tr>'
      }</tbody></table></div>
    <p class="hint" style="margin-top:10px">Plans, dates and counts only. Tasks, messages, photos and children’s names are never read.</p>`;
  },

  users() {
    const q = S.q;
    const show = (u: User) => (S.reveal ? u.display_name || '—' : u.user_code);
    const rows = S.users
      .filter((u) => !q || `${u.user_code} ${u.household_code} ${u.role} ${S.reveal ? `${u.display_name ?? ''} ${u.email ?? ''}` : ''}`.toLowerCase().includes(q))
      .sort((a, b) => (b.last_seen_at ?? '').localeCompare(a.last_seen_at ?? ''));
    const ROLE: Record<string, string> = { owner: 'Owner', admin: 'Admin', adult: 'Adult', child: 'Child', guest: 'Guest', 'shared-device': 'Shared tablet' };
    const people = S.users.filter((u) => u.role !== 'shared-device');
    return `
    <div class="grid kpis">
      <div class="card kpi"><div class="label">People</div><div class="value num">${people.length}</div><div class="delta">${S.users.length - people.length} shared tablets</div></div>
      <div class="card kpi"><div class="label">Active this week</div><div class="value num">${people.filter((u) => u.last_seen_at && Date.now() - new Date(u.last_seen_at).getTime() < 7 * DAY).length}</div><div class="delta">opened the app in the last 7 days</div></div>
      <div class="card kpi"><div class="label">Wrote to support</div><div class="value num">${people.filter((u) => u.tickets).length}</div><div class="delta">${plural(people.reduce((s, u) => s + u.tickets, 0), 'message')} in all</div></div>
      <div class="card kpi"><div class="label">Hit an error</div><div class="value num">${people.filter((u) => u.errors_30d).length}</div><div class="delta">in the last 30 days</div></div>
    </div>
    <div class="tablewrap" style="margin-top:14px"><table>
      <thead><tr><th>Person</th><th>Role</th><th>Household</th><th>Plan</th><th>Last active</th><th>Joined</th><th>Support</th><th>Errors (30d)</th></tr></thead>
      <tbody>${
        rows.map((u) => `
        <tr data-open="${esc(u.household_code)}" tabindex="0">
          <td><div style="font-weight:600">${esc(show(u))}</div><div class="mono" style="color:var(--subtle)">${S.reveal ? esc(u.email ?? 'no email') : esc(maskEmail(u.email))}</div></td>
          <td>${esc(ROLE[u.role] ?? u.role)}${u.member_status !== 'active' ? ` <span class="hint">${esc(u.member_status)}</span>` : ''}</td>
          <td class="mono">${esc(S.reveal ? (hhByCode(u.household_code)?.household_name ?? u.household_code) : u.household_code)}</td>
          <td>${pill(u.household_status)}</td>
          <td class="num">${ago(u.last_seen_at ?? u.last_sign_in_at)}</td>
          <td class="num">${fmt(u.joined_at, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          <td class="num">${u.tickets || '—'}</td>
          <td class="num">${u.errors_30d ? `<span style="color:var(--bad);font-weight:700">${u.errors_30d}</span>` : '—'}</td>
        </tr>`).join('') || `<tr><td colspan="8" class="empty">${S.loaded.users && !S.users.length ? 'No people yet.' : 'No people match.'}</td></tr>`
      }</tbody></table></div>
    <p class="hint" style="margin-top:10px">Names and emails stay hidden until you turn on Show names. Tap a person to open their household.</p>`;
  },

  support() {
    const q = S.q;
    const list = S.tickets
      .filter((t) => S.section === 'all' || sectionOf(t) === S.section)
      .filter((t) => !q || `${t.ref} ${t.subject} ${t.body} ${t.household_code ?? ''}`.toLowerCase().includes(q));
    const n = (k: Section) => S.tickets.filter((t) => sectionOf(t) === k && t.status !== 'closed').length;
    const chips = `<div class="filters" role="group" aria-label="Show" style="margin-bottom:14px">${([['all', 'All', S.tickets.filter((t) => t.status !== 'closed').length], ['support', SECTION_NAME.support, n('support')], ['credits', SECTION_NAME.credits, n('credits')], ['errors', SECTION_NAME.errors, n('errors')]] as [string, string, number][]).map(([k, t, c]) => `<button class="chip" type="button" data-section="${k}" aria-pressed="${S.section === k}">${t} <span class="num">${c}</span></button>`).join('')}</div>`;
    const t = list.find((x) => x.id === S.selected) ?? list[0];
    if (!t) return chips + (S.tickets.length ? '<p class="empty">Nothing open here.</p>' : '<p class="empty">No support messages yet. Messages from the app and emails to support@choremaxx.app land here.</p>');
    S.selected = t.id;
    const h = hhByCode(t.household_code);
    const replies = S.replies.filter((r) => r.ticket_id === t.id);
    return `${chips}
    <div class="inbox">
      <div class="tickets" role="listbox" aria-label="Tickets">${list.map((x) => `
        <button class="ticket ${x.status === 'new' ? 'unread' : ''}" role="option" aria-selected="${x.id === t.id}" data-ticket="${esc(x.id)}" type="button">
          <div class="top"><span class="subj">${esc(x.subject || '(no subject)')}</span><span class="when">${ago(x.received_at)}</span></div>
          <div class="preview">${esc(x.body)}</div>
          <div class="top" style="gap:6px">${ticketPill(x.status)}<span class="pill p-muted">${x.via === 'email' ? 'Email' : 'In app'}</span><span class="pill sec-${sectionOf(x)}">${SECTION_NAME[sectionOf(x)]}</span><span class="mono" style="color:var(--subtle)">${esc(x.ref)}</span></div>
        </button>`).join('')}
      </div>
      <div class="thread">
        <div class="card">
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between">
            <h2 style="font-size:19px">${esc(t.subject || '(no subject)')}</h2>
            <span style="display:flex;gap:8px;flex-wrap:wrap">
            <select class="input" id="ticket-section" style="width:auto;padding:6px 10px" aria-label="Section">
              ${(['support', 'credits', 'errors'] as const).map((k) => `<option value="${k}" ${k === sectionOf(t) ? 'selected' : ''}>${SECTION_NAME[k]}</option>`).join('')}
            </select>
            <select class="input" id="ticket-status" style="width:auto;padding:6px 10px" aria-label="Ticket status">
              ${(['new', 'open', 'waiting', 'closed'] as const).map((s) => `<option value="${s}" ${s === t.status ? 'selected' : ''}>${s[0].toUpperCase() + s.slice(1)}</option>`).join('')}
            </select>
            </span>
          </div>
          <div class="context" style="margin-top:14px">
            <div><div class="k">Household</div><div class="v">${h ? `<a href="#" data-open="${esc(h.code)}" style="color:var(--accent)">${esc(label(h))}</a>` : t.household_code ? esc(t.household_code) : 'Not linked'}</div></div>
            <div><div class="k">Plan</div><div class="v">${h ? pill(h.status) : '—'}</div></div>
            <div><div class="k">From</div><div class="v">${esc(t.from_name ?? '—')}${t.member_role ? ` · ${esc(t.member_role)}` : ''}</div></div>
            <div><div class="k">Reply to</div><div class="v mono">${esc(t.from_email ?? '—')}</div></div>
            <div><div class="k">App</div><div class="v">${esc(t.app_version ?? '—')}</div></div>
            <div><div class="k">Device</div><div class="v">${esc(t.device ?? '—')}</div></div>
          </div>
        </div>
        <article class="msg"><header>${ticketPill(t.status)}<strong>${esc(t.from_name ?? maskEmail(t.from_email))}</strong><span class="hint">${fmtTime(t.received_at)} · ${t.via === 'email' ? 'by email' : 'from the app'}</span>${t.error_count ? `<span class="pill p-lapsed">${plural(t.error_count, 'error')} attached</span>` : ''}</header><div class="body">${esc(t.body)}</div>
          ${shotsHtml(t)}
          ${t.error_log ? `<details open style="margin-top:10px"><summary class="hint">Error log</summary><pre class="mono" style="white-space:pre-wrap;overflow-wrap:anywhere;max-height:260px;overflow:auto">${esc(t.error_log)}</pre></details>` : ''}
        </article>
        ${replies.map((r) => `<article class="msg ${r.direction === 'out' ? 'ours' : ''}"><header><strong>${r.direction === 'out' ? 'ChoreMaxx support' : esc(r.author ?? 'Customer')}</strong><span class="hint">${fmtTime(r.at)}${r.direction === 'out' && r.author ? ` · ${esc(r.author)}` : ''}</span></header><div class="body">${esc(r.body)}</div></article>`).join('')}
        <form class="reply" id="reply-form">
          <label for="reply" class="hint">${t.from_email ? `Reply to ${esc(t.from_email)} — sent from support@choremaxx.app` : 'This message has no reply address (sent without an email on file).'}</label>
          <textarea id="reply" placeholder="Write a reply…" ${t.from_email ? '' : 'disabled'}></textarea>
          <div class="actions">
            <button class="btn ghost" type="button" id="close-ticket">Close without reply</button>
            <button class="btn ghost" type="submit" data-close="1" ${t.from_email ? '' : 'disabled'}>Send and close</button>
            <button class="btn" type="submit" ${t.from_email ? '' : 'disabled'}>Send reply</button>
          </div>
        </form>
      </div>
    </div>`;
  },

  credits() {
    const H = S.households;
    const banked = H.reduce((s, h) => s + (h.bought_actions - h.spent_bought_actions), 0);
    const usedMonth = H.reduce((s, h) => s + h.actions_this_month, 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const month = S.packs.filter((p) => String(p.month).slice(0, 7) === thisMonth);
    const sizes = ['small', 'medium', 'large'];
    const counts = sizes.map((k) => month.find((p) => p.pack === k)?.packs ?? 0);
    const totalActs = S.mix.reduce((s, m) => s + m.actions, 0) || 1;
    const colors = ['var(--accent)', 'var(--info)', 'var(--good)', 'var(--warn)', 'var(--subtle)', 'var(--bad)', 'var(--muted)', 'var(--fg)'];
    const kindName: Record<string, string> = { task: 'Tasks', grocery: 'Groceries', event: 'Calendar', homework: 'Homework', itinerary_stop: 'Trips', place_save: 'Places', complete: 'Completions', reward: 'Rewards' };
    return `
    <div class="grid kpis">
      <div class="card kpi"><div class="label">Actions used this month</div><div class="value num">${usedMonth.toLocaleString()}</div><div class="delta">across ${H.filter((h) => h.actions_this_month).length} households</div></div>
      <div class="card kpi"><div class="label">Bought, not yet spent</div><div class="value num">${banked.toLocaleString()}</div><div class="delta">bought actions never expire</div></div>
      <div class="card kpi"><div class="label">Packs sold this month</div><div class="value num">${counts.reduce((a, b) => a + b, 0)}</div><div class="delta">$${month.reduce((s, p) => s + p.packs * (PACK_PRICE[p.pack] ?? 0), 0).toFixed(2)} list price</div></div>
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="card chart"><div class="section-title" style="margin-top:0"><h2>Packs sold</h2><p class="hint">this month, by size</p></div>
        ${barSeries(counts, sizes.map((k) => `${PACK_SIZE[k]} actions`), (n) => String(n), `Packs sold this month: ${counts.join(', ')}`)}</div>
      <div class="card"><div class="section-title" style="margin-top:0"><h2>What Poppins was asked to do</h2><p class="hint">this month, share of actions</p></div>
        ${S.mix.length ? `<div class="stack" style="height:14px">${S.mix.map((m, i) => `<i style="width:${(m.actions / totalActs) * 100}%;background:${colors[i % colors.length]}"></i>`).join('')}</div>
        <div class="legend">${S.mix.map((m, i) => `<span style="--c:${colors[i % colors.length]}">${esc(kindName[m.act_kind] ?? m.act_kind)} ${Math.round((m.actions / totalActs) * 100)}%</span>`).join('')}</div>` : '<p class="empty">No Poppins actions this month yet.</p>'}
        <p class="hint" style="margin-top:14px">Counts only. What people said to Poppins is never read.</p>
      </div>
    </div>
    <div class="grid two" style="margin-top:14px">
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Credit and billing messages</h2><button class="btn ghost small" data-go="support" data-section-go="credits" type="button">Open</button></div>
        <div class="list">${S.tickets.filter((t) => sectionOf(t) === 'credits').slice(0, 6).map(ticketRow).join('') || '<p class="empty">No credit or billing messages.</p>'}</div></div>
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Purchase and Poppins errors</h2><p class="hint">last 9 days</p></div>
        <div class="list">${S.errors.filter((e) => errSection(e) === 'credits').slice(0, 6).map(errRow).join('') || '<p class="empty">No purchase or Poppins errors.</p>'}</div></div>
    </div>
    <div class="section-title"><h2>Heaviest users this month</h2></div>
    <div class="card"><div class="list">${
      [...H].sort((a, b) => b.actions_this_month - a.actions_this_month).filter((h) => h.actions_this_month).slice(0, 8).map((h) => `
      <div class="row" data-open="${esc(h.code)}" role="button" tabindex="0">${avatar(h)}<div class="grow"><div class="title">${esc(label(h))}</div><div class="meta">${h.actions_this_month} this month · ${(h.bought_actions - h.spent_bought_actions).toLocaleString()} banked</div></div>${pill(h.status)}</div>`).join('') || '<p class="empty">No Poppins use this month yet.</p>'
    }</div></div>`;
  },

  errors() {
    const max = Math.max(1, ...S.deletion.map((x) => x.n));
    const sevColor = (e: ErrorGroup) => (e.category === 'billing' || e.total >= 20 ? 'bad' : e.total >= 5 ? 'warn' : 'info');
    const feedback = S.tickets.filter((t) => sectionOf(t) === 'errors').slice(0, 8);
    const list = S.errors.filter((e) => errSection(e) === 'errors');
    return `
    <div class="section-title" style="margin-top:0"><h2>App errors</h2><p class="hint">grouped, last 9 days</p></div>
    <div class="card" style="padding:0">${
      list.map((e) => `
      <div class="err"><div class="sev" style="background:var(--${sevColor(e)})"></div>
        <div style="min-width:0"><div class="msgline">${esc(e.title)}</div><div class="hint" style="margin-top:3px">${esc(e.source)}${e.category ? ` · ${esc(e.category)}` : ''} · ${e.total} times · ${e.households} households · last ${ago(e.last_at)}</div>${ticketLinks(e)}</div>
        ${spark(e.per_day)}
      </div>`).join('') || '<p class="empty" style="padding:16px">No errors reported in the last 9 days.</p>'
    }</div>
    <div class="grid two" style="margin-top:14px">
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Why people deleted their account</h2><p class="hint">last 30 days</p></div>
        <div class="list">${S.deletion.map(({ reason, n }) => `<div class="row"><div class="grow"><div class="title" style="font-weight:500">${esc(reason)}</div><div class="bar" style="margin-top:6px"><i style="width:${(n / max) * 100}%;background:var(--accent)"></i></div></div><span class="num" style="font-weight:600">${n}</span></div>`).join('') || '<p class="empty">No deletions in the last 30 days.</p>'}</div>
      </div>
      <div class="card"><div class="section-title" style="margin-top:0"><h2>Feedback and error reports</h2><p class="hint">from the app’s Support screen</p></div>
        <div class="list">${feedback.map(ticketRow).join('') || '<p class="empty">Nothing yet.</p>'}</div>
      </div>
    </div>`;
  },
};

function drawer(code: string) {
  const h = hhByCode(code);
  if (!h) return;
  void audit('view_household', code);
  const tickets = S.tickets.filter((t) => t.household_code === code);
  $('#layer').innerHTML = `<div class="scrim" data-close></div>
  <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-title">
    <button class="btn ghost small close" data-close type="button">Close</button>
    <div class="hh">${avatar(h, 44)}<div><h2 id="dr-title" style="font-size:21px">${esc(label(h))}</h2><div class="mono" style="color:var(--subtle)">${esc(h.code)} · since ${fmt(h.created_at, { month: 'short', day: 'numeric', year: 'numeric' })}${h.environment ? ` · ${esc(h.environment)}` : ''}</div></div></div>
    <div class="card" style="display:grid;gap:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${pill(h.status)}<span class="hint">${plan(h) === 'yearly' ? 'Yearly · $49.99' : plan(h) === 'monthly' ? 'Monthly · $6.99' : 'No plan'}</span></div>
      ${daysCell(h)}
      <div class="hint">Renewal ${h.will_renew === null ? 'unknown' : h.will_renew ? 'on' : 'off'} · ${h.members} people${h.shared_devices ? ` · ${h.shared_devices} shared tablet` : ''} · last active ${ago(h.last_active)}</div>
    </div>
    <div class="card" style="display:grid;gap:8px"><strong>Poppins actions</strong>${creditsCell(h)}<div class="hint">Bought ${h.bought_actions.toLocaleString()} · spent ${h.spent_bought_actions.toLocaleString()} · ${h.actions_this_month} used this month</div></div>
    <div class="card" style="display:grid;gap:6px"><strong>People</strong>${S.users.filter((u) => u.household_code === code).map((u) => `<div class="row" style="padding:6px 0"><div class="grow"><div class="title">${esc(S.reveal ? u.display_name || '—' : u.user_code)}</div><div class="meta">${esc(u.role)} · last active ${ago(u.last_seen_at ?? u.last_sign_in_at)}</div></div>${u.errors_30d ? `<span class="pill p-lapsed">${plural(u.errors_30d, 'error')}</span>` : ''}</div>`).join('') || '<p class="hint">No one listed.</p>'}</div>
    <div><strong>Support</strong><div class="list">${tickets.map(ticketRow).join('') || '<p class="empty">No messages from this household.</p>'}</div></div>
    <p class="note">Read-only. Billing changes happen through Apple; this console can’t charge, refund or change a plan.</p>
  </aside>`;
  ($('#layer .drawer .close') as HTMLButtonElement).focus();
}

// ── Render ──────────────────────────────────────────────────────────────────────────────
/** Moji on KPI cards and empty states, matched by their (unchanged) wording. */
const KPI_MOJI: [RegExp, string][] = [
  [/paying/i, 'crown'], [/trial/i, 'seedling'], [/revenue/i, 'gem'], [/credit packs|packs sold/i, 'gift'],
  [/^people$/i, 'heartHome'], [/active this week/i, 'fire'], [/wrote to support/i, 'mic'], [/hit an error/i, 'tools'],
  [/support/i, 'mic'], [/actions used/i, 'sparkles'], [/not yet spent/i, 'basket'],
];
function decorate() {
  document.querySelectorAll<HTMLElement>('#view .kpi:not([data-m])').forEach((el) => {
    el.dataset.m = '1';
    const t = el.querySelector('.label')?.textContent ?? '';
    const hit = KPI_MOJI.find(([re]) => re.test(t));
    if (hit) el.insertAdjacentHTML('afterbegin', `<span class="kpi-moji">${moji(hit[1], 24)}</span>`);
  });
  document.querySelectorAll<HTMLElement>('.empty:not([data-m])').forEach((el) => {
    el.dataset.m = '1';
    if (el.tagName === 'TD') return;
    el.insertAdjacentHTML('afterbegin', `<span class="empty-moji">${moji('plant', 28)}</span>`);
  });
}
const NAV: [typeof S.view, string, string][] = [
  ['overview', 'Overview', 'home'],
  ['households', 'Households', 'heartHome'],
  ['users', 'Users', 'star'],
  ['support', 'Support', 'mic'],
  ['credits', 'Credits & AI', 'sparkles'],
  ['errors', 'Errors & feedback', 'tools'],
];
const SUB: Record<typeof S.view, string> = {
  overview: '',
  households: 'Plans, time left and AI use — no household content',
  users: 'Everyone in a household: role, plan, last active',
  support: 'App messages and emails to support@choremaxx.app',
  credits: 'Packs bought and actions spent',
  errors: 'Error reports, and why people leave',
};
const openIn = (k: Section) => S.tickets.filter((t) => t.status === 'new' && sectionOf(t) === k).length;
function render() {
  const unanswered = S.tickets.filter((t) => t.status === 'new').length;
  $('#nav').innerHTML = NAV.map(([k, t, icon]) => `<button class="navbtn" type="button" data-go="${k}" ${k === S.view ? 'aria-current="page"' : ''}><span class="navicon">${moji(icon, 20)}</span><span class="label">${t}</span>${k === 'support' && unanswered ? `<span class="count">${unanswered}</span>` : ''}${k === 'credits' && openIn('credits') ? `<span class="count">${openIn('credits')}</span>` : ''}${k === 'errors' && openIn('errors') ? `<span class="count">${openIn('errors')}</span>` : ''}</button>`).join('');
  $('#view-title').textContent = NAV.find((n) => n[0] === S.view)![1];
  $('#view-sub').textContent = S.view === 'overview' ? (S.updatedAt ? `Updated ${fmtTime(S.updatedAt.toISOString())}` : '') : SUB[S.view];
  const ready = S.loaded.households && S.loaded.tickets && S.loaded.extras && S.loaded.users;
  queueMicrotask(loadShots);
  $('#view').innerHTML = (S.error ? `<div class="err-banner">${esc(S.error)} <button class="btn ghost small" type="button" id="retry">Try again</button></div>` : '') + (ready ? V[S.view]() : S.error ? '' : '<p class="loading">Loading live data…</p>');
}

// ── Screenshots (private bucket, signed for 10 minutes) ─────────────────────────────────
const shotCache = new Map<string, string>();
function shotsHtml(t: Ticket): string {
  const paths = t.meta?.attachmentPaths ?? [];
  const urls = (t.meta?.screenshotUrls ?? []).filter((u) => /^https:\/\//.test(u));
  if (!paths.length && !urls.length) return '';
  const cell = (src: string, path = '') =>
    `<a class="shot" ${path ? `data-shot="${esc(path)}"` : `href="${esc(src)}"`} target="_blank" rel="noopener"><img alt="Screenshot" ${src ? `src="${esc(src)}"` : ''}/></a>`;
  return `<div class="shots">${paths.map((p) => cell(shotCache.get(p) ?? '', p)).join('')}${urls.map((u) => cell(u)).join('')}</div>`;
}
async function loadShots() {
  const els = [...document.querySelectorAll<HTMLAnchorElement>('a[data-shot]')];
  const need = els.map((e) => e.dataset.shot!).filter((p) => !shotCache.has(p));
  if (need.length && sb) {
    const { data } = await sb.storage.from('support-attachments').createSignedUrls(need, 600);
    for (const d of data ?? []) if (d.path && d.signedUrl) shotCache.set(d.path, d.signedUrl);
  }
  for (const e of els) {
    const url = shotCache.get(e.dataset.shot!);
    if (url) { e.href = url; e.querySelector('img')!.src = url; }
  }
}

// ── Auth ────────────────────────────────────────────────────────────────────────────────
function showSignin(note?: string) {
  $('#app').hidden = true;
  $('#signin').hidden = false;
  if (note) $('#signin-note').textContent = note;
}
async function enter(session: Session) {
  S.session = session;
  const { data: isStaff, error } = await sb!.rpc('is_console_staff');
  if (error || !isStaff) {
    await sb!.auth.signOut();
    showSignin(error ? `Could not check access: ${error.message}` : 'This address isn’t on the staff list.');
    return;
  }
  $('#who').textContent = session.user.email ?? '';
  $('#signin').hidden = true;
  $('#app').hidden = false;
  render();
  await loadAll();
  subscribeLive();
}

let channel: ReturnType<NonNullable<typeof sb>['channel']> | null = null;
function subscribeLive() {
  if (!sb || channel) return;
  channel = sb
    .channel('console-support')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, async () => {
      await loadTickets().catch(() => undefined);
      render();
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'app_error_reports' }, async () => {
      await loadExtras().catch(() => undefined);
      render();
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'support_replies' }, async () => {
      await loadTickets().catch(() => undefined);
      render();
    })
    .subscribe((status) => {
      const dot = $('#live-dot');
      if (!dot) return;
      dot.textContent = status === 'SUBSCRIBED' ? 'Live' : status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' ? 'Refreshes every 5 min' : 'Connecting…';
    });
  // Everything refreshes every 5 minutes while the page is open (also covers realtime being off).
  setInterval(() => void Promise.all([loadHouseholds(), loadExtras(), loadTickets(), loadUsers()]).then(() => { S.updatedAt = new Date(); render(); }).catch(() => undefined), 5 * 60 * 1000);
}

// ── Events ──────────────────────────────────────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-go],[data-open],[data-ticket],[data-ticket-go],[data-filter],[data-section],[data-close],#retry,#close-ticket');
  if (!t) return;
  if (t.matches('a')) e.preventDefault();
  if (t.id === 'retry') { void loadAll(); return; }
  if (t.id === 'close-ticket') { void setStatus('closed'); return; }
  if (t.dataset.section) { S.section = t.dataset.section as typeof S.section; S.selected = null; render(); return; }
  if (t.dataset.go) { S.section = (t.dataset.sectionGo as typeof S.section) ?? 'all'; S.view = t.dataset.go as typeof S.view; S.q = ''; ($('#search') as HTMLInputElement).value = ''; render(); }
  else if (t.dataset.open) drawer(t.dataset.open);
  else if (t.dataset.ticket) { S.selected = t.dataset.ticket; const x = S.tickets.find((k) => k.id === S.selected); if (x?.status === 'new') void setStatus('open', true); render(); }
  else if (t.dataset.ticketGo) { S.selected = t.dataset.ticketGo; S.view = 'support'; $('#layer').innerHTML = ''; render(); }
  else if (t.dataset.filter) { S.filter = t.dataset.filter as typeof S.filter; render(); }
  else if ('close' in t.dataset && !t.matches('button[type="submit"]')) $('#layer').innerHTML = '';
});
document.addEventListener('keydown', (e) => {
  const el = e.target as HTMLElement;
  if (e.key === 'Escape') $('#layer').innerHTML = '';
  if (e.key === 'Enter' && el.dataset?.open) drawer(el.dataset.open);
  if (e.key === 'Enter' && el.dataset?.ticketGo) { S.selected = el.dataset.ticketGo; S.view = 'support'; render(); }
});
document.addEventListener('change', (e) => {
  const el = e.target as HTMLSelectElement;
  if (el.id === 'ticket-status') void setStatus(el.value as Ticket['status']);
  if (el.id === 'ticket-section') void setSection(el.value as Section);
});

async function setSection(section: Section) {
  const t = S.tickets.find((x) => x.id === S.selected);
  if (!t || !sb) return;
  const { error } = await sb.from('support_tickets').update({ section }).eq('id', t.id);
  if (error) { toast(`Couldn’t move: ${error.message}`); return; }
  t.section = section;
  void audit('section', `${t.ref}:${section}`);
  render();
  toast(`Moved to ${SECTION_NAME[section]}`);
}
async function setStatus(status: Ticket['status'], quiet = false) {
  const t = S.tickets.find((x) => x.id === S.selected);
  if (!t || !sb) return;
  const { error } = await sb.from('support_tickets').update({ status }).eq('id', t.id);
  if (error) { toast(`Couldn’t update: ${error.message}`); return; }
  t.status = status;
  void audit('status', `${t.ref}:${status}`);
  render();
  if (!quiet) toast(status === 'closed' ? 'Ticket closed' : 'Status updated');
}

document.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  if (form.id === 'signin-form') {
    if (!sb) { $('#signin-note').textContent = 'Sign-in isn’t available right now. Try again later.'; return; }
    const email = ($('#email') as HTMLInputElement).value.trim();
    if (!email.includes('@')) { $('#signin-note').textContent = 'Enter your work email.'; return; }
    const btn = form.querySelector('button')!;
    btn.disabled = true;
    const { error } = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: window.location.origin } });
    btn.disabled = false;
    $('#signin-note').textContent = error ? `Couldn’t send the link: ${error.message}` : `Check ${email} for your sign-in link.`;
    return;
  }
  if (form.id === 'reply-form') {
    const ta = $('#reply') as HTMLTextAreaElement;
    const text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    const t = S.tickets.find((x) => x.id === S.selected);
    if (!t || !sb) return;
    const submitter = (e as SubmitEvent).submitter as HTMLButtonElement | null;
    const close = submitter?.dataset.close === '1';
    form.querySelectorAll('button').forEach((b) => (b.disabled = true));
    const { error } = await sb.functions.invoke('support-reply', { body: { ticketId: t.id, text, close } });
    if (error) {
      form.querySelectorAll('button').forEach((b) => (b.disabled = false));
      toast(`Not sent: ${error.message}`);
      return;
    }
    await loadTickets();
    render();
    toast(close ? 'Reply sent and ticket closed' : 'Reply sent');
  }
});

($('#search') as HTMLInputElement).addEventListener('input', (e) => {
  S.q = (e.target as HTMLInputElement).value.trim().toLowerCase();
  if (S.view !== 'households' && S.view !== 'support' && S.view !== 'users') S.view = 'households';
  render();
});
$('#privacy').addEventListener('click', (e) => {
  S.reveal = !S.reveal;
  (e.currentTarget as HTMLElement).setAttribute('aria-checked', String(S.reveal));
  $('#privacy-hint').textContent = S.reveal ? 'On — logged for audit' : 'Off — households are codes';
  if (S.reveal) void audit('reveal_names');
  render();
});
$('#signout').addEventListener('click', async () => {
  await sb?.auth.signOut();
  channel?.unsubscribe();
  channel = null;
  $('#layer').innerHTML = '';
  showSignin('Signed out.');
});

// ── Boot ────────────────────────────────────────────────────────────────────────────────
(async () => {
  if (!sb) { console.error('ChoreMaxx Console: Supabase URL / anon key not set for this deployment.'); showSignin(); return; }
  const { data } = await sb.auth.getSession();
  if (data.session) await enter(data.session);
  else showSignin();
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session && !S.session) void enter(session);
    if (event === 'SIGNED_OUT') S.session = null;
  });
})();

new MutationObserver(decorate).observe(document.body, { childList: true, subtree: true });
document.querySelector('.art-tiles')!.innerHTML = ['broom', 'basket', 'sparkles', 'trophy', 'plant', 'paw', 'calendar', 'cart', 'star']
  .map((m, i) => `<span class="tile" style="--r:${((i * 7) % 5 - 2) * 4}deg;--d:${i * 0.35}s">${moji(m, 40)}</span>`)
  .join('');
