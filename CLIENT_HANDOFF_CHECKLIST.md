# RCF Website - Client Handoff Checklist

## Project Overview
- **Site**: Rashtriya Chemicals and Fertilizers Limited (RCF)
- **Stack**: Next.js 14 + TypeScript + Tailwind + Prisma + SQLite
- **Reference**: https://www.rcfltd.com/
- **Status**: Beta/Preview - NOT production-ready

---

## 1. Content & Media (HIGH PRIORITY)

### Text Content
- [ ] Replace all placeholder text across public pages
- [ ] Add real "About Us" content for /about page sections
- [ ] Add actual minister/leadership photos and bios
- [ ] Populate /investors with real financial reports, AGM notices, annual reports
- [ ] Add actual CSR initiatives and reports to /csr
- [ ] Add real vigilance content, CVO details, complaint forms to /vigilance
- [ ] Populate /hr with actual HR policies, CDA rules, standing orders
- [ ] Add real product descriptions, categories, and details to /products
- [ ] Populate /tenders with actual tender notices, deadlines, reference numbers
- [ ] Add real news articles and press releases to /news
- [ ] Add actual recruitment notices with PDFs and apply links to /careers
- [ ] Populate /documents with real downloadable documents
- [ ] Add real portal links and descriptions to /portals
- [ ] Add actual Kisan Manch content, resources, and images to /kisan-manch
- [ ] Update contact information: address, phone, email across all pages

### Images & Media
- [ ] Replace placeholder minister images in `public/images/ministers/`
- [ ] Add real product images to `public/images/products/`
- [ ] Add real Kisan Samriddhi images to `public/images/kisan/`
- [ ] Add real gallery images to `public/images/gallery/`
- [ ] Add partner logos to `public/images/partners/`
- [ ] Add hero/background images for homepage and section headers
- [ ] Optimize all images (WebP, compression, responsive sizes)
- [ ] Add alt text for all images for accessibility

---

## 2. Functional Requirements (HIGH PRIORITY)

### Forms & Contact
- [ ] Configure SMTP for contact form submissions (/contact)
- [ ] Configure SMTP for grievance form submissions (/grievance)
- [ ] Add form validation and anti-spam measures
- [ ] Set up notification emails for form submissions
- [ ] Add CAPTCHA to public forms

### Admin CMS
- [ ] Test full CRUD for: Announcements, Tenders, News, Products, Recruitment, Documents, Media
- [ ] Verify image upload works in production environment
- [ ] Set up admin user accounts with proper roles/permissions
- [ ] Test admin login/logout flow
- [ ] Verify activity logging works correctly
- [ ] Add content moderation workflow if needed

### APIs & Data
- [ ] Verify all API endpoints return correct data
- [ ] Test search functionality across tenders, products, news, announcements
- [ ] Verify sitemap.xml is generated correctly
- [ ] Test robots.txt
- [ ] Verify meta tags and Open Graph for all pages

---

## 3. Design & Branding (MEDIUM PRIORITY)

