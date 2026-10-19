import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships the complete Cercloud landing page", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  for (const copy of [
    "Govern every model.",
    "Your AI stack is already plural.",
    "Decide what is allowed—once.",
    "Use the right model path.",
    "Know who used what—and why.",
    "Enforced in V1",
    "Clearly on the roadmap",
    "Cercloud Enterprise",
  ]) {
    assert.match(html, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(html, /https:\/\/github\.com\/cercano-ai\/Cercano/);
  assert.match(html, /https:\/\/github\.com\/cercano-ai\/cercloud\/blob\/main\/product\/control-plane\.md/);
});

test("includes the generated illustration set", async () => {
  for (const name of ["control-plane", "policy-edge", "audit-visibility"]) {
    await access(new URL(`assets/${name}.webp`, root));
  }
  await access(new URL("assets/favicon.svg", root));
});

test("preserves the Cercano palette and day-night behavior", async () => {
  const [css, js] = await Promise.all([
    readFile(new URL("styles.css", root), "utf8"),
    readFile(new URL("site.js", root), "utf8"),
  ]);

  for (const color of ["#fbf3e0", "#3b3020", "#1e7a3c", "#1763a0", "#1a1a1a", "#ea8212", "#bdf000", "#00c8e8"]) {
    assert.match(css, new RegExp(color, "i"));
  }
  assert.match(css, /IBM Plex Mono/);
  assert.match(js, /localStorage\.setItem\("cercloud-theme"/);
});
