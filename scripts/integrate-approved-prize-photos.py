"""Reconstruct only the already approved display images and wire their two source paths.
The small lossless patches are copied from the approved PNGs, not newly generated art.
Whole-image RGB hashes must equal those approved by the owner; originals are untouched.
"""
from pathlib import Path
from PIL import Image, ImageChops
import base64, hashlib, io, json

ASSETS = [
    {'source': 'homeslide2.png', 'destination': 'homeslide2-branding-edited.png', 'size': (1600,1068), 'box': (875,488,988,528), 'source_sha256': '326ac8fa31906507213f1f90256f7db2ff3941f91d8437b18bd750c326a1967a', 'approved_png_sha256': '66d81ce79fdba80be522542a8054463de450e3cf288f8de2068eacd1bf44e7cf', 'approved_rgb_sha256': 'b8746255f25d063e3aa3737bdce7420558236cb9aefdfef82710d8e6a96910ec'},
    {'source': '29.jpg', 'destination': 'september-2015-branding-edited.png', 'size': (1000,667), 'box': (571,256,635,293), 'source_sha256': '3d4f6adfa34b92974c8e6d401b3ca6c7a98f40d03a82fbb74a3a6b79c70bec7a', 'approved_png_sha256': '78a37719d9ffe8f6609f07e1979d31af1ad4e9ddefd5cacd13f7f9924c7347a3', 'approved_rgb_sha256': 'dbe6ab12b83a32274584c6ce0ff4e28dadf2bbca638a4ddb9659d4301aba16a6'},
]
sha = lambda data: hashlib.sha256(data).hexdigest()
page = Path('components/startupfair-page.tsx')
original_source = page.read_text()
updated_source = original_source
manifest=[]
for index, asset in enumerate(ASSETS,1):
    original_path = Path('public/history') / asset['source']
    destination = Path('public/history') / asset['destination']
    assert sha(original_path.read_bytes()) == asset['source_sha256'], 'Historical original changed; stop.'
    image = Image.open(original_path).convert('RGB')
    assert image.size == asset['size']
    patch = Image.open(io.BytesIO(base64.b64decode(''.join(Path(f'scripts/approved-photo-{index}.b64').read_text().split()),validate=True))).convert('RGB')
    box = asset['box']; assert patch.size == (box[2]-box[0],box[3]-box[1])
    display = image.copy(); display.paste(patch, box)
    assert sha(display.tobytes()) == asset['approved_rgb_sha256'], 'Output does not match the owner-approved photo; stop.'
    assert ImageChops.difference(display,image).getbbox() == box
    if destination.exists():
        assert sha(Image.open(destination).convert('RGB').tobytes()) == asset['approved_rgb_sha256']
    else:
        display.save(destination,format='PNG')
    assert Image.open(destination).format == 'PNG'
    old=f'src="/history/{asset["source"]}"'; new=f'src="/history/{asset["destination"]}"'
    if old in updated_source:
        assert updated_source.count(old)==1
        updated_source=updated_source.replace(old,new,1)
    else:
        assert updated_source.count(new)==1
    manifest.append({**asset, 'committed_png_sha256':sha(destination.read_bytes()), 'pixel_identical_to_approved':True,'original_retained':True})
    print(f'Approved photo {index}: exact whole-image RGB match; source preserved.')
# Undo the two path substitutions to prove no markup, copy, form or styling changed.
reversed_source=updated_source
for asset in ASSETS:
    reversed_source=reversed_source.replace(f'src="/history/{asset["destination"]}"',f'src="/history/{asset["source"]}"')
if original_source != updated_source:
    assert reversed_source == original_source
page.write_text(updated_source)
Path('docs/approved-prize-photo-assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
