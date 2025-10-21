# 🚀 Deployment Guide - Travel & Tours Website

**Last Updated**: October 20, 2025  
**Target Platform**: Vercel (Recommended)  
**Estimated Time**: 30-60 minutes

---

## 📋 **DEPLOYMENT OVERVIEW**

This guide will help you deploy your Travel & Tours website to production.

**What You'll Deploy**:

- ✅ Next.js 15 application
- ✅ 22 pages (18 static/SSG, 1 dynamic)
- ✅ Contact form with email delivery
- ✅ Google Analytics tracking
- ✅ SEO optimization (sitemap, robots.txt)
- ✅ Security headers

**Platform**: Vercel (recommended for Next.js)

---

## 🚀 **OPTION 1: DEPLOY WITH VERCEL (EASIEST)**

### Prerequisites

- [x] Git repository (GitHub, GitLab, or Bitbucket)
- [x] Vercel account (sign up at https://vercel.com)
- [x] Code pushed to repository

---

### Step 1: Prepare Repository (5 minutes)

```bash
# 1. Make sure all changes are committed
git status

# 2. Add any uncommitted changes
git add .

# 3. Commit
git commit -m "chore: prepare for deployment"

# 4. Push to your remote repository
git push origin main
# (or 'master' depending on your default branch)
```

---

### Step 2: Import to Vercel (5 minutes)

1. **Go to Vercel**:
   - Visit: https://vercel.com
   - Click "Login" or "Sign Up"
   - Connect your Git provider (GitHub recommended)

2. **Import Project**:
   - Click "Add New Project"
   - Select your repository
   - Click "Import"

3. **Configure Project**:
   - Project Name: travel-tours (or your choice)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `next build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install` (auto-filled)

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add `RESEND_API_KEY`:
     - Name: `RESEND_API_KEY`
     - Value: (paste your Resend API key)
     - Environments: Production, Preview, Development
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID`:
     - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     - Value: (paste your GA4 measurement ID)
     - Environments: Production, Preview, Development

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your production URL (e.g., your-project.vercel.app)

---

### Step 3: Custom Domain (Optional, 15 minutes)

**If you have your own domain**:

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter your domain (e.g., traveltours.com)

2. **Configure DNS**:
   - Vercel will show you DNS records to add
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the DNS records:
     - Type: A record
     - Name: @ (or your subdomain)
     - Value: (Vercel's IP from dashboard)
   - Or CNAME record:
     - Name: www
     - Value: cname.vercel-dns.com

3. **Wait for DNS**:
   - DNS propagation: 5 minutes to 48 hours
   - Usually works within 15-30 minutes
   - Vercel will show "Valid" when ready

4. **HTTPS**:
   - Vercel automatically provisions SSL certificate
   - Usually ready within minutes
   - Your site will be https://yourdomain.com

---

### Step 4: Verify Deployment (10 minutes)

**After deployment succeeds**:

1. **Visit Production URL**:

   ```
   https://your-project.vercel.app
   (or your custom domain)
   ```

2. **Test All Pages**:
   - ✅ Home page loads
   - ✅ Tours listing loads
   - ✅ Tour detail pages load
   - ✅ Contact page loads
   - ✅ Navigation works
   - ✅ Footer links work

3. **Test Contact Form**:
   - Fill out contact form
   - Submit
   - Check your email (safdarayub@gmail.com)
   - Verify you received the inquiry

4. **Check Analytics**:
   - Visit your production site
   - Go to Google Analytics
   - Check "Real-time" reports
   - You should see your visit!

5. **Verify SEO**:
   - Visit: yoursite.com/sitemap.xml
   - Verify: yoursite.com/robots.txt
   - View page source → check meta tags

6. **Test Security**:
   - Visit: https://securityheaders.com
   - Enter your domain
   - Expected grade: A or A+

---

## 🚀 **OPTION 2: DEPLOY WITH VERCEL CLI**

### Prerequisites

```bash
npm install -g vercel
```

### Deployment Steps

```bash
# 1. Login to Vercel
vercel login

# 2. Link project (first time only)
vercel link

# 3. Add environment variables
vercel env add RESEND_API_KEY
# Paste your API key when prompted

vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
# Paste your GA measurement ID

# 4. Deploy to production
vercel --prod

# 5. Your site is live!
# Vercel will output your production URL
```

---

## 🚀 **OPTION 3: DEPLOY TO NETLIFY**

### Step 1: Prepare

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login
```

---

### Step 2: Deploy

```bash
# Build your site
npm run build

# Deploy
netlify deploy --prod --dir=.next

# Follow prompts:
# - Create new site? Yes
# - Team: (select your team)
# - Site name: travel-tours
```

---

### Step 3: Environment Variables

1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Redeploy

---

## 📊 **POST-DEPLOYMENT CHECKLIST**

### Immediately After Deploy (10 minutes)

- [ ] ✅ Site loads at production URL
- [ ] ✅ All pages accessible
- [ ] ✅ Contact form works
- [ ] ✅ Email delivery verified
- [ ] ✅ Analytics tracking (check Real-time)
- [ ] ✅ HTTPS working (green padlock)
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Security headers present
- [ ] ✅ SEO files accessible

---

### Within 24 Hours

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add Google verification code
- [ ] Monitor analytics data
- [ ] Check for any errors in logs
- [ ] Test from different devices/browsers

---

### Within 1 Week

- [ ] Monitor Google indexing
- [ ] Check search rankings
- [ ] Review analytics (traffic sources)
- [ ] Collect user feedback
- [ ] Fix any issues found
- [ ] Optimize based on data

---

## 🎯 **ENVIRONMENT VARIABLES REFERENCE**

### Required Variables

**RESEND_API_KEY** (Server-side):

```
Description: Resend API key for email delivery
Format: re_xxxxxxxxxxxxxxxxxxxxx
Where: .env.local (dev), Vercel Environment Variables (prod)
Scope: Server-side only (secure)
```

**NEXT_PUBLIC_GA_MEASUREMENT_ID** (Client-side):

```
Description: Google Analytics 4 Measurement ID
Format: G-XXXXXXXXXX
Where: .env.local (dev), Vercel Environment Variables (prod)
Scope: Client-side (public, but safe)
```

---

## 🔧 **TROUBLESHOOTING DEPLOYMENT**

### Build Fails on Vercel

**Check Vercel Build Logs**:

1. Go to deployment in Vercel dashboard
2. Click "View Build Logs"
3. Look for error messages

**Common Issues**:

- Missing dependencies: Check package.json
- TypeScript errors: Run `npx tsc --noEmit` locally
- Environment variables: Verify they're set in Vercel

---

### Site Loads But Features Broken

**Contact Form Not Working**:

- Check RESEND_API_KEY in Vercel
- Check Vercel function logs
- Verify API key is valid

**Analytics Not Tracking**:

- Check NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel
- Verify measurement ID format (G-XXXXXXXXXX)
- Check browser console for errors

**Images Not Loading**:

- Images from Unsplash should work
- Check next.config.ts has correct remotePatterns

---

### Custom Domain Not Working

**DNS Issues**:

- Verify DNS records are correct
- Wait 24-48 hours for propagation
- Use https://dnschecker.org to verify

**SSL Certificate Issues**:

- Vercel auto-provisions SSL
- Usually ready within minutes
- If issues, contact Vercel support

---

## 📊 **VERCEL DASHBOARD GUIDE**

### Key Sections

**1. Deployments**:

- See all deployments
- View build logs
- Access preview URLs
- Promote to production

**2. Analytics** (Vercel Analytics - optional):

- Real user metrics
- Core Web Vitals
- Page performance
- Free tier available

**3. Logs**:

- Function logs
- Build logs
- Error tracking
- Real-time monitoring

**4. Settings**:

- Environment Variables
- Domains
- Git integration
- Build & Development settings

---

## 🎯 **SEO POST-DEPLOYMENT**

### Google Search Console Setup (10 minutes)

1. **Add Property**:
   - Visit: https://search.google.com/search-console
   - Click "Add Property"
   - Enter your domain

2. **Verify Ownership**:
   - Choose "HTML tag" method
   - Copy verification code
   - Add to `app/page.tsx` (line 58, replace placeholder)
   - Redeploy
   - Click "Verify" in Search Console

3. **Submit Sitemap**:
   - Go to "Sitemaps" section
   - Enter: yoursite.com/sitemap.xml
   - Click "Submit"

4. **Monitor**:
   - Check "Coverage" for indexing status
   - Review "Performance" for search queries
   - Fix any "Issues" that appear

---

### Bing Webmaster Tools (5 minutes)

1. Visit: https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap
5. Monitor indexing

---

## 📊 **MONITORING & MAINTENANCE**

### Daily (First Week)

- [ ] Check Vercel deployment status
- [ ] Monitor analytics (visitor count)
- [ ] Check email delivery logs
- [ ] Review error logs

### Weekly

- [ ] Review analytics (traffic sources, popular pages)
- [ ] Check search console (indexing, queries)
- [ ] Monitor uptime
- [ ] Review user feedback

### Monthly

- [ ] Run `npm audit` (check for vulnerabilities)
- [ ] Update dependencies (`npm update`)
- [ ] Review performance (run Lighthouse)
- [ ] Analyze user behavior
- [ ] Optimize based on data

---

## 🎊 **SUCCESS METRICS**

### Deployment Success When:

✅ Site loads at production URL  
✅ All pages accessible (22/22)  
✅ Contact form sends emails  
✅ Analytics tracking visitors  
✅ HTTPS active (green padlock)  
✅ Security headers present (grade A+)  
✅ Lighthouse score > 90  
✅ No console errors  
✅ Mobile responsive working  
✅ SEO files accessible (sitemap, robots)

---

## 📚 **ADDITIONAL RESOURCES**

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains)
- [Analytics Setup](https://vercel.com/docs/analytics)

---

## ✅ **DEPLOYMENT CHECKLIST QUICK REFERENCE**

### Before Deploy:

- [x] ✅ Code quality verified
- [x] ✅ Production build tested
- [x] ✅ Environment variables ready
- [ ] ⏳ Domain URLs updated

### During Deploy:

- [ ] Push to Git
- [ ] Import to Vercel
- [ ] Add environment variables
- [ ] Deploy

### After Deploy:

- [ ] Test production site
- [ ] Verify email delivery
- [ ] Check analytics
- [ ] Submit sitemap
- [ ] Monitor for 24 hours

---

**Your website is ready to go live!** 🚀

**Next**: Phase 8 - Execute Deployment

Let's launch your website! 🎉
