# 🧪 Travel & Tours - Complete Testing Checklist

**Project**: Travel & Tours Website  
**Last Updated**: October 20, 2025  
**Status**: Phase 2 - Testing & QA

---

## 📊 **Testing Overview**

| Test Category         | Total Tests | Status         | Priority    |
| --------------------- | ----------- | -------------- | ----------- |
| Functional Testing    | 25          | ⏳ In Progress | 🔴 Critical |
| Cross-Browser Testing | 6           | ⏳ Pending     | 🟡 High     |
| Responsive Testing    | 8           | ⏳ Pending     | 🟡 High     |
| Accessibility Testing | 12          | ⏳ Pending     | 🟡 High     |
| Performance Testing   | 5           | ⏳ Pending     | 🟢 Medium   |

---

## **1. FUNCTIONAL TESTING** ✅

### 1.1 Home Page (`/`)

**URL**: http://localhost:3000/

- [ ] **Page loads successfully** (HTTP 200)
- [ ] **Hero section displays** with title and description
- [ ] **6 featured tours display** in grid
- [ ] **Tour cards show**: image, title, location, duration, price
- [ ] **"View Details" buttons** work on all 6 cards
- [ ] **"View All Tours" button** navigates to `/tours`
- [ ] **Navbar displays** with logo and navigation
- [ ] **Smart navbar** hides on scroll down, shows on scroll up
- [ ] **Logo click** returns to home page
- [ ] **Footer displays** with all sections
- [ ] **Social media links work** (Facebook, Twitter, Instagram)
- [ ] **Navigation links work**: Home, Tours, Contact

**Expected Results**:

- ✅ Page loads in < 2 seconds
- ✅ All images load properly
- ✅ No console errors in DevTools
- ✅ All interactive elements respond to clicks

---

### 1.2 Tours Listing Page (`/tours`)

**URL**: http://localhost:3000/tours

- [ ] **Page loads successfully** (HTTP 200)
- [ ] **15 tours display** in grid layout
- [ ] **Filters sidebar visible** on desktop
- [ ] **Tour count shows**: "Showing X of 15 tours"
- [ ] **Region filter** dropdown works
- [ ] **Price range inputs** accept numbers
- [ ] **Duration inputs** accept numbers
- [ ] **Sort dropdown** works
- [ ] **Filter by Europe**: http://localhost:3000/tours?region=Europe
  - Shows only European tours
- [ ] **Filter by Asia**: http://localhost:3000/tours?region=Asia
  - Shows only Asian tours
- [ ] **Filter by Americas**: http://localhost:3000/tours?region=Americas
  - Shows only Americas tours
- [ ] **Filter by Africa**: http://localhost:3000/tours?region=Africa
  - Shows only African tours
- [ ] **Price filter works** (min/max price range)
- [ ] **Duration filter works** (min/max days)
- [ ] **Sorting works** (name, price-low, price-high, duration)
- [ ] **No tours message** appears when filters don't match
- [ ] **Tour cards clickable** - navigate to individual tour pages

**Expected Results**:

- ✅ Filters update URL with query parameters
- ✅ Filters are responsive and work on mobile
- ✅ Tour count updates dynamically
- ✅ No JavaScript errors when filtering

---

### 1.3 Individual Tour Pages (`/tours/[slug]`)

**Test these tour pages**:

- [ ] `/tours/african-safari` - Loads correctly
- [ ] `/tours/italian-experience` - Loads correctly
- [ ] `/tours/tokyo-explorer` - Loads correctly
- [ ] `/tours/paris-adventure` - Loads correctly
- [ ] `/tours/new-york-city-lights` - Loads correctly

**On Each Tour Page, Verify**:

- [ ] **Tour title** displays correctly
- [ ] **Main tour image** loads
- [ ] **Region badge** shows correct region
- [ ] **Location** (country) displays
- [ ] **Duration** (days/nights) shows
- [ ] **Price** displays correctly
- [ ] **Extended description** shows full text
- [ ] **Highlights list** displays all items
- [ ] **Image gallery** shows (if multiple images)
- [ ] **"Book Now" button** present (even if non-functional)
- [ ] **Back to Tours** or breadcrumb navigation works

