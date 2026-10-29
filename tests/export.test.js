import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";

const root = resolve(import.meta.dirname, "../dist");
const routes = [
  "index",
  "account",
  "game",
  "practice/today",
  ...[1, 10, 2, 5, 3, 4, 6, 7, 8, 9, 11, 20].map((n) => `table/${n}`),
  ...["add", "subtract"].flatMap((category) =>
    [10, 15, 20, 25, 50, 75, 100, 200, 250, 500, 750, 999].map(
      (n) => `${category}/${n}`,
    ),
  ),
];

test("export contains exactly the 40 finite HTML route shells", async () => {
  const files = await readdir(root, { recursive: true });
  const actual = files.filter((file) => file.endsWith(".html")).sort();
  assert.deepEqual(actual, routes.map((route) => `${route}.html`).sort());
  for (const file of actual) {
    const html = await readFile(resolve(root, file), "utf8");
    assert.match(html, /<!DOCTYPE html>/i, file);
    assert.match(
      html,
      /import\(["'][^"']+\/entry\/start\.[^"']+\.js["']\)/,
      file,
    );
  }
});

test("every local HTML asset, JS import and CSS URL resolves inside dist", async () => {
  const files = await readdir(root, { recursive: true });
  let checked = 0;
  for (const file of files.filter((file) => /\.(html|js|css)$/.test(file))) {
    const source = await readFile(resolve(root, file), "utf8");
    const pattern = file.endsWith(".html")
      ? /(?:\b(?:src|href)=|import\()["']([^"']+)["']/g
      : file.endsWith(".js")
        ? /(?:from\s*|import\s*\()\s*["'](\.[^"']+)["']/g
        : /url\(["']?([^"')]+)["']?\)/g;
    for (const match of source.matchAll(pattern)) {
      const asset = match[1];
      if (/^(?:[a-z]+:|\/\/|#)/i.test(asset)) continue;
      const pathname = decodeURIComponent(asset.split(/[?#]/)[0]);
      const target = pathname.startsWith("/")
        ? resolve(root, `.${pathname}`)
        : resolve(root, dirname(file), pathname);
      assert.ok(
        !relative(root, target).startsWith(".."),
        `${file}: ${asset} escapes dist`,
      );
      assert.ok((await stat(target)).isFile(), `${file}: missing ${asset}`);
      checked++;
    }
  }
  assert.ok(checked > 500, `Only ${checked} asset references checked`);
});

test("manifest icons and all five sound effects are included", async () => {
  const manifest = JSON.parse(
    await readFile(resolve(root, "manifest.json"), "utf8"),
  );
  for (const icon of manifest.icons) {
    assert.ok(
      (await stat(resolve(root, icon.src.replace(/^\//, "")))).size > 0,
      icon.src,
    );
  }
  for (const name of ["hooyeah", "nock", "nope", "squakk", "tik"]) {
    assert.ok(
      (await stat(resolve(root, `sounds/${name}.mp3`))).size > 1000,
      name,
    );
  }
});
