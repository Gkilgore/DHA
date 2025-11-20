# DHA Contracting website health check

## Summary
- Normalized asset paths across HTML files to use forward slashes so browsers resolve images and icons consistently on Hostinger and other Unix-based hosts.
- Cleaned a malformed image tag on the home page that could prevent the service thumbnail from loading.
- Noted key follow-up items to improve reliability, accessibility, and security.

## Changes made
- Updated Open Graph, favicon, hero, and service thumbnail image paths in `index.html` to use forward slashes for cross-platform compatibility.【F:index.html†L17-L26】【F:index.html†L222-L337】
- Removed an extra, invalid `assets/img/service_LB.jpg"` fragment from the Sign Repair & Troubleshooting card so the thumbnail loads correctly.【F:index.html†L310-L330】

## Follow-up recommendations
1. **Add meaningful alt text for service thumbnails.** Many `<img>` tags still use empty `alt` attributes, which reduces accessibility and SEO clarity (e.g., the Scoreboards and Videoboards thumbnails).【F:index.html†L222-L260】 Provide concise descriptions such as “Scoreboard installation project” and “Videoboard installation.”
2. **Harden the contact form.** The form currently sends email directly from unvalidated `$_POST` fields and only copies one CC address; consider adding validation, spam controls (reCAPTCHA), and consistent CC/BCC handling before deploying.【F:contact.php†L12-L40】
3. **Expand structured data.** The existing LocalBusiness JSON-LD has basic fields; add services offered, service areas, and a website URL to improve search visibility.【F:index.html†L51-L67】
4. **Add uptime/error monitoring.** Because the site is static with a PHP contact endpoint, configure host-level monitoring and form error logging so you’re alerted if submissions fail (no code change included in this commit).