**Expected Results**:

- ✅ Each tour has unique content
- ✅ Images load properly
- ✅ Layout is clean and readable
- ✅ No 404 errors

---

### 1.4 Contact Page (`/contact`)

**URL**: http://localhost:3000/contact

**Visual Elements**:

- [ ] **Page loads successfully** (HTTP 200)
- [ ] **Contact form displays** properly
- [ ] **Contact information shows**: Phone, Email, Office hours
- [ ] **Form fields visible**: Name, Email, Phone, Tour, Message
- [ ] **Tour dropdown** populated with tour options

**Form Functionality**:

- [ ] **Submit with all fields filled**:
  - Name: Test User
  - Email: test@example.com
  - Phone: +1 (555) 123-4567
  - Tour: Select any tour
  - Message: This is a test message
  - **Expected**: Success message appears
  - **Expected**: Email sent to safdarayub@gmail.com
  - **Expected**: Form clears after success

- [ ] **Submit with required fields only** (name, email, message):
  - **Expected**: Success message appears
  - **Expected**: Email sent with "Not provided" for optional fields

- [ ] **Test validation - Empty name**:
  - Leave name field empty
  - Fill email and message
  - **Expected**: Validation error for name

- [ ] **Test validation - Invalid email**:
  - Enter: "not-an-email"
  - **Expected**: Email format validation error

- [ ] **Test validation - Short message** (< 10 chars):
  - Enter: "Hi"
  - **Expected**: Message length validation error

- [ ] **Test validation - All fields empty**:
  - Submit empty form
  - **Expected**: Multiple validation errors

**Email Delivery Verification**:

- [ ] **Check safdarayub@gmail.com inbox**
- [ ] **Email subject**: "New Contact Form Inquiry from [Name]"
- [ ] **Email from**: "Travel & Tours <onboarding@resend.dev>"
- [ ] **Email contains**: All form fields, timestamp
- [ ] **Reply-To works**: Click Reply → addresses customer email

**Expected Results**:

- ✅ Form validation works correctly
- ✅ Success/error messages display
- ✅ Email delivery within 5 seconds
- ✅ Form resets after successful submission

---

### 1.5 Navigation Testing

**Test All Navigation Links**:

**Header Navigation**:

- [ ] **Logo** → Navigates to `/` (home)
- [ ] **"Home" link** → Navigates to `/`
- [ ] **"Tours" link** → Navigates to `/tours`
- [ ] **"Contact" link** → Navigates to `/contact`

**Footer Navigation**:

- [ ] **Quick Links - Home** → Navigates to `/`
- [ ] **Quick Links - All Tours** → Navigates to `/tours`
- [ ] **Quick Links - Contact** → Navigates to `/contact`
- [ ] **Explore - Europe Tours** → `/tours?region=Europe`
- [ ] **Explore - Asia Tours** → `/tours?region=Asia`
- [ ] **Explore - Americas Tours** → `/tours?region=Americas`
- [ ] **Explore - Africa Tours** → `/tours?region=Africa`

**Social Media Links**:

- [ ] **Facebook icon** → Opens https://www.facebook.com (new tab)
- [ ] **Twitter icon** → Opens https://twitter.com (new tab)
- [ ] **Instagram icon** → Opens https://www.instagram.com (new tab)

**Mobile Navigation**:

- [ ] **Hamburger menu** opens on mobile (< 768px)
- [ ] **Menu items visible** when opened
- [ ] **Menu closes** when clicking a link
- [ ] **Menu closes** when clicking outside (expected behavior)

**Expected Results**:

- ✅ All links work correctly
- ✅ External links open in new tabs
- ✅ No broken links (404 errors)
- ✅ Mobile menu is functional

---

### 1.6 Smart Navbar Testing

