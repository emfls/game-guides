from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
root=Path('.');count=0
class Links(HTMLParser):
 def handle_starttag(self,tag,attrs):
  if tag=='meta' and dict(attrs).get('name')=='robots':
   self.robots.append(dict(attrs).get('content'))
  for key,value in attrs:
   if key in ('src','href') and value and not value.startswith(('#','https:')):
    assert not value.startswith('/'),value
    p=(self.path.parent/unquote(urlparse(value).path)).resolve()
    assert p.is_relative_to(root.resolve()),p
    assert p.exists(),p
for path in root.rglob('*.html'):
 h=Links();h.path=path;h.robots=[];h.feed(path.read_text());count+=1
 assert h.robots==['noindex,nofollow'],(path,h.robots)
assert count==4
assert (root/'.nojekyll').exists()
print('4 HTML relative/subpath paths + noindex,nofollow meta PASS')

for p in root.rglob('*.html'):
 assert 'style-v2.css' in p.read_text()
assert 'app-v2.js' in (root/'index.html').read_text()
power=(root/'guides/factorio-power-check/index.html').read_text()
assert 'Satisfaction' in power and 'Production' in power and 'oldid=214630' in power
assert '직접 플레이' in power and '축전지' in power
print('PASS versioned assets, power diagnostic scope and provenance')
