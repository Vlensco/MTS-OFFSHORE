import re

with open('panmarina_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Metadata and Title
html = re.sub(r'<title>.*?</title>', '<title>MTS OFFSHORE Group - Specialists in Offshore Construction &amp; Project Management</title>', html, flags=re.DOTALL)
html = html.replace('PANMARINA Group excels in offshore construction and project management, delivering innovative solutions, exceptional safety standards, and unparalleled expertise for complex maritime projects globally.',
                    'MTS OFFSHORE Group excels in offshore construction and project management, delivering innovative solutions, exceptional safety standards, and unparalleled expertise for complex maritime projects globally.')

# 2. Rebrand text
replacements = [
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
]

for old, new in replacements:
    html = html.replace(old, new)

# 3. CSS stylesheet pointing to local panmarina_shared.css
html = html.replace('https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/css/pan-marina-offshore.webflow.shared.e6c27d1d8.css',
                    '/assets/css/panmarina_shared.css')

# 4. Replace Header Logo with custom MTS Offshore Logo
# Original: src="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6a0b8b5f81aeff082f75f139_WhitePMG_Subtext.png"
html = re.sub(r'src="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6a0b8b5f81aeff082f75f139_WhitePMG_Subtext[^"]*"',
              'src="/assets/images/mts_logo.svg"', html)
html = re.sub(r'srcset="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6a0b8b5f81aeff082f75f139_WhitePMG_Subtext[^"]*"',
              'srcset="/assets/images/mts_logo.svg 842w"', html)

# 5. Replace Footer Logo with custom White MTS Offshore Logo
# Original: src="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6886e9a206b37ee47fedbd6f_PMG_WHITE.png"
html = re.sub(r'src="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6886e9a206b37ee47fedbd6f_PMG_WHITE[^"]*"',
              'src="/assets/images/mts_logo_white.svg"', html)
html = re.sub(r'srcset="https://cdn\.prod\.website-files\.com/65d4023f0fe16f42cb183691/6886e9a206b37ee47fedbd6f_PMG_WHITE[^"]*"',
              'srcset="/assets/images/mts_logo_white.svg 842w"', html)

# 6. Localize Key Images
image_map = {
    # Hero Background
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/692a444977c6980b2e3fa594_KMT%20Green%20Compressed.JPG': '/assets/images/hero_kmt.jpg',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6886bc4df795be11a7dfd79e_Jacket%20and%20Topside%20on%20Barge%20Action_Compressed': '/assets/images/ti_card',
    # Service Cards
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6886b9bc620916f9026a9219_Birdseye%20Deck%20View_Compressed': '/assets/images/pmc_card',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/65d407d1d8b67f4dedd837f4_20170309_164902': '/assets/images/om_card',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/65d42addbadc4b36cf019683_20200121_134838': '/assets/images/aim_card',
    # About Section
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/67b0248b2f83f26b18c72e6f_20230817_093105': '/assets/images/about_thumb',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6880626b8ce36473220c64b3_Jacket%20Installation': '/assets/images/about_jacket',
    # Projects
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183701/69c03d8ca53c4b37f2c83241_DJI_20260211114900_0828_D': '/assets/images/proj_1',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183701/68db00f59ae0ac5e7cf1047f_DJI_20250929062534_0136_D': '/assets/images/proj_2',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183701/67b0267f76184728138de0c5_KMT%20Campaign%20%238%20DPR%2010.1': '/assets/images/proj_3',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183701/6886c8def384dd4d6106911d_P1062762': '/assets/images/proj_4',
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183701/65dfd44feb19ec247d3852ff_KMT1': '/assets/images/proj_5',
    # ISO Certs
    'https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/68aeae5e149ae54ab4564fe7_Combined%20ISO%20Certifications': '/assets/images/iso_certs'
}

for cdn_prefix, local_prefix in image_map.items():
    html = html.replace(cdn_prefix, local_prefix)

# 7. Update Links to multi-page routes
html = html.replace('href="/services"', 'href="/services.html"')
html = html.replace('href="/single-point-mooring-systems"', 'href="/spm.html"')
html = html.replace('href="/project"', 'href="/projects.html"')
html = html.replace('href="/about"', 'href="/about.html"')
html = html.replace('href="/our-advantage"', 'href="/about.html"')
html = html.replace('href="/contact-us"', 'href="/contact.html"')

# 8. Capability Statement and ISO buttons modal or download trigger
html = html.replace('href="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/6a016016ced61a8943d25ce6_PANMARINA%20Company%20Profile%202605.pdf"',
                    'href="/assets/images/hero-offshore.jpg" download="MTS_Offshore_Capability_Statement.jpg"')
html = html.replace('href="https://cdn.prod.website-files.com/65d4023f0fe16f42cb183691/68aead299b4f20b7d5770626_PANMARINA%20Group%20ISO%20Certifications.pdf"',
                    'href="/assets/images/iso_certs.png" target="_blank"')

# Write directly to index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html generated with 100% exact Panmarina structure and MTS Offshore branding!")