**Test Scroll Behavior**:

- [ ] **At top of page** (scrollY < 10px):
  - **Expected**: Navbar visible

- [ ] **Scroll down** (> 80px):
  - **Expected**: Navbar slides up (hidden)
  - **Expected**: Smooth transition (300ms)

- [ ] **Scroll back up**:
  - **Expected**: Navbar slides down (visible)
  - **Expected**: Smooth animation

- [ ] **Rapid scrolling**:
  - **Expected**: No jittery animations
  - **Expected**: Performance stays smooth (60fps)

- [ ] **Test on different pages**: Home, Tours, Contact, Tour Details

**Expected Results**:

- ✅ Navbar behavior consistent across all pages
- ✅ Smooth animations
- ✅ No layout shifts
- ✅ Content not hidden under navbar

---

## **2. CROSS-BROWSER TESTING** 🌐

### Desktop Browsers

**Chrome (Latest)**:

- [ ] Home page renders correctly
- [ ] Tours page filters work
- [ ] Contact form submits
- [ ] Smart navbar functions
- [ ] No console errors

**Firefox (Latest)**:

- [ ] Home page renders correctly
- [ ] Tours page filters work
- [ ] Contact form submits
- [ ] Smart navbar functions
- [ ] No console errors

**Edge (Latest)**:

- [ ] Home page renders correctly
- [ ] Tours page filters work
- [ ] Contact form submits
- [ ] Smart navbar functions
- [ ] No console errors

**Safari (if available)**:

- [ ] Home page renders correctly
- [ ] Tours page filters work
- [ ] Contact form submits
- [ ] Smart navbar functions
- [ ] No console errors

### Mobile Browsers

**Chrome Mobile (Android)**:

- [ ] All pages render correctly
- [ ] Touch interactions work
- [ ] Hamburger menu functions
- [ ] Forms are usable
- [ ] Smart navbar works on touch scroll

**Safari Mobile (iOS - if available)**:

- [ ] All pages render correctly
- [ ] Touch interactions work
- [ ] Hamburger menu functions
- [ ] Forms are usable
- [ ] Smart navbar works on touch scroll

---

## **3. RESPONSIVE TESTING** 📱

### Test at Key Breakpoints

**Extra Small Mobile (320px - iPhone SE)**:

- [ ] Home page layout adapts
- [ ] Tours grid shows 1 column
- [ ] Contact form is usable
- [ ] Navbar hamburger menu works
- [ ] Footer content stacks properly
- [ ] All text is readable
- [ ] Buttons are tappable (44x44px min)
- [ ] No horizontal scrolling

**Small Mobile (375px - iPhone X)**:

- [ ] All content fits properly
- [ ] Images scale correctly
- [ ] Forms are easily fillable
- [ ] Navigation is accessible

**Medium Mobile (414px - iPhone Plus)**:

- [ ] Layout is comfortable
- [ ] Touch targets are adequate
- [ ] No content overlap

**Tablet Portrait (768px - iPad)**:

- [ ] Tours grid shows 2 columns
- [ ] Filters sidebar visible (desktop layout)
- [ ] Footer shows 4 columns
- [ ] Navbar shows desktop navigation

**Tablet Landscape (1024px - iPad Pro)**:

- [ ] Tours grid shows 3 columns
- [ ] Full desktop layout active
- [ ] All features accessible

**Desktop (1280px)**:

- [ ] Container width appropriate
- [ ] Content well-spaced
- [ ] All features optimal

**Large Desktop (1920px+)**:

- [ ] No excessive whitespace
- [ ] Content centered properly
- [ ] Images not stretched

### Orientation Testing

**Portrait**:

- [ ] Mobile: Layout vertical
- [ ] Tablet: Desktop layout

**Landscape**:

- [ ] Mobile: Landscape layout adapts
- [ ] Tablet: Desktop layout

---

## **4. ACCESSIBILITY TESTING** ♿

### 4.1 Keyboard Navigation

