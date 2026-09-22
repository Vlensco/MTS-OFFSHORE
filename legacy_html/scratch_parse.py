import re

with open('panmarina_raw.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract the main body between <body> and </body>
body_match = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL)
if body_match:
    body_content = body_match.group(1)
    # Find all top-level tags inside body
    top_tags = re.findall(r'<(header|section|div|footer)[^>]*class="([^"]*)"', body_content)
    print("Found top tags count:", len(top_tags))
    for tag, cls in top_tags[:30]:
        print(f"<{tag} class=\"{cls}\">")
