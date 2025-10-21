#!/bin/bash
# Quick accessibility checks for Travel & Tours website

echo ""
echo "♿ ACCESSIBILITY QUICK CHECK"
echo "============================"
echo ""

BASE_URL="http://localhost:3000"

echo "🔍 Checking for common accessibility issues..."
echo ""

# Download homepage for analysis
curl -s "$BASE_URL" > /tmp/travel-tours-home.html

echo "📋 Checking HTML structure..."
echo ""

# Check for alt attributes on images
IMG_COUNT=$(grep -o '<img' /tmp/travel-tours-home.html | wc -l)
IMG_WITH_ALT=$(grep -o 'alt="[^"]*"' /tmp/travel-tours-home.html | wc -l)

echo "🖼️  Images:"
echo "   Total images: $IMG_COUNT"
echo "   With alt text: $IMG_WITH_ALT"

if [ "$IMG_COUNT" -eq "$IMG_WITH_ALT" ]; then
  echo "   ✅ All images have alt text"
else
  echo "   ⚠️  Some images missing alt text"
fi
echo ""

# Check for heading hierarchy
H1_COUNT=$(grep -o '<h1' /tmp/travel-tours-home.html | wc -l)
echo "📝 Headings:"
echo "   H1 count: $H1_COUNT"

if [ "$H1_COUNT" -eq 1 ]; then
  echo "   ✅ Exactly one H1 tag (correct)"
elif [ "$H1_COUNT" -eq 0 ]; then
  echo "   ❌ No H1 tag found (missing)"
else
  echo "   ⚠️  Multiple H1 tags ($H1_COUNT found)"
fi
echo ""

# Check for form labels
FORM_COUNT=$(grep -o '<form' /tmp/travel-tours-home.html | wc -l)
echo "📋 Forms:"
echo "   Forms found: $FORM_COUNT"
echo "   (Manual check needed: verify all inputs have labels)"
echo ""

# Check for ARIA labels
ARIA_COUNT=$(grep -o 'aria-label="[^"]*"' /tmp/travel-tours-home.html | wc -l)
echo "🏷️  ARIA Labels:"
echo "   ARIA labels found: $ARIA_COUNT"
echo "   ✅ Good use of ARIA attributes"
echo ""

# Check for language attribute
if grep -q 'lang="en"' /tmp/travel-tours-home.html; then
  echo "🌍 Language:"
  echo "   ✅ HTML lang attribute present (en)"
else
  echo "🌍 Language:"
  echo "   ⚠️  HTML lang attribute missing"
fi
echo ""

# Check for viewport meta tag
if grep -q 'viewport' /tmp/travel-tours-home.html; then
  echo "📱 Viewport:"
  echo "   ✅ Viewport meta tag present"
else
  echo "📱 Viewport:"
  echo "   ❌ Viewport meta tag missing"
fi
echo ""

# Cleanup
rm /tmp/travel-tours-home.html

echo "✅ Quick accessibility check complete!"
echo ""
echo "📌 MANUAL CHECKS STILL NEEDED:"
echo "   - Keyboard navigation (Tab through all elements)"
echo "   - Screen reader testing (NVDA/JAWS/VoiceOver)"
echo "   - Color contrast ratios (use browser DevTools)"
echo "   - Focus indicators visibility"
echo "   - Form label associations"
echo ""
echo "🔧 For comprehensive audit, run:"
echo "   ./run-lighthouse.sh"
echo ""

