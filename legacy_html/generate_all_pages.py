import urllib.request
import re
import os

pages = {
    'our-advantage': 'about.html',
    'services': 'services.html',
    'single-point-mooring-systems': 'spm.html',
    'project': 'projects.html',
    'contact-us': 'contact.html'
}

replacements = [
    ('PANMARINA Group - Specialists in Offshore Construction & Project Management', 'MTS OFFSHORE Group - Specialists in Offshore Construction & Project Management'),
    ('PANMARINA Group', 'MTS OFFSHORE Group'),
    ('PANMARINA&#x27;s', 'MTS OFFSHORE&#x27;s'),
    ('PANMARINA’s', 'MTS OFFSHORE’s'),
    ("PANMARINA's", "MTS OFFSHORE's"),
    ('PANMARINA Capability Statement', 'MTS OFFSHORE Capability Statement'),
    ('PANMARINA ISO Certificates', 'MTS OFFSHORE ISO Certificates'),
    ('PANMARINA', 'MTS OFFSHORE'),
    ('Pan Marina Group Pte Ltd', 'MTS Offshore Group Pte Ltd'),
    ('Pan Marina PNG Limited', 'MTS Offshore Indonesia'),
    ('Pan Marina', 'MTS Offshore'),
    ('PMG Advantage', 'MTS Advantage'),
    ('PMG_WHITE', 'MTS_WHITE'),
    ('panmarina.com', 'mtsoffshore.com'),
    ('https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/css/pan-marina-offshore.webflow.shared.e6c27d1d8.css', '/assets/css/panmarina_shared.css'),
    ('href="/services"', 'href="/services.html"'),
    ('href="/single-point-mooring-systems"', 'href="/spm.html"'),
    ('href="/project"', 'href="/projects.html"'),
    ('href="/about"', 'href="/about.html"'),
    ('href="/our-advantage"', 'href="/about.html"'),
    ('href="/contact-us"', 'href="/contact.html"')
]

headers = {'User-Agent': 'Mozilla/5.0'}

for slug, local_filename in pages.items():
    url = f'https://panmarina.com/{slug}'
    print(f'Fetching {url} -> {local_filename}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read().decode('utf-8', errors='ignore')

        for old, new in replacements:
            content = content.replace(old, new)

        # Replace logos
        content = re.sub(r'src="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6a0b8b5f81aeff082f75f139_WhitePMG_Subtext[^"]*"',
                         'src="/assets/images/mts_logo.svg"', content)
        content = re.sub(r'srcset="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6a0b8b5f81aeff082f75f139_WhitePMG_Subtext[^"]*"',
                         'srcset="/assets/images/mts_logo.svg 842w"', content)
        content = re.sub(r'src="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6886e9a206b37ee47fedbd6f_PMG_WHITE[^"]*"',
                         'src="/assets/images/mts_logo_white.svg"', content)
        content = re.sub(r'srcset="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6886e9a206b37ee47fedbd6f_PMG_WHITE[^"]*"',
                         'srcset="/assets/images/mts_logo_white.svg 842w"', content)
        content = content.replace('https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/68aeae5e149ae54ab4564fe7_Combined%20ISO%20Certifications',
                                  '/assets/images/iso_certs')

        # Capability statement links
        content = content.replace('href="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6a016016ced61a8943d25ce6_MTS OFFSHORE%20Company%20Profile%202605.pdf"',
                                  'href="/assets/images/hero-offshore.jpg" download="MTS_Offshore_Capability_Statement.jpg"')
        content = content.replace('href="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/68aead299b4f20b7d5770626_MTS OFFSHORE%20Group%20ISO%20Certifications.pdf"',
                                  'href="/assets/images/iso_certs.png" target="_blank"')

        with open(local_filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Successfully generated {local_filename}!')
    except Exception as e:
        print(f'Error on {slug}: {e}')
