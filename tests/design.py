from pathlib import Path
from html.parser import HTMLParser
h=Path('index.html').read_text()
assert 'class="mission-hub"' in h
assert 'MISSION SELECT' in h
assert 'style-v2.css?v=mission-20261115' in h
for p in Path('guides').rglob('*.html'):
 s=p.read_text()
 for x in ['steps','checks','sources']:assert f'id="{x}"' in s and f'href="#{x}"' in s,(p,x)
 assert 'class="brief-nav"' in s
print('mission task navigation + all article anchors PASS')
