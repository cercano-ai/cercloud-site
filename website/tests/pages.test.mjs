import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);

test("builds a GitHub Pages artifact for the Cercloud project site", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");

  assert.match(html, /https:\/\/cercano-ai\.github\.io\/cercloud-site\//);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="site\.js"/);
  assert.match(html, /src="assets\/control-plane-v2\.svg"/);
  assert.doesNotMatch(html, /(?:href|src)="\/[^/"]/);
  await access(new URL(".nojekyll", dist));
});

test("includes every production asset and excludes development files", async () => {
  for (const file of [
    "assets/control-plane.webp",
    "assets/control-plane-v2.svg",
    "assets/policy-edge.webp",
    "assets/audit-visibility.webp",
    "assets/favicon.svg",
    "assets/model-policy-960.webp",
    "assets/model-policy-1440.webp",
    "assets/people-teams-960.webp",
    "assets/people-teams-1440.webp",
  ]) {
    const asset = await stat(new URL(file, dist));
    assert.ok(asset.size > 0, `${file} should be present in the Pages artifact`);
  }

  await assert.rejects(access(new URL("package.json", dist)));
  await assert.rejects(access(new URL("tests/", dist)));
});
