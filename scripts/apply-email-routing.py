"""One-time, hash-guarded integration into the recovered page component."""
from pathlib import Path
import hashlib
import re

path = Path("components/startupfair-page.tsx")
raw = path.read_bytes()
source = raw.decode("utf-8")
marker = 'import { EmailRoutingForm, EmailRecipientNotice } from "@/components/email-routing-form";'
if marker in source:
    assert "<form " not in source and source.count("<EmailRoutingForm ") == 49
    print("Email routing already integrated; no file rewritten.")
    raise SystemExit(0)
blob_sha = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
assert blob_sha == "6dbf0453486b33d23efb00b24b55d6fe7ade5fb3", "Source changed; stop rather than overwrite user edits."
starts = list(re.finditer(r"^(?:export )?function (\w+)\(", source, re.M))
parts = [source[:starts[0].start()]]
counts = {"general": 0, "challenges": 0, "talent": 0, "partners": 0}
for index, match in enumerate(starts):
    name = match[1]
    end = starts[index + 1].start() if index + 1 < len(starts) else len(source)
    chunk = source[match.start():end]
    if "<form " in chunk:
        if "Application" in name or name.startswith("ChallengeProposal"):
            category = "challenges"
        elif name.startswith(("TalentProfile", "TalentRequest")):
            category = "talent"
        elif name.startswith("PartnershipInquiry"):
            category = "partners"
        elif name in ("HomeInquiryPanel", "ContactPage"):
            category = "general"
        else:
            raise ValueError(f"Unmapped form: {name}")
        assert chunk.count("<form ") == chunk.count("</form>") == 1
        attrs = f'category="{category}"'
        if name == "HomeInquiryPanel":
            attrs += " routeByInterest"
        if name.endswith("ReviewPage") or name in ("HomeInquiryPanel", "ContactPage"):
            attrs += " showEmailContact"
        chunk = chunk.replace("<form ", f"<EmailRoutingForm {attrs} ").replace("</form>", "</EmailRoutingForm>")
        counts[category] += 1
    if name == "HomeInquiryPanel":
        old = """                <option>Launching a Challenge</option>
                <option>Joining as Talent</option>
                <option>Partnership</option>
                <option>Investment or Venture Opportunity</option>
                <option>General Inquiry</option>"""
        assert chunk.count(old) == 1
        chunk = chunk.replace(old, '                {INQUIRY_OPTIONS.map(({ label }) => <option key={label} value={label}>{label}</option>)}')
    if name == "ContactPage":
        for label, category in [("Propose a challenge", "challenges"), ("Submit a talent request", "talent"), ("Create a free profile", "talent"), ("Start a partnership inquiry", "partners"), ("Explore challenges", "challenges")]:
            pattern = rf'({re.escape(label)}</(?:Link|ActionLink)>)'
            chunk, n = re.subn(pattern, rf'\1\n            <EmailRecipientNotice category="{category}" />', chunk)
            assert n == 1, (label, n)
    parts.append(chunk)
updated = "".join(parts)
updated = updated.replace('import Link from "next/link";', 'import Link from "next/link";\n' + marker + '\nimport { INQUIRY_OPTIONS } from "@/lib/email-routing";', 1)
assert counts == {"general": 2, "challenges": 27, "talent": 13, "partners": 7}, counts
assert updated.count("<EmailRoutingForm ") == 49 and "<form " not in updated
# Preserve all existing submit handlers and all field names/validation.
assert re.findall(r'onSubmit=\{.*?\}\}', source) == re.findall(r'onSubmit=\{.*?\}\}', updated)
assert source.count('name=') == updated.count('name=')
path.write_text(updated, encoding="utf-8")
print(f"Integrated routing metadata for {sum(counts.values())} form screens: {counts}")