**Test with keyboard only (no mouse)**:

- [ ] **Tab through homepage**:
  - Logo is focusable
  - Nav links are focusable
  - Tour cards are focusable
  - "View Details" buttons focusable
  - Footer links focusable
  - Social icons focusable

- [ ] **Tab through contact form**:
  - All form fields accessible
  - Submit button accessible
  - Clear focus indicators visible

- [ ] **Enter key activates**:
  - Links when focused
  - Buttons when focused
  - Form submission

- [ ] **Escape key**:
  - Closes mobile menu (if open)
  - Closes dropdowns

**Expected Results**:

- ✅ Logical tab order
- ✅ All interactive elements reachable
- ✅ Focus indicators clearly visible
- ✅ No keyboard traps

### 4.2 Screen Reader Testing

**Using NVDA/JAWS/VoiceOver (if available)**:

- [ ] **Page titles announced**
- [ ] **Headings announced** in correct hierarchy
- [ ] **Images have alt text** announced
- [ ] **Form labels** associated with inputs
- [ ] **Error messages** announced
- [ ] **Success messages** announced
- [ ] **Link purposes** clear from text/aria-label

### 4.3 Color Contrast

- [ ] **Text on backgrounds**: 4.5:1 ratio minimum
- [ ] **Large text** (18px+): 3:1 ratio minimum
- [ ] **Interactive elements** have sufficient contrast
- [ ] **Focus indicators** visible on all backgrounds

### 4.4 ARIA & Semantic HTML

- [ ] **Proper heading hierarchy**: H1 → H2 → H3
- [ ] **Landmark regions**: header, nav, main, footer
- [ ] **ARIA labels** on icon-only buttons
- [ ] **Form fields** have associated labels
- [ ] **Error messages** linked to fields (aria-describedby)

---

## **5. PERFORMANCE TESTING** ⚡

### 5.1 Lighthouse Audit

**Run for each major page**:

```bash
# Home page
npx lighthouse http://localhost:3000 --view

# Tours page
npx lighthouse http://localhost:3000/tours --view

# Contact page
npx lighthouse http://localhost:3000/contact --view
```

**Target Scores** (out of 100):

- [ ] **Performance**: 90+
- [ ] **Accessibility**: 90+
- [ ] **Best Practices**: 90+
- [ ] **SEO**: 90+

### 5.2 Core Web Vitals

**Measure on all pages**:

- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1
- [ ] **FCP** (First Contentful Paint): < 1.8s
- [ ] **TTI** (Time to Interactive): < 3.8s

### 5.3 Load Time Testing

- [ ] **Home page** loads in < 2 seconds
- [ ] **Tours page** loads in < 2 seconds
- [ ] **Individual tour pages** load in < 2 seconds
- [ ] **Contact page** loads in < 2 seconds

### 5.4 Network Testing

**Test on slow connection** (Chrome DevTools → Network → Slow 3G):

- [ ] Pages load acceptably
- [ ] Images lazy load
- [ ] No layout shifts
- [ ] Forms remain usable

### 5.5 Bundle Size

```bash
npm run build
```

- [ ] **Check bundle sizes** in build output
- [ ] **First Load JS** < 200 KB
- [ ] **No duplicate dependencies**
- [ ] **Code splitting working**

---

## **6. SPECIFIC FEATURE TESTING** 🎯

### 6.1 Tour Filtering

**Test Combinations**:

- [ ] **Region + Price**: Europe, $1000-$2000
- [ ] **Region + Duration**: Asia, 7-10 days
- [ ] **All filters**: Europe, $1000-$2000, 5-8 days
- [ ] **Clear filters**: Reset to show all 15 tours

### 6.2 Contact Form Email Delivery

**Test Scenarios**:

**Scenario 1: Complete Form**:

- [ ] Fill all fields (name, email, phone, tour, message)
- [ ] Submit form
- [ ] Success message appears
- [ ] Email received at safdarayub@gmail.com
- [ ] Email contains all field data
- [ ] Reply-To header correct

