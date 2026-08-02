#!/bin/bash
# Script to update trends.html with current JS/CSS filenames after build

SITE_DIR="/var/www/alex_gsm_at_usr/data/www/alex-gsm.at"

# Get current JS and CSS filenames
JS_FILE=$(ls $SITE_DIR/static/js/main.*.js 2>/dev/null | grep -v LICENSE | head -1 | xargs basename)
CSS_FILE=$(ls $SITE_DIR/static/css/main.*.css 2>/dev/null | head -1 | xargs basename)

if [ -n "$JS_FILE" ] && [ -n "$CSS_FILE" ]; then
    # Update trends.html with new filenames
    sed -i "s|/static/js/main\.[^\"]*\.js|/static/js/$JS_FILE|g" $SITE_DIR/trends.html
    sed -i "s|/static/css/main\.[^\"]*\.css|/static/css/$CSS_FILE|g" $SITE_DIR/trends.html
    echo "Updated trends.html with: $JS_FILE and $CSS_FILE"
else
    echo "Error: Could not find JS or CSS files"
fi
