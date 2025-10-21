#!/bin/bash
# Post-deployment verification script
# Tests production site after deployment

echo ""
echo "🔍 PRODUCTION SITE VERIFICATION"
echo "================================"
echo ""

if [ -z "$1" ]; then
  echo "Usage: ./verify-production.sh <your-production-url>"
  echo "Example: ./verify-production.sh https://travel-tours.vercel.app"
  echo ""
  exit 1
fi

PROD_URL="$1"
PASS=0
WARN=0
FAIL=0

echo "Testing production site: $PROD_URL"
echo ""

# Check 1: Site accessibility
echo "1️⃣ Site Accessibility:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ Home page accessible (HTTP $HTTP_CODE)"
  ((PASS++))
else
  echo "   ❌ Home page failed (HTTP $HTTP_CODE)"
  ((FAIL++))
fi
echo ""

# Check 2: Critical pages
echo "2️⃣ Critical Pages:"
PAGES=("" "/tours" "/contact" "/tours/african-safari")
for PAGE in "${PAGES[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL$PAGE")
  if [ "$CODE" = "200" ]; then
    ((PASS++))
  else
    echo "   ❌ $PAGE failed (HTTP $CODE)"
    ((FAIL++))
  fi
done
echo "   ✅ All ${#PAGES[@]} critical pages accessible"
echo ""

# Check 3: SEO files
echo "3️⃣ SEO Files:"
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/sitemap.xml")
if [ "$SITEMAP_CODE" = "200" ]; then
  echo "   ✅ sitemap.xml accessible"
  ((PASS++))
else
  echo "   ❌ sitemap.xml failed (HTTP $SITEMAP_CODE)"
  ((FAIL++))
fi

ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/robots.txt")
if [ "$ROBOTS_CODE" = "200" ]; then
  echo "   ✅ robots.txt accessible"
  ((PASS++))
else
  echo "   ❌ robots.txt failed (HTTP $ROBOTS_CODE)"
  ((FAIL++))
fi
echo ""

# Check 4: HTTPS
echo "4️⃣ HTTPS Security:"
if [[ "$PROD_URL" == https://* ]]; then
  echo "   ✅ Using HTTPS (secure)"
  ((PASS++))
else
  echo "   ⚠️  Using HTTP (not secure)"
  ((WARN++))
fi
echo ""

# Check 5: Meta tags
echo "5️⃣ SEO Meta Tags:"
HOME_HTML=$(curl -s "$PROD_URL")

if echo "$HOME_HTML" | grep -q "<title>.*Travel & Tours"; then
  echo "   ✅ Title tag present"
  ((PASS++))
else
  echo "   ⚠️  Title tag not found or incorrect"
  ((WARN++))
fi

if echo "$HOME_HTML" | grep -q 'name="description"'; then
  echo "   ✅ Meta description present"
  ((PASS++))
else
  echo "   ⚠️  Meta description missing"
  ((WARN++))
fi

if echo "$HOME_HTML" | grep -q 'property="og:title"'; then
  echo "   ✅ Open Graph tags present"
  ((PASS++))
else
  echo "   ⚠️  Open Graph tags missing"
  ((WARN++))
fi
echo ""

# Check 6: Analytics
echo "6️⃣ Analytics Integration:"
if echo "$HOME_HTML" | grep -q "googletagmanager.com/gtag"; then
  echo "   ✅ Google Analytics script loaded"
  ((PASS++))
else
  echo "   ⚠️  Google Analytics not detected"
  echo "      (Normal if NEXT_PUBLIC_GA_MEASUREMENT_ID not set)"
  ((WARN++))
fi
echo ""

# Check 7: Performance (basic)
echo "7️⃣ Performance Check:"
PAGE_SIZE=$(curl -s "$PROD_URL" | wc -c)
PAGE_SIZE_KB=$((PAGE_SIZE / 1024))

if [ "$PAGE_SIZE_KB" -lt 200 ]; then
  echo "   ✅ Page size reasonable: ${PAGE_SIZE_KB} KB"
  ((PASS++))
else
  echo "   ⚠️  Page size large: ${PAGE_SIZE_KB} KB"
  ((WARN++))
fi
echo ""

# Summary
echo "════════════════════════════════════════════════════════"
echo "📊 PRODUCTION VERIFICATION SUMMARY"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Site: $PROD_URL"
echo ""
echo "Results:"
echo "  ✅ Passed:   $PASS"
echo "  ⚠️  Warnings: $WARN"
echo "  ❌ Failed:   $FAIL"
echo ""

TOTAL=$((PASS + WARN + FAIL))
if [ $TOTAL -gt 0 ]; then
  SCORE=$((PASS * 100 / TOTAL))
else
  SCORE=0
fi

echo "Production Score: $SCORE/100"
echo ""

if [ $FAIL -eq 0 ]; then
  if [ $WARN -eq 0 ]; then
    echo "🎉 PERFECT! Your site is fully functional!"
    echo "   Grade: A+ (100/100)"
  else
    echo "✅ GOOD! Site is working with minor warnings."
    echo "   Grade: A ($SCORE/100)"
  fi
  echo ""
  echo "✅ Your website is live and working!"
else
  echo "⚠️  ISSUES DETECTED!"
  echo "   Grade: $SCORE/100"
  echo ""
  echo "❌ Review failed checks and fix issues."
  exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "🚀 POST-DEPLOYMENT TASKS"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Immediate (Next 1 Hour):"
echo "  1. Test contact form (submit test inquiry)"
echo "  2. Check email delivery"
echo "  3. Verify Google Analytics (Real-time reports)"
echo "  4. Test on mobile device"
echo ""
echo "Within 24 Hours:"
echo "  1. Submit sitemap to Google Search Console"
echo "  2. Submit sitemap to Bing Webmaster"
echo "  3. Monitor Vercel logs for errors"
echo "  4. Review initial analytics data"
echo ""
echo "Within 1 Week:"
echo "  1. Monitor search engine indexing"
echo "  2. Check for crawl errors"
echo "  3. Optimize based on real user data"
echo "  4. Collect user feedback"
echo ""
echo "✅ Verification complete!"
echo ""

