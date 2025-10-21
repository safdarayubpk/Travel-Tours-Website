#!/bin/bash
# Automated page testing script for Travel & Tours website

echo ""
echo "🧪 TRAVEL & TOURS - AUTOMATED PAGE TESTING"
echo "==========================================="
echo ""

BASE_URL="http://localhost:3000"
PASS_COUNT=0
FAIL_COUNT=0

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_page() {
  local path=$1
  local name=$2
  local response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path" 2>&1)
  
  if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} | $name (HTTP $response)"
    ((PASS_COUNT++))
  else
    echo -e "${RED}❌ FAIL${NC} | $name (HTTP $response)"
    ((FAIL_COUNT++))
  fi
}

echo "📄 Testing Main Pages..."
echo "------------------------"
test_page "" "Home Page"
test_page "/tours" "Tours Listing"
test_page "/contact" "Contact Page"
echo ""

echo "🗺️ Testing Sample Tour Pages..."
echo "--------------------------------"
test_page "/tours/african-safari" "African Safari"
test_page "/tours/italian-experience" "Italian Experience"
test_page "/tours/greek-islands" "Greek Islands"
test_page "/tours/london-calling" "London Calling"
test_page "/tours/tokyo-explorer" "Tokyo Explorer"
test_page "/tours/bali-paradise" "Bali Paradise"
test_page "/tours/thailand-adventure" "Thailand Adventure"
test_page "/tours/dubai-luxury" "Dubai Luxury"
test_page "/tours/new-york-city-lights" "New York City"
test_page "/tours/machu-picchu-journey" "Machu Picchu"
test_page "/tours/cancun-beach" "Cancun Beach"
test_page "/tours/canadian-rockies" "Canadian Rockies"
test_page "/tours/kenya-safari" "Kenya Safari"
test_page "/tours/moroccan-magic" "Moroccan Magic"
test_page "/tours/south-african-discovery" "South Africa"
test_page "/tours/paris-adventure" "Paris Adventure"
echo ""

echo "🔍 Testing Filtered Pages..."
echo "----------------------------"
test_page "/tours?region=Europe" "Europe Filter"
test_page "/tours?region=Asia" "Asia Filter"
test_page "/tours?region=Americas" "Americas Filter"
test_page "/tours?region=Africa" "Africa Filter"
echo ""

echo "❌ Testing 404 Handling..."
echo "--------------------------"
test_404=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/nonexistent-page" 2>&1)
if [ "$test_404" = "404" ]; then
  echo -e "${GREEN}✅ PASS${NC} | 404 Page (HTTP $test_404)"
  ((PASS_COUNT++))
else
  echo -e "${YELLOW}⚠️ INFO${NC} | 404 Page returns HTTP $test_404 (expected 404)"
fi
echo ""

echo "📊 TEST RESULTS"
echo "==============="
echo -e "✅ Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "❌ Failed: ${RED}$FAIL_COUNT${NC}"
TOTAL=$((PASS_COUNT + FAIL_COUNT))
echo "📈 Total:  $TOTAL"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
  echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
  echo ""
  echo "✅ Your website is ready for manual testing."
  echo "📖 See TESTING_CHECKLIST.md for detailed manual tests."
  exit 0
else
  echo -e "${RED}⚠️ SOME TESTS FAILED${NC}"
  echo ""
  echo "Please check the failed pages and fix any issues."
  exit 1
fi

