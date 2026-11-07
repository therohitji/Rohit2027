#!/usr/bin/env bash
# Tells Bing and other IndexNow engines about every page in the sitemap. Run once after a deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY'
import glob, json, os, re, urllib.request
key = next(os.path.basename(f)[:-4] for f in glob.glob("public/*.txt") if re.fullmatch(r"[0-9a-f]{32}\.txt", os.path.basename(f)))
urls = re.findall(r"<loc>([^<]+)</loc>", open("dist/sitemap.xml").read())
body = json.dumps({"host": "www.rohitswerashi.com", "key": key, "keyLocation": f"https://www.rohitswerashi.com/{key}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, headers={"Content-Type": "application/json; charset=utf-8"})
print("IndexNow:", urllib.request.urlopen(req, timeout=30).status, len(urls), "URLs")
PY
