#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

require_dir_with_files() {
  local dir="$1"
  local label="$2"
  if [[ ! -d "$dir" ]]; then
    echo "error: missing $label directory: $dir" >&2
    exit 1
  fi
  if [[ -z "$(find "$dir" -mindepth 1 -maxdepth 1 2>/dev/null | head -1)" ]]; then
    echo "error: $label is empty: $dir" >&2
    echo "Copy the redesign export into handoff/ first (see handoff/README.md)." >&2
    exit 1
  fi
}

require_dir_with_files "handoff/app" "handoff/app"
require_dir_with_files "handoff/components" "handoff/components"
require_dir_with_files "handoff/lib" "handoff/lib"

echo "Integrating redesign handoff from handoff/ …"
cp -R handoff/app/. app/
cp -R handoff/components/. components/
cp -R handoff/lib/. lib/

cat <<'EOF'

Done. Copied:
  handoff/app/*        → app/
  handoff/components/* → components/
  handoff/lib/*        → lib/

Next:
  1. Reconcile protected files (palette bootstrap, /auth/callback, /api/contact) — handoff/README.md
  2. pnpm install && pnpm dev
  3. pnpm build

EOF
