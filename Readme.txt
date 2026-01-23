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

## Next Steps
### PR 5: Internal Linking Improvements
- Add cross-links between related service pages and portfolio items to improve site navigation and SEO.
- Ensure consistent canonical URLs and no broken links.
- QA: Crawl with an internal link checker to confirm improvements.

### PR 7: Monitoring and Regression Checks
- Set up uptime/error monitoring (e.g., via host-level tools or services like UptimeRobot).
- Add post-deploy verification checklist (Search Console coverage, Core Web Vitals, crawl errors).
- Define rollback steps for significant issues detected after deployment.

## Future Enhancements
- Add Google Ads conversion tracking for better marketing ROI measurement.
- Implement a blog section for SEO and content marketing (e.g., project updates, industry tips).
- Enhance mobile responsiveness and accessibility (e.g., add ARIA labels, improve keyboard navigation).
- Integrate advanced analytics (e.g., heatmaps, A/B testing for CTAs).
- Consider adding testimonials or case studies to boost trust and conversions.