**Scenario 2: Minimal Form**:

- [ ] Fill only required fields (name, email, message)
- [ ] Submit form
- [ ] Email shows "Not provided" for optional fields

**Scenario 3: Error Handling**:

- [ ] Temporarily use invalid API key
- [ ] Submit form
- [ ] User-friendly error message displays
- [ ] No technical details exposed
- [ ] Form remains functional

### 6.3 Image Loading

- [ ] **All tour images load** on tours page
- [ ] **Featured tour images** load on home page
- [ ] **Individual tour images** load on detail pages
- [ ] **Lazy loading works** (images load as you scroll)
- [ ] **No broken image icons**
- [ ] **Alt text present** on all images

---

## **7. MOBILE-SPECIFIC TESTING** 📱

### Touch Interactions

- [ ] **All buttons** are easily tappable (44x44px minimum)
- [ ] **Links** have adequate spacing
- [ ] **Form inputs** easy to tap and focus
- [ ] **Dropdowns** work on touch
- [ ] **No hover-only interactions** (all work on tap)

### Mobile Navigation

- [ ] **Hamburger menu** opens smoothly
- [ ] **Menu items** are easy to tap
- [ ] **Menu closes** after selecting item
- [ ] **Smart navbar** works with touch scrolling

### Mobile Forms

- [ ] **Contact form** easy to fill on mobile
- [ ] **Keyboard appropriate** for each field type
  - Email field: email keyboard
  - Phone field: numeric keyboard
- [ ] **Submit button** easy to tap
- [ ] **Validation errors** clearly visible

---

## **8. ERROR HANDLING TESTING** ⚠️

### 404 Pages

- [ ] **Visit non-existent page**: `/nonexistent`
  - Should show 404 page (if custom) or default Next.js 404

### Server Errors

- [ ] **Test form with invalid API key**:
  - Error message user-friendly
  - No stack traces visible to user
  - Form recoverable

### Network Errors

- [ ] **Simulate offline** (DevTools → Network → Offline):
  - Graceful degradation
  - Appropriate error messages

---

## **9. SECURITY TESTING** 🔒

### Environment Variables

- [ ] **Check `.env.local`** not in git
  - Run: `git status`
  - `.env.local` should NOT appear

- [ ] **API key not exposed**:
  - Open DevTools → Sources
  - Search for "RESEND_API_KEY"
  - Should NOT be found in client bundles

### Form Security

- [ ] **Contact form** has CSRF protection (Next.js default)
- [ ] **Input validation** prevents XSS
- [ ] **No SQL injection** possible (no database queries)

---

## **10. BROWSER DEVTOOLS CHECKS** 🔍

### Console Tab

- [ ] **No JavaScript errors** on any page
- [ ] **No warning messages** (except development warnings)
- [ ] **No 404 errors** for resources

### Network Tab

- [ ] **All resources load** (200 status)
- [ ] **No failed requests** (red items)
- [ ] **Images optimized** (reasonable file sizes)
- [ ] **No duplicate requests**

### Performance Tab

- [ ] **Record page load**
- [ ] **Check for long tasks** (> 50ms)
- [ ] **Layout shifts** minimal
- [ ] **FPS stable** at 60fps

---

## **AUTOMATED TESTING SETUP** 🤖

### Quick Test Script

Run this to test all main pages automatically:

```bash
#!/bin/bash
echo "🧪 Testing Travel & Tours Website"
echo "================================="

BASE_URL="http://localhost:3000"

test_page() {
  local path=$1
  local name=$2
  local response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path")

  if [ "$response" = "200" ]; then
    echo "✅ $name: PASS ($response)"
  else
    echo "❌ $name: FAIL ($response)"
  fi
}

echo ""
echo "Testing main pages..."
test_page "" "Home"
test_page "/tours" "Tours Listing"
test_page "/contact" "Contact"

echo ""
echo "Testing sample tour pages..."
test_page "/tours/african-safari" "African Safari"
test_page "/tours/paris-adventure" "Paris Adventure"
test_page "/tours/tokyo-explorer" "Tokyo Explorer"

echo ""
echo "Testing filtered pages..."
test_page "/tours?region=Europe" "Europe Filter"
test_page "/tours?region=Asia" "Asia Filter"

echo ""
echo "✅ Automated tests complete!"
```

