# DHA Contracting website

## Structured data
- Home page LocalBusiness JSON-LD now includes website URL, Instagram/Facebook profiles, U.S. service area, and core service types.
- Each service detail page publishes a Schema.org Service definition tied back to the business `@id` for richer snippets.

## Sitemap automation
- Generate a fresh sitemap before deploys with `python scripts/generate_sitemap.py`.
- Add a server cron (example: `0 3 * * 1 cd /path/to/site && /usr/bin/python scripts/generate_sitemap.py`) so `sitemap.xml` stays current.
- Submit or resubmit `https://www.dhacontracting.com/sitemap.xml` in Google Search Console after deployments.
