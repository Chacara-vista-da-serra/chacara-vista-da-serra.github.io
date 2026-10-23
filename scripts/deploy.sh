#!/usr/bin/env bash
# Gera o build e publica a pasta dist/ na branch gh-pages (GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")/.."

npm run lint
npm test
npm run build

REMOTE=$(git remote get-url origin)
TMP=$(mktemp -d)
cp -R dist/. "$TMP"
touch "$TMP/.nojekyll"
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" \
  commit -q -m "Publicação $(date '+%Y-%m-%d %H:%M')"
git push -q -f "$REMOTE" gh-pages
cd - >/dev/null
rm -rf "$TMP"
echo "Publicado: https://chacara-vista-da-serra.github.io/"