### Visual Polish
- [ ] Review and approve color palette (navy #1e3a8a, green #15803d, saffron #f97316)
- [ ] Add official RCF logo (currently using text placeholder)
- [ ] Verify typography matches brand guidelines
- [ ] Add loading states/skeletons for better UX
- [ ] Add 404 and error page designs
- [ ] Review spacing and consistency across all pages

### Responsive Design
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Test on desktop browsers (Chrome, Firefox, Edge, Safari)
- [ ] Verify navigation menu works on mobile
- [ ] Test form inputs on mobile
- [ ] Verify tables scroll horizontally on small screens

---

## 4. Performance (MEDIUM PRIORITY)

### Optimization
- [ ] Enable Next.js image optimization (next.config.js)
- [ ] Implement lazy loading for below-fold images
- [ ] Add proper caching headers
- [ ] Minify and compress assets
- [ ] Run Lighthouse audit and fix issues
- [ ] Optimize bundle size (code splitting)
- [ ] Add CDN for static assets

### SEO
- [ ] Add canonical URLs
- [ ] Verify meta descriptions for all pages
- [ ] Add structured data (JSON-LD) for organization
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Add favicon and app icons

---

## 5. Security & Compliance (HIGH PRIORITY)

### Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Set strong admin passwords
- [ ] Implement rate limiting on API routes
- [ ] Add input sanitization and validation
- [ ] Secure file upload endpoints
- [ ] Remove/disable any debug routes in production
- [ ] Set security headers (CSP, X-Frame-Options, etc.)

### Legal & Compliance
- [ ] Draft Privacy Policy page content
- [ ] Draft Terms of Use page content
- [ ] Add cookie consent banner if needed
- [ ] Verify GDPR/data protection compliance
- [ ] Add disclaimer for external portal links
- [ ] Verify CIN and company details are correct

---

## 6. Infrastructure & Deployment (HIGH PRIORITY)

### Environment Setup
- [ ] Set up production database (migrate from SQLite if needed)
- [ ] Configure environment variables (.env)
- [ ] Set up backup strategy for database
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up uptime monitoring

### Deployment
- [ ] Choose hosting platform (Vercel, AWS, etc.)
- [ ] Configure custom domain
- [ ] Set up CI/CD pipeline
- [ ] Run production build test
- [ ] Verify all routes work in production
- [ ] Test file uploads in production environment
- [ ] Set up email service for production

---

## 7. Testing & QA (MEDIUM PRIORITY)

### Functional Testing
- [ ] Test all navigation links
- [ ] Test all forms (contact, grievance, citizen registration)
- [ ] Test admin CMS workflows
- [ ] Test image upload and display
- [ ] Test search functionality
- [ ] Test on different browsers
- [ ] Test on different devices

### Content Review
- [ ] Proofread all content for typos
- [ ] Verify all dates are correct
- [ ] Verify all contact information
- [ ] Check all links work (no 404s)
- [ ] Verify PDF downloads work

---

## 8. Documentation & Training (LOW PRIORITY)

### Documentation
- [ ] Create admin user manual
- [ ] Document content update procedures
- [ ] Document deployment process
- [ ] Document backup/restore procedures

### Training
- [ ] Train admin staff on CMS usage
- [ ] Train staff on content updates
- [ ] Provide support contact for issues

---

## 9. Launch Checklist (FINAL)

### Pre-Launch
- [ ] Final content review and approval
- [ ] Final design review and approval
- [ ] Complete security audit
- [ ] Complete performance audit
- [ ] Backup existing site (if migrating)
- [ ] Notify stakeholders of launch date

### Launch Day
- [ ] Deploy to production
- [ ] Verify DNS propagation
- [ ] Test all critical paths live
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Have rollback plan ready

### Post-Launch
- [ ] Monitor for 48 hours
- [ ] Fix any critical issues
- [ ] Gather user feedback
- [ ] Plan iteration roadmap

---

## Current Build Status
- ✅ Build compiles successfully
- ✅ All pages render without errors
- ✅ Admin CMS functional
- ✅ Public navigation complete
- ✅ Govt-style design system applied
- ✅ Placeholder images created
- ⏳ Content population needed
- ⏳ Production deployment needed

## Known Limitations
- SQLite database (consider PostgreSQL for production)
- No real email service configured
- Placeholder images throughout
- Some pages have minimal content
- No automated tests
- No monitoring/alerting setup

---

## Estimated Timeline to Production Ready
- **Content & Media**: 2-4 weeks (depends on client content delivery)
- **Functional Requirements**: 1-2 weeks
- **Design Polish**: 1 week
- **Performance & SEO**: 1 week
- **Security & Compliance**: 1 week
- **Deployment**: 2-3 days
- **Testing & QA**: 1 week

**Total**: 6-10 weeks with client content delivery
