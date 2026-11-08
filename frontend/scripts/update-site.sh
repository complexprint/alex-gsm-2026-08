#!/usr/bin/env bash
set -e

echo "=== 1. Building React app ==="
CI=false npm run build

echo "=== 2. Generating dynamic sitemap ==="
npm run sitemap

echo "=== 3. Prerendering all routes ==="
npm run prerender

echo "=== 4. Running SEO audit ==="
npm run seo:audit

echo "=== All checks and builds completed successfully! ==="