Save as: `test-pages.sh` and run with `bash test-pages.sh`

---

## **TESTING TOOLS REFERENCE** 🛠️

### Browser DevTools

**Chrome DevTools**:

- F12 or Ctrl+Shift+I (Windows/Linux)
- Cmd+Option+I (Mac)

**Device Emulation**:

- Ctrl+Shift+M (Windows/Linux)
- Cmd+Shift+M (Mac)

### Online Testing Tools

**Responsive Testing**:

- http://responsivetesttool.com
- http://www.responsinator.com

**Accessibility**:

- https://wave.webaim.org
- https://www.accessibilitychecker.org

**Performance**:

- https://pagespeed.web.dev
- https://www.webpagetest.org

**SEO**:

- https://search.google.com/test/mobile-friendly
- https://www.seobility.net/en/seocheck/

---

## **TESTING PRIORITY ORDER** 🎯

### Critical (Do First)

1. ✅ Functional testing - all pages load
2. ✅ Contact form - email delivery works
3. ✅ Navigation - all links work
4. ✅ Mobile responsive - phone layout works

### High Priority (Do Soon)

5. ✅ Keyboard navigation
6. ✅ Cross-browser (Chrome, Firefox)
7. ✅ Accessibility audit
8. ✅ Performance audit

### Medium Priority (Before Launch)

9. ✅ Safari testing
10. ✅ Tablet testing
11. ✅ Security checks
12. ✅ Error handling

---

## **TESTING PROGRESS TRACKER** 📈

### Completion Status

```
Functional Testing:     [  ] 0% (0/25)
Cross-Browser Testing:  [  ] 0% (0/6)
Responsive Testing:     [  ] 0% (0/8)
Accessibility Testing:  [  ] 0% (0/12)
Performance Testing:    [  ] 0% (0/5)

Overall Progress:       [  ] 0% (0/56 total tests)
```

---

## **ISSUE TRACKING** 🐛

### Found Issues

| #   | Issue                                    | Severity  | Page     | Status  |
| --- | ---------------------------------------- | --------- | -------- | ------- |
| 1   | (Example) Button not clickable on mobile | 🔴 High   | /tours   | ⏳ Open |
| 2   | (Example) Form validation not showing    | 🟡 Medium | /contact | ⏳ Open |

### Fixed Issues

| #   | Issue                           | Fix                           | Status   |
| --- | ------------------------------- | ----------------------------- | -------- |
| 1   | Tours page searchParams warning | Made function async           | ✅ Fixed |
| 2   | Footer social links not working | Added href URLs               | ✅ Fixed |
| 3   | Resend build error              | Installed @react-email/render | ✅ Fixed |

---

## **NEXT STEPS AFTER TESTING** 🚀

1. **Fix any issues found** during testing
2. **Document test results** in this file
3. **Run Lighthouse audit** for all pages
4. **Move to Phase 3**: Performance Optimization
5. **Move to Phase 4**: SEO Optimization

---

## **TESTING BEST PRACTICES** 💡

### DO:

✅ Test on real devices (not just emulators)
✅ Test with real users (friends/family)
✅ Use multiple browsers
✅ Test with slow internet connection
✅ Test keyboard navigation
✅ Check mobile AND desktop
✅ Verify email delivery actually works

### DON'T:

❌ Skip mobile testing
❌ Only test on your device/browser
❌ Assume everything works
❌ Skip accessibility testing
❌ Ignore console warnings
❌ Test only happy paths

---

**Ready to start testing?** Begin with **Functional Testing** (Section 1) and work your way through the checklist! 📝✨
