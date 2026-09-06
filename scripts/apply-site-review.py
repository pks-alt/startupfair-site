"""Apply the reviewed source patch only after byte and base checks succeed."""
from pathlib import Path
import base64
import hashlib
import lzma
import subprocess

marker = Path('docs/SITE-REVIEW-IMPLEMENTED.md')
if marker.exists():
    source = Path('components/startupfair-page.tsx').read_text()
    assert source.count('<EmailRoutingForm ') == 46
    assert 'Step 4 of 4' in source
    assert Path('db/foundation-reference.sql').exists()
    print('Reviewed implementation is already present; no source overwritten.')
    raise SystemExit(0)
source = Path('components/startupfair-page.tsx').read_bytes()
actual = hashlib.sha1(b'blob ' + str(len(source)).encode() + b'\0' + source).hexdigest()
assert actual == 'e00c975d65c65799cb2bcbad222cdb0701720181', 'Base source changed; stop instead of overwriting edits.'
encoded = ''.join(Path(f'scripts/review-patch.{part:02d}.b64').read_text().strip() for part in (1, 2))
patch = lzma.decompress(base64.b64decode(encoded, validate=True))
assert hashlib.sha256(patch).hexdigest() == '8f79fcea32ad481d3af54846be82bdcf31524ef11980e8d09512cd69cc3443cb', 'Transfer checksum mismatch.'
subprocess.run(['git', 'apply', '--check', '-'], input=patch, check=True)
subprocess.run(['git', 'apply', '-'], input=patch, check=True)
print('Applied the exact reviewed patch. Original Home and working popup are unchanged.')
