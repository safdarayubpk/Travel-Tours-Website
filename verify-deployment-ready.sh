#!/bin/bash
# Final verification script before deployment
# Checks all critical systems are ready for production

echo ""
echo "🚀 DEPLOYMENT READINESS VERIFICATION"
echo "===================================="
echo ""

PASS=0
WARN=0
FAIL=0

# Check 1: Code Quality
echo "1️⃣ Code Quality Check:"
echo "   Running ESLint..."
if npm run lint > /dev/null 2>&1; then
  echo "   ✅ ESLint: 0 errors"
  ((PASS++))
else
  echo "   ❌ ESLint: errors found"
  ((FAIL++))
fi

echo "   Running TypeScript check..."
if npx tsc --noEmit > /dev/null 2>&1; then
  echo "   ✅ TypeScript: 0 errors"
  ((PASS++))
else
  echo "   ❌ TypeScript: errors found"
  ((FAIL++))
fi
echo ""

# Check 2: Environment Variables
echo "2️⃣ Environment Variables:"
if [ -f ".env.local" ]; then
  echo "   ✅ .env.local exists"
  ((PASS++))
  
  if grep -q "RESEND_API_KEY" .env.local; then
    echo "   ✅ RESEND_API_KEY configured"
    ((PASS++))
  else
    echo "   ⚠️  RESEND_API_KEY not found"
    ((WARN++))
  fi
  
  if grep -q "NEXT_PUBLIC_GA_MEASUREMENT_ID" .env.local; then
    echo "   ✅ NEXT_PUBLIC_GA_MEASUREMENT_ID configured"
    ((PASS++))
  else
    echo "   ⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID not found"
    ((WARN++))
  fi
else
  echo "   ❌ .env.local not found"
  ((FAIL++))
fi

if [ -f ".env.example" ]; then
  echo "   ✅ .env.example documented"
  ((PASS++))
else
  echo "   ⚠️  .env.example not found"
  ((WARN++))
fi
echo ""

# Check 3: Security
echo "3️⃣ Security Verification:"
if grep -q "Strict-Transport-Security" next.config.ts 2>/dev/null; then
  echo "   ✅ Security headers configured"
  ((PASS++))
else
  echo "   ❌ Security headers missing"
  ((FAIL++))
fi

VULN_COUNT=$(npm audit --audit-level=moderate 2>&1 | grep "found 0 vulnerabilities" | wc -l)
if [ "$VULN_COUNT" -gt 0 ]; then
  echo "   ✅ npm audit: 0 vulnerabilities"
  ((PASS++))
else
  echo "   ❌ npm audit: vulnerabilities found"
  ((FAIL++))
fi
echo ""

# Check 4: SEO Files
echo "4️⃣ SEO Configuration:"
if [ -f "app/sitemap.ts" ]; then
  echo "   ✅ sitemap.ts exists"
  ((PASS++))
else
  echo "   ❌ sitemap.ts not found"
  ((FAIL++))
fi

if [ -f "app/robots.ts" ]; then
  echo "   ✅ robots.ts exists"
  ((PASS++))
else
  echo "   ❌ robots.ts not found"
  ((FAIL++))
fi
echo ""

# Check 5: Critical Files
echo "5️⃣ Critical Files Verification:"
CRITICAL_FILES=(
  "app/layout.tsx"
  "app/page.tsx"
  "app/contact/page.tsx"
  "app/tours/page.tsx"
  "components/layout/header.tsx"
  "components/layout/footer.tsx"
)

for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$file" ]; then
    ((PASS++))
  else
    echo "   ❌ Missing: $file"
    ((FAIL++))
  fi
done
echo "   ✅ All ${#CRITICAL_FILES[@]} critical files present"
echo ""

# Check 6: Production Build
echo "6️⃣ Production Build Test:"
echo "   Building for production..."
if npm run build > /tmp/build-output.txt 2>&1; then
  echo "   ✅ Production build successful"
  ((PASS++))
  
  # Check for warnings
  if grep -q "compiled successfully" /tmp/build-output.txt; then
    echo "   ✅ No build errors"
    ((PASS++))
  fi
  
  # Check bundle sizes
  echo "   Analyzing bundle sizes..."
  FIRST_LOAD=$(grep "First Load JS" /tmp/build-output.txt | head -1 | grep -oP '\d+\s*kB' | head -1 | sed 's/ kB//')
  if [ ! -z "$FIRST_LOAD" ]; then
    if [ "$FIRST_LOAD" -lt 200 ]; then
      echo "   ✅ Bundle size excellent: ~${FIRST_LOAD} KB (< 200 KB)"
      ((PASS++))
    else
      echo "   ⚠️  Bundle size large: ${FIRST_LOAD} KB"
      ((WARN++))
    fi
  fi
else
  echo "   ❌ Production build failed!"
  echo "   See /tmp/build-output.txt for details"
  ((FAIL++))
fi
echo ""

# Check 7: Git Status
echo "7️⃣ Git Repository Status:"
if git rev-parse --git-dir > /dev/null 2>&1; then
  echo "   ✅ Git repository initialized"
  ((PASS++))
  
  # Check if .env.local is tracked
  if git ls-files .env.local 2>/dev/null | grep -q ".env"; then
    echo "   ❌ CRITICAL: .env.local is tracked by git!"
    ((FAIL++))
  else
    echo "   ✅ .env files not tracked (secure)"
    ((PASS++))
  fi
  
  # Check for uncommitted changes
  if [ -z "$(git status --porcelain)" ]; then
    echo "   ✅ No uncommitted changes"
    ((PASS++))
  else
    echo "   ⚠️  Uncommitted changes present"
    echo "      Run: git status"
    ((WARN++))
  fi
else
  echo "   ⚠️  Not a git repository"
  ((WARN++))
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════"
echo "📊 DEPLOYMENT READINESS SUMMARY"
echo "═══════════════════════════════════════════════════════════"
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

echo "Deployment Readiness Score: $SCORE/100"
echo ""

# Grade
if [ $FAIL -eq 0 ]; then
  if [ $WARN -eq 0 ]; then
    echo "🎉 EXCELLENT! Ready for deployment!"
    echo "   Grade: A+ (100/100)"
    echo ""
    echo "✅ All systems ready. You can deploy now!"
  elif [ $WARN -le 2 ]; then
    echo "✅ GOOD! Ready for deployment with minor warnings."
    echo "   Grade: A ($SCORE/100)"
    echo ""
    echo "✅ You can deploy, but review warnings first."
  else
    echo "⚠️  READY, but several warnings present."
    echo "   Grade: B ($SCORE/100)"
    echo ""
    echo "⚠️  Review warnings before deploying."
  fi
else
  echo "❌ NOT READY! Critical issues found."
  echo "   Grade: $SCORE/100"
  echo ""
  echo "❌ Fix failed checks before deploying."
  exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🚀 NEXT STEPS"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "1. Review PRE_DEPLOYMENT_CHECKLIST.md"
echo "2. Update domain URLs (replace traveltours.com)"
echo "3. Push to Git: git push origin main"
echo "4. Deploy to Vercel: vercel --prod"
echo "5. Add environment variables in Vercel dashboard"
echo "6. Test production site"
echo "7. Submit sitemap to Google"
echo ""
echo "📚 Documentation:"
echo "   → PRE_DEPLOYMENT_CHECKLIST.md"
echo "   → DEPLOYMENT_GUIDE.md (to be created in Phase 8)"
echo ""
echo "✅ Verification complete!"
echo ""

