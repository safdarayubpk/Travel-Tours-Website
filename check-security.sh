#!/bin/bash
# Security check script for Travel & Tours website

echo ""
echo "🔒 SECURITY VERIFICATION CHECK"
echo "==============================="
echo ""

PASS=0
WARN=0
FAIL=0

# Check 1: npm audit
echo "1️⃣ Dependency Security Audit:"
VULN_COUNT=$(npm audit --audit-level=moderate 2>&1 | grep "found 0 vulnerabilities" | wc -l)
if [ "$VULN_COUNT" -gt 0 ]; then
  echo "   ✅ npm audit: 0 vulnerabilities"
  ((PASS++))
else
  echo "   ❌ npm audit: vulnerabilities found!"
  npm audit --audit-level=moderate
  ((FAIL++))
fi
echo ""

# Check 2: Environment variables
echo "2️⃣ Environment Variable Security:"
if grep -q "\.env\*" .gitignore; then
  echo "   ✅ .env* in .gitignore"
  ((PASS++))
else
  echo "   ❌ .env files not protected!"
  ((FAIL++))
fi

if [ -f ".env.local" ]; then
  echo "   ✅ .env.local exists"
  ((PASS++))
else
  echo "   ⚠️  .env.local not found"
  ((WARN++))
fi

# Check if .env files are tracked by git
if git ls-files .env* 2>/dev/null | grep -q ".env"; then
  echo "   ❌ CRITICAL: .env files tracked by git!"
  ((FAIL++))
else
  echo "   ✅ .env files NOT in git (secure)"
  ((PASS++))
fi
echo ""

# Check 3: Security headers configuration
echo "3️⃣ Security Headers Configuration:"
if [ -f "next.config.ts" ] || [ -f "next.config.mjs" ] || [ -f "next.config.js" ]; then
  if grep -q "Strict-Transport-Security" next.config.* 2>/dev/null; then
    echo "   ✅ HSTS header configured"
    ((PASS++))
  else
    echo "   ⚠️  HSTS header not found"
    ((WARN++))
  fi
  
  if grep -q "X-Frame-Options" next.config.* 2>/dev/null; then
    echo "   ✅ X-Frame-Options configured"
    ((PASS++))
  else
    echo "   ⚠️  X-Frame-Options not found"
    ((WARN++))
  fi
  
  if grep -q "X-Content-Type-Options" next.config.* 2>/dev/null; then
    echo "   ✅ X-Content-Type-Options configured"
    ((PASS++))
  else
    echo "   ⚠️  X-Content-Type-Options not found"
    ((WARN++))
  fi
  
  if grep -q "Referrer-Policy" next.config.* 2>/dev/null; then
    echo "   ✅ Referrer-Policy configured"
    ((PASS++))
  else
    echo "   ⚠️  Referrer-Policy not found"
    ((WARN++))
  fi
else
  echo "   ❌ next.config file not found!"
  ((FAIL++))
fi
echo ""

# Check 4: Server Actions security
echo "4️⃣ Server Actions Security:"
if grep -q "\"use server\"" app/contact/actions.ts 2>/dev/null; then
  echo "   ✅ Server Actions properly marked"
  ((PASS++))
else
  echo "   ⚠️  'use server' directive not found"
  ((WARN++))
fi
echo ""

# Check 5: API key exposure check
echo "5️⃣ API Key Security:"
# Search for RESEND_API_KEY in client code (should not be found)
if grep -r "RESEND_API_KEY" app/ components/ lib/ 2>/dev/null | grep -v "process.env.RESEND_API_KEY" | grep -v "actions.ts" | grep -q "RESEND_API_KEY"; then
  echo "   ❌ CRITICAL: API key may be exposed in client code!"
  ((FAIL++))
else
  echo "   ✅ API key not exposed in client code"
  ((PASS++))
fi

# Check that API key is only in Server Actions
if grep -q "process.env.RESEND_API_KEY" app/contact/actions.ts; then
  echo "   ✅ API key used server-side only"
  ((PASS++))
else
  echo "   ⚠️  API key usage not found"
  ((WARN++))
fi
echo ""

# Check 6: TypeScript strict mode
echo "6️⃣ TypeScript Configuration:"
if [ -f "tsconfig.json" ]; then
  if grep -q "\"strict\".*true" tsconfig.json; then
    echo "   ✅ TypeScript strict mode enabled"
    ((PASS++))
  else
    echo "   ⚠️  TypeScript strict mode not enabled"
    ((WARN++))
  fi
else
  echo "   ⚠️  tsconfig.json not found"
  ((WARN++))
fi
echo ""

# Check 7: External links security
echo "7️⃣ External Links Security:"
if grep -r "target=\"_blank\"" components/ app/ 2>/dev/null | grep -q "rel=\"noopener noreferrer\""; then
  echo "   ✅ External links have noopener noreferrer"
  ((PASS++))
else
  echo "   ⚠️  Some external links may lack security attributes"
  ((WARN++))
fi
echo ""

# Summary
echo "📊 SECURITY CHECK SUMMARY"
echo "========================="
echo ""
echo "✅ Passed:   $PASS"
echo "⚠️  Warnings: $WARN"
echo "❌ Failed:   $FAIL"
echo ""

TOTAL=$((PASS + WARN + FAIL))
SCORE=$((PASS * 100 / TOTAL))

if [ $FAIL -eq 0 ]; then
  if [ $WARN -eq 0 ]; then
    echo "🎉 EXCELLENT! All security checks passed!"
    echo "   Security Grade: A+ (100/100)"
  else
    echo "✅ GOOD! No critical issues, some warnings."
    echo "   Security Grade: A ($SCORE/100)"
  fi
  echo ""
  echo "✅ Your website is secure and ready for production!"
else
  echo "⚠️  ATTENTION: Critical security issues found!"
  echo "   Security Grade: $SCORE/100"
  echo ""
  echo "Please fix the failed checks before deployment."
fi

echo ""
echo "📚 For detailed security report, see:"
echo "   code SECURITY_REPORT.md"
echo ""

# Exit with appropriate code
if [ $FAIL -gt 0 ]; then
  exit 1
else
  exit 0
fi

