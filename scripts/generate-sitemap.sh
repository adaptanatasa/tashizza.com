#!/usr/bin/env bash

set -euo pipefail

SITE_URL="https://tashizza.com"
OUTPUT_FILE="sitemap.xml"

cd "$(dirname "$0")/.."

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  find . -type f -name "*.html" \
    ! -path "./404.html" \
    ! -path "./biblioteke/caskanje/ljubavno-pismo-ucenju/og-galerija.html" \
    ! -path "./temp/*" \
    ! -path "./.git/*" \
    ! -name "*copy*" \
    | sort \
    | while read -r file; do

        clean_path="${file#./}"

        if [[ "$clean_path" == "index.html" ]]; then
            loc="${SITE_URL}/"
        else
            loc="${SITE_URL}/${clean_path}"
        fi

        lastmod=$(date -r "$file" +"%Y-%m-%d")

        cat <<EOF
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
EOF

    done

  echo '</urlset>'

} > "$OUTPUT_FILE"

echo "✅ Sitemap je uspešno napravljen: $OUTPUT_FILE"
