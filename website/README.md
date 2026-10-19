# Cercloud website

A static, single-page draft for Cercloud. The design deliberately shares
Cercano's Georgia + IBM Plex Mono typography, `daylight` and `cr4k3r_j4x`
palettes, editorial grid, and day/night selector while giving the enterprise
product its own illustration system.

## Preview

```bash
cd website
npm test
npm run serve
```

Then open `http://localhost:4173`.

## GitHub Pages

```bash
npm run test:pages
```

This produces a dependency-free static artifact in `dist/`. The repository
workflow at `.github/workflows/pages.yml` verifies website changes in pull
requests and deploys changes from `main` to
`https://cercano-ai.github.io/cercloud-site/`.

## Content posture

The page distinguishes shipped V1 capabilities from roadmap items. Keep that
line intact as the product evolves, especially for proxy-dependent controls
such as in-flight redaction, output filtering, and residency enforcement.

## Illustration set

The three original illustrations in `assets/` were generated with the built-in
ImageGen workflow and compressed to WebP for the site:

- `control-plane.webp` — one neutral layer connecting developer interfaces to
  local, partner, and frontier model destinations.
- `policy-edge.webp` — signed policy allowing an approved request and diverting
  a blocked request.
- `audit-visibility.webp` — identity-attributed activity flowing into an
  immutable ledger and usage view.

The generation brief used tactile isometric 3D hardware, matte polymer and
frosted glass, transparent backgrounds, and the shared Cercano palette:
charcoal `#1a1a1a`, cream `#fbf3e0`, orange `#ea8212`, lime `#bdf000`, and cyan
`#00c8e8`. Prompts explicitly prohibited words, logos, watermarks, and copied
reference compositions.
