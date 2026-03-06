# DHA Contracting website

## Structured data
- Home page LocalBusiness JSON-LD now includes website URL, Instagram/Facebook profiles, U.S. service area, and core service types.
- Each service detail page publishes a Schema.org Service definition tied back to the business `@id` for richer snippets.

## Sitemap automation
- Generate a fresh sitemap before deploys with `python scripts/generate_sitemap.py`.
- Add a server cron (example: `0 3 * * 1 cd /path/to/site && /usr/bin/python scripts/generate_sitemap.py`) so `sitemap.xml` stays current.
- Submit or resubmit `https://www.dhacontracting.com/sitemap.xml` in Google Search Console after deployments.

## Performance Optimizations (PR 6 - Completed)
- Added lazy loading (`loading="lazy"`) to all images below the fold across HTML pages for faster initial loads.
- Deferred non-critical scripts (added `defer` to vendor JS files and main.js) to improve rendering.
- Minified main.js and main.css using UglifyJS and CleanCSS to reduce file sizes.
- Compressed JPG images in assets/img/ using imagemin with mozjpeg plugin for better performance.

## Internal Linking Improvements (PR 5 - Completed)
- Added "Related Projects" sections in service detail pages with links to relevant portfolio items (e.g., scoreboards link to Princeton Day, South Brunswick, Union; videoboards to Harrisville, Mt. Olive; message centers to Aberdeen, Vernon; other to Wagner Clock).
- Added service links in portfolio pages for bidirectional navigation.
- Ensured canonical URLs remain consistent; no broken links introduced.
- QA: Manual check confirms improved site navigation and SEO cross-linking.

### PR 7: Monitoring and Regression Checks
- Set up uptime/error monitoring (e.g., via host-level tools or services like UptimeRobot).
- Add post-deploy verification checklist (Search Console coverage, Core Web Vitals, crawl errors).
- Define rollback steps for significant issues detected after deployment.

## PR 9: Google Ads Conversion Tracking Implementation
- Add Google Ads conversion tracking code for lead generation (contact form submissions)
- Implement event tracking for key user interactions (service page visits, portfolio views)
- Set up conversion goals in Google Ads for better ROI measurement
- Add Facebook Pixel for cross-platform tracking
- Basic QA: Test conversion tracking in Google Ads and Analytics

## PR 10: Mobile Responsiveness & Accessibility Enhancements
- Audit and improve mobile responsiveness across all pages
- Add ARIA labels and improve keyboard navigation
- Ensure proper heading hierarchy (H1-H6) for screen readers
- Optimize touch targets for mobile devices
- Add skip links for accessibility
- Basic QA: Test with Lighthouse accessibility audit and mobile devices

## PR 11: Advanced Analytics Integration
- Implement Google Analytics 4 with enhanced e-commerce tracking
- Add heatmaps and session recordings (Hotjar or similar)
- Set up A/B testing framework for CTAs and landing pages
- Integrate with Google Search Console for better insights
- Basic QA: Verify tracking codes and data collection

## PR 12: Testimonials & Social Proof Enhancement
- Add customer testimonials section to home page
- Create case study pages with before/after photos
- Integrate review widgets from Google/MyBusiness
- Add trust badges and certifications
- Basic QA: Collect and validate testimonial content

## PR 13: Performance Optimization Round 2
- Implement critical CSS loading
- Add WebP image format support with fallbacks
- Optimize font loading (font-display: swap)
- Implement service worker for caching
- Basic QA: Run performance audits and compare scores

## Future Considerations
- Multi-language support for broader reach
- Video content integration (project timelapses, tutorials)
- E-commerce functionality for equipment sales
- Integration with project management tools
- Advanced SEO (schema markup expansion, local SEO)

## PR 8: Blog Section Implementation (Completed)
- Created blog.html as the main blog listing page with sidebar navigation.
- Added "Blog" link to main navigation across all pages.
- Created three initial blog posts:
  - "Advancements in Scoreboard Technology: What Schools Need to Know"
  - "Essential Maintenance Tips for LED Videoboards"
  - "Case Study: Mount St. Mary Academy Scoreboard Upgrade"
- Implemented proper SEO meta tags, structured data, and canonical URLs for all blog pages.
- Added blog directory structure for organized content management.
- Updated footer links to include blog navigation.
- Regenerated sitemap.xml to include new blog pages for search engine indexing.
