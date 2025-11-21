# SEO Improvement Pull Request Schedule

This schedule breaks the SEO recommendations into staged pull requests to reduce deployment risk and allow focused review.

## PR 1: Meta Data Completion
- Add unique titles and meta descriptions for all service pages and the home page.
- Validate canonical link tags on each page.
- Basic QA: verify page titles/snippets in browser; run HTML validation.

## PR 2: Structured Data Expansion
- Extend LocalBusiness JSON-LD with `url`, `sameAs`, `areaServed`, and `serviceType`.
- Add service-specific structured data where applicable.
- Basic QA: test with Google Rich Results/Schema validators.

## PR 3: Sitemap Automation
- Regenerate `sitemap.xml` with current `lastmod` values and add automation (build/deploy hook or cron).
- Submit updated sitemap path documentation for Search Console.
- Basic QA: check sitemap validity and freshness.

## PR 4: On-Page Content and Accessibility
- Standardize H1/H2 hierarchy across pages; add keyword-rich copy near the fold.
- Add descriptive alt text for hero and gallery images.
- Basic QA: manual content review; run accessibility check (e.g., axe or Lighthouse).

## PR 5: Internal Linking Improvements
- Add internal links between related services and portfolio items.
- Ensure canonical URLs remain consistent after link additions.
- Basic QA: crawl with an internal link checker to confirm no broken links.

## PR 6: Performance and Core Web Vitals
- Compress hero/portfolio images; add `loading="lazy"` to below-the-fold media.
- Defer or async non-critical scripts to improve LCP/CLS.
- Basic QA: run Lighthouse focusing on performance metrics.

## PR 7: Monitoring and Regression Checks
- Add monitoring docs/checklist for post-deploy verification (Search Console coverage, Core Web Vitals, crawl errors).
- Define rollback steps if significant issues are detected.
- Basic QA: confirm monitoring hooks or dashboards are reachable.
