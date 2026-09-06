"""Cache genuine thumbnail bytes for the two owner-supplied recordings. No videos are downloaded."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib
import json
import struct

IDS = ('fYOiJnL4Ars', 'OLXfRG4oYok')
OUT = Path('public/telecast-posters')
MANIFEST = Path('docs/telecast-poster-provenance.json')

def dimensions(data):
    if not data.startswith(b'\xff\xd8'):
        raise ValueError('Not a JPEG image')
    offset = 2
    while offset + 4 < len(data):
        if data[offset] != 0xff:
            offset += 1
            continue
        while offset < len(data) and data[offset] == 0xff:
            offset += 1
        marker = data[offset]
        offset += 1
        if marker in (0xd9, 0xda):
            break
        if marker == 0x01 or 0xd0 <= marker <= 0xd8:
            continue
        length = struct.unpack('>H', data[offset:offset+2])[0]
        if length < 2:
            raise ValueError('Invalid JPEG segment')
        if marker in (0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf):
            height, width = struct.unpack('>HH', data[offset+3:offset+7])
            return width, height
        offset += length
    raise ValueError('JPEG dimensions not found')

def fetch(video_id):
    errors = []
    for quality in ('maxresdefault', 'sddefault', 'hqdefault'):
        url = f'https://i.ytimg.com/vi/{video_id}/{quality}.jpg'
        try:
            with urlopen(Request(url, headers={'User-Agent':'StartupFair-Asset-Verification/1.0'}), timeout=15) as response:
                data = response.read(2_000_001)
            width, height = dimensions(data)
            if len(data) > 2_000_000 or width < 320 or height < 180:
                raise ValueError('Image is too small or too large')
            destination = OUT / f'{video_id}.jpg'
            destination.write_bytes(data)
            return {'videoId':video_id,'source':url,'localPath':'/'+str(destination.relative_to('public')),'width':width,'height':height,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'retrievedAt':datetime.now(timezone.utc).isoformat()}
        except Exception as error:
            errors.append(f'{quality}: {error}')
    raise RuntimeError(f'No valid thumbnail retrieved for {video_id}: {errors}')

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    if MANIFEST.exists():
        entries = json.loads(MANIFEST.read_text())
        assert [x['videoId'] for x in entries] == list(IDS)
        for x in entries:
            data = Path('public' + x['localPath']).read_bytes()
            assert hashlib.sha256(data).hexdigest() == x['sha256']
            assert dimensions(data) == (x['width'],x['height'])
        print('Existing checked-in posters verified; no external refresh needed.')
    else:
        with ThreadPoolExecutor(max_workers=2) as pool:
            entries = list(pool.map(fetch,IDS))
        MANIFEST.write_text(json.dumps(entries,indent=2)+'\n')
        print(json.dumps(entries,indent=2))
