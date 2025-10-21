#!/bin/bash
# Quick performance check for Travel & Tours website

echo ""
echo "⚡ PERFORMANCE QUICK CHECK"
echo "=========================="
echo ""

# Check if build exists
if [ ! -d ".next" ]; then
  echo "⚠️  No production build found. Running build..."
  npm run build
else
  echo "✅ Production build exists"
fi

echo ""
echo "📊 BUNDLE SIZE ANALYSIS"
echo "----------------------"

# Re-run build to show bundle sizes
echo "Building for production..."
npm run build 2>&1 | grep -A 30 "Route (app)" | head -35

echo ""
echo "🎯 PERFORMANCE TARGETS"
echo "---------------------"
echo ""
echo "Bundle Size Targets:"
echo "  ✅ First Load JS < 200 KB"
echo "  ✅ Page Size < 50 KB"
echo "  ✅ CSS Bundle < 30 KB"
echo ""

# Check bundle sizes from build output
LARGEST_BUNDLE=$(npm run build 2>&1 | grep "First Load JS" | awk '{print $4}' | sort -nr | head -1)

echo "📈 Your Largest Bundle: Check output above"
echo ""

echo "✅ Core Web Vitals Targets:"
echo "  • LCP (Largest Contentful Paint): < 2.5s"
echo "  • FID (First Input Delay): < 100ms"  
echo "  • CLS (Cumulative Layout Shift): < 0.1"
echo ""

echo "🔍 NEXT STEPS"
echo "-------------"
echo ""
echo "1. Review bundle sizes above"
echo "2. Run Lighthouse audit:"
echo "   ./run-lighthouse.sh"
echo ""
echo "3. Test on mobile device:"
echo "   Open: http://10.119.170.144:3000"
echo ""
echo "4. Check detailed report:"
echo "   code PERFORMANCE_REPORT.md"
echo ""

echo "✅ Performance check complete!"
echo ""

