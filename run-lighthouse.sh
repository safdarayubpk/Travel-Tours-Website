#!/bin/bash
# Lighthouse audit script for Travel & Tours website

echo ""
echo "🔍 LIGHTHOUSE PERFORMANCE & ACCESSIBILITY AUDIT"
echo "================================================"
echo ""

BASE_URL="http://localhost:3000"

echo "📋 Testing pages with Lighthouse..."
echo ""

# Check if lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "⚠️  Lighthouse not found. Installing globally..."
    npm install -g lighthouse
fi

echo "🏠 Testing Home Page..."
lighthouse "$BASE_URL" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-reports/home-report.html \
  --quiet

echo ""
echo "🗺️  Testing Tours Page..."
lighthouse "$BASE_URL/tours" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-reports/tours-report.html \
  --quiet

echo ""
echo "📧 Testing Contact Page..."
lighthouse "$BASE_URL/contact" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-reports/contact-report.html \
  --quiet

echo ""
echo "📊 Testing Single Tour Page..."
lighthouse "$BASE_URL/tours/african-safari" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html \
  --output-path=./lighthouse-reports/tour-detail-report.html \
  --quiet

echo ""
echo "✅ Lighthouse audits complete!"
echo ""
echo "📂 Reports saved to: ./lighthouse-reports/"
echo ""
echo "To view reports:"
echo "  open lighthouse-reports/home-report.html"
echo "  open lighthouse-reports/tours-report.html"
echo "  open lighthouse-reports/contact-report.html"
echo "  open lighthouse-reports/tour-detail-report.html"
echo ""

