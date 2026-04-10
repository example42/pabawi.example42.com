#!/usr/bin/env bash
# sync-upstream-docs.sh — Fetch documentation from the upstream pabawi repo
# and store it locally for the website to consume.
#
# Usage: ./scripts/sync-upstream-docs.sh
#
# This script downloads the markdown docs from github.com/example42/pabawi
# into docs/upstream/ so they can be used to update docs.html.
# It is designed to be run from the pabawi.example42.com repo root.

set -euo pipefail

REPO="example42/pabawi"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
DEST="docs/upstream"

# Also fetch the README
README_URL="${BASE_URL}/README.md"

# Upstream doc files to fetch (relative to repo root)
DOC_FILES=(
  "docs/configuration.md"
  "docs/user-guide.md"
  "docs/troubleshooting.md"
  "docs/docker-deployment.md"
  "docs/api.md"
  "docs/api-endpoints-reference.md"
  "docs/integrations-api.md"
  "docs/architecture.md"
  "docs/description.md"
  "docs/development.md"
  "docs/kubernetes-deployment.md"
  "docs/integrations/bolt.md"
  "docs/integrations/puppetdb.md"
  "docs/integrations/puppetserver.md"
  "docs/integrations/hiera.md"
  "docs/integrations/ansible.md"
  "docs/integrations/ssh.md"
)

echo "==> Syncing upstream docs from ${REPO}@${BRANCH}"
echo ""

# Create destination directories
mkdir -p "${DEST}/integrations"

# Fetch README
echo "  Fetching README.md ..."
curl -sSfL "${README_URL}" -o "${DEST}/README.md" 2>/dev/null || echo "  [WARN] Failed to fetch README.md"

# Fetch each doc file
for file in "${DOC_FILES[@]}"; do
  # Strip the leading "docs/" to get the local path
  local_path="${DEST}/${file#docs/}"
  echo "  Fetching ${file} ..."
  curl -sSfL "${BASE_URL}/${file}" -o "${local_path}" 2>/dev/null || echo "  [WARN] Failed to fetch ${file}"
done

# Write a manifest with fetch timestamp
cat > "${DEST}/.sync-manifest.json" <<EOF
{
  "repo": "${REPO}",
  "branch": "${BRANCH}",
  "synced_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "files": [
    "README.md",
$(printf '    "%s",\n' "${DOC_FILES[@]}" | sed 's|docs/||g' | sed '$ s/,$//')
  ]
}
EOF

echo ""
echo "==> Done. Upstream docs saved to ${DEST}/"
echo "    Manifest: ${DEST}/.sync-manifest.json"
echo ""
echo "Next step: Use the Kiro hook 'Sync Pabawi Docs' to update docs.html"
echo "based on the fetched upstream content."
