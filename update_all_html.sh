#!/bin/bash
# Script to update all HTML files with current JS/CSS filenames after build

SITE_DIR="/var/www/alex_gsm_at_usr/data/www/alex-gsm.at"

# Get current JS and CSS filenames
JS_FILE=$(ls $SITE_DIR/static/js/main.*.js 2>/dev/null | grep -v LICENSE | head -1 | xargs basename)
CSS_FILE=$(ls $SITE_DIR/static/css/main.*.css 2>/dev/null | head -1 | xargs basename)

if [ -n "$JS_FILE" ] && [ -n "$CSS_FILE" ]; then
    # Update all HTML files
    for file in $SITE_DIR/*.html; do
        sed -i "s|/static/js/main\.[^\"]*\.js|/static/js/$JS_FILE|g" "$file"
        sed -i "s|/static/css/main\.[^\"]*\.css|/static/css/$CSS_FILE|g" "$file"
    done
    echo "Updated all HTML files with: $JS_FILE and $CSS_FILE"
else
    echo "Error: Could not find JS or CSS files"
fi
