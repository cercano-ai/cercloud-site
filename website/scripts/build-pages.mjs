import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const dist = new URL("dist/", root);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of ["index.html", "styles.css", "site.js"]) {
  await cp(new URL(file, root), new URL(file, dist));
}

await cp(new URL("assets/", root), new URL("assets/", dist), { recursive: true });
await writeFile(new URL(".nojekyll", dist), "");

console.log(`GitHub Pages artifact built at ${fileURLToPath(dist)}`);
