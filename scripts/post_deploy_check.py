#!/usr/bin/env python3
"""
Post-deploy verification script for DHA Contracting website.
Checks basic functionality after deployment.
"""

import requests
import sys
from urllib.parse import urljoin

BASE_URL = "https://www.dhacontracting.com"  # Update to actual URL

def check_url(url, expected_status=200):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == expected_status:
            print(f"✓ {url} - OK ({response.status_code})")
            return True
        else:
            print(f"✗ {url} - FAILED ({response.status_code})")
            return False
    except Exception as e:
        print(f"✗ {url} - ERROR: {e}")
        return False

def main():
    print("Starting post-deploy verification...")

    urls_to_check = [
        "/",  # Home page
        "/health.html",  # Health check
        "/sitemap.xml",  # Sitemap
        "/contact.php",  # Contact page
        "/portfolio.html",  # Portfolio
        # Add more critical pages
    ]

    all_good = True
    for url in urls_to_check:
        full_url = urljoin(BASE_URL, url)
        if not check_url(full_url):
            all_good = False

    if all_good:
        print("\n✓ All checks passed!")
        sys.exit(0)
    else:
        print("\n✗ Some checks failed. Please investigate.")
        sys.exit(1)

if __name__ == "__main__":
    main()