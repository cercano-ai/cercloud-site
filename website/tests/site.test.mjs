import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships the complete Cercloud landing page", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  for (const copy of [
    "Build at AI speed.",
    "Govern at enterprise scale.",
    "AI-native software delivery for the enterprise",
    "An AI platform that streamlines the SDLC",
    "See how Cercloud works",
    "Make every developer productive from day one.",
    "AI made code generation faster.",
    "The bottleneck moved.",
    "Cercloud modernizes the entire delivery loop",
    "Fewer low-confidence changes.",
    "The agent developers use.",
    "The platform the organization needs.",
    "Work wherever work happens.",
    "Build your organization into the system.",
    "Context — what agents know",
    "Skills — reusable capabilities",
    "Workflows — repeatable sequences",
    "Integrations — connected systems",
    "Specialized agents — persistent domain work",
    "Operate as one organization.",
    "Terminal and TUI",
    "IDE extensions",
    "Persistent hosted agents",
    "defined validation gates",
    "Requirements + context",
    "Evidence attached",
    "From company knowledge to ready-to-work agents.",
    "Context stays governed",
    "Decide what is allowed—once.",
    "Use the right model path—and make every token earn its place.",
    "Connect governance to real people.",
    "Connect Google Workspace over OIDC",
    "SAML 2.0",
    "SCIM 2.0",
    "Showback + chargeback",
    "Know who used what—and why.",
    "Make every improvement reusable.",
    "Improvement without surveillance",
    "related DORA measures",
    "Enterprise controls you can inspect.",
    "Identity + access",
    "Data + infrastructure",
    "Cercloud Enterprise",
    "Beta coming soon",
    "Talk to Cercloud",
  ]) {
    assert.match(html, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(html, /More code is not the goal\.[\s\S]*More trustworthy software delivered is\./);
  assert.doesNotMatch(html, /One developer experience\./);
  assert.doesNotMatch(html, /One agent runtime\.|system-stack/);
  assert.doesNotMatch(html, /The interface can change\.|The underlying system does not\./);
  assert.doesNotMatch(html, /The platform grows with your organization\.|Eliminate the AI review bottleneck\./);

  for (const qualifier of ["live today", "on the roadmap", "Product design in progress", "ENTERPRISE · PILOT", "PRO · EARLY", "V1 brief"]) {
    assert.doesNotMatch(html, new RegExp(qualifier, "i"));
  }

  assert.doesNotMatch(html, /https:\/\/github\.com\/cercano-ai\/Cercano/);
  assert.match(html, /href="https:\/\/cercano-ai\.github\.io\/Cercano\/">Start with Cercano/);
  assert.match(html, /href="mailto:hello@cercloud\.ai\?subject=Cercloud%20Enterprise">Talk to Cercloud/);
  assert.match(html, /class="brand-mark"/);
  assert.doesNotMatch(html, /https:\/\/github\.com\/cercano-ai\/cercloud/);
});

test("includes the illustration and console screenshot sets", async () => {
  for (const name of ["control-plane", "policy-edge", "audit-visibility"]) {
    await access(new URL(`assets/${name}.webp`, root));
  }
  await access(new URL("assets/favicon.svg", root));
  await access(new URL("assets/control-plane-v2.svg", root));
  await access(new URL("assets/control-plane-day.svg", root));
  await access(new URL("assets/audit-visibility-v2.svg", root));
  await access(new URL("assets/audit-visibility-day.svg", root));
  await access(new URL("assets/model-routing-v2.svg", root));
  await access(new URL("assets/model-routing-day.svg", root));

  for (const file of [
    "model-policy-960.webp",
    "model-policy-1440.webp",
    "people-teams-960.webp",
    "people-teams-1440.webp",
  ]) {
    await access(new URL(`assets/${file}`, root));
  }
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
  assert.match(js, /querySelectorAll\("\[data-day-src\]\[data-night-src\]"\)/);
  assert.match(js, /night \? image\.dataset\.nightSrc : image\.dataset\.daySrc/);
});
