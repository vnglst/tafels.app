import { test, expect } from "@playwright/test";

const errorsByPage = new WeakMap();

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  errorsByPage.set(page, errors);
  await page.route("https://cdn.buymeacoffee.com/**", (route) => route.abort());
});

test.afterEach(async ({ page }) => {
  expect(errorsByPage.get(page), "uncaught browser errors").toEqual([]);
});

async function pauseTime(page) {
  const now = new Date("2026-10-29T12:00:00Z");
  await page.clock.install({ time: now });
  await page.clock.pauseAt(new Date(now.getTime() + 1000));
}

async function answer(page, correct = true) {
  const question = await page.locator("h1").innerText();
  const [a, operator, b] = question.trim().split(/\s+/);
  const value =
    operator === "x" ? +a * +b : operator === "+" ? +a + +b : +a - +b;
  const buttons = page.locator("button");
  if (correct) {
    await page
      .getByRole("button", { name: String(value), exact: true })
      .click({ force: true });
  } else {
    const texts = await buttons.allTextContents();
    const index = texts.findIndex((text) => Number(text.trim()) !== value);
    await buttons.nth(index).click({ force: true });
  }
}

test("overview, client navigation and loading bar settle", async ({ page }) => {
  await page.goto("/");
  for (const name of [
    "Multiplications",
    "Additions",
    "Subtractions",
    "Practice",
  ]) {
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  }
  await expect(page.locator('a[href="table/1"]')).toBeVisible();
  await page.locator('a[href="table/1"]').click();
  await expect(page).toHaveURL(/\/table\/1$/);
  await expect(page.locator("button")).toHaveCount(9);
  await expect(page.locator(".indeterminate")).toHaveCount(0);
  await page.getByRole("link", { name: "Back" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".indeterminate")).toHaveCount(0);
});

for (const path of ["/table/1", "/add/10", "/subtract/10"]) {
  test(`${path}: wrong and correct answers, completion and saved unlock`, async ({
    page,
  }) => {
    await pauseTime(page);
    await page.goto(path);
    await expect(page.locator("button")).toHaveCount(9);
    await answer(page, false);
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            JSON.parse(localStorage.getItem("tafels-app-practice")).today
              .length,
        ),
      )
      .toBe(1);
    for (let index = 0; index < 10; index++) {
      await answer(page);
      await page.clock.runFor(300);
    }
    await expect(
      page.getByRole("heading", { name: "REPORT CARD" }),
    ).toBeVisible();
    await expect(page.getByText("Passed!")).toBeVisible();
    const next = page.getByRole("link", { name: "Next", exact: true });
    const nextPath = await next.getAttribute("href");
    await next.click({ force: true });
    await page.clock.runFor(300);
    await expect(page).toHaveURL(new RegExp(`${nextPath}$`));
    await expect(page.locator("button")).toHaveCount(9);
    await page.reload();
    await expect(page.locator("button")).toHaveCount(9);
    const category = path.startsWith("/table")
      ? "tables"
      : path.startsWith("/add")
        ? "adds"
        : "subtracts";
    const nextId = nextPath.split("/").at(-1);
    expect(
      await page.evaluate(
        ({ category, nextId }) =>
          JSON.parse(localStorage.getItem("tafels-app-v9"))[category][nextId]
            .unlocked,
        { category, nextId },
      ),
    ).toBe(true);
  });
}

test("flawless completion persists and restart works", async ({ page }) => {
  await pauseTime(page);
  await page.goto("/table/1");
  for (let index = 0; index < 10; index++) {
    await answer(page);
    await page.clock.runFor(300);
  }
  await expect(page.getByText("Flawless!")).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("tafels-app-v9")).tables[1].completed,
    ),
  ).toBe(true);
  await page
    .getByRole("link", { name: "Again", exact: true })
    .click({ force: true });
  await expect(page.locator("button")).toHaveCount(9);
});

test("question timeout is recorded for practice", async ({ page }) => {
  await page.goto("/table/1");
  await expect(page.locator("button")).toHaveCount(9);
  const original = await page.locator("h1").innerText();
  await expect(page.locator("h1")).not.toHaveText(original, { timeout: 25000 });
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("tafels-app-practice")).today.length,
    ),
  ).toBe(1);
});

test("practice moves a corrected mistake to later", async ({ page }) => {
  await pauseTime(page);
  await page.goto("/table/1");
  await expect(page.locator("button")).toHaveCount(9);
  await answer(page, false);
  await page.goto("/practice/today");
  await expect(page.locator("button")).toHaveCount(9);
  await answer(page);
  await page.clock.runFor(300);
  await expect(
    page.getByRole("heading", { name: "REPORT CARD" }),
  ).toBeVisible();
  const practice = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("tafels-app-practice")),
  );
  expect(practice.today).toHaveLength(0);
  expect(practice.someday).toHaveLength(1);
  expect(practice.someday[0].interval).toBe(2);
});

async function startArcade(page) {
  await pauseTime(page);
  await page.goto("/game");
  await expect(page.locator(".field button")).toHaveCount(1);
  // Set randomness after hydration: module initialization generates question banks.
  // The next three ticks produce 2, 2, 4, avoiding a probabilistic scoring test.
  await page.evaluate(() => {
    const values = [0, 0, 0.125, 0, 0, 0.125, 0, 0, 0.375];
    let index = 0;
    const original = Math.random;
    Math.random = Object.assign(() => values[index++ % values.length], {
      original,
    });
  });
  await page.clock.runFor(9000);
  await expect(page.locator(".field button")).toHaveCount(4);
  await page.clock.resume();
}

test("arcade selection, wrong answer, scoring, game over and restart", async ({
  page,
}) => {
  await startArcade(page);
  const numbers = page.locator(".field button");
  await numbers.nth(1).click();
  await expect(numbers.nth(1)).toHaveClass(/blue/);
  await numbers.nth(1).click();
  await expect(numbers.nth(1)).not.toHaveClass(/blue/);
  // 2 x 4 != 2: reset selection and keep numbers and score.
  for (const index of [1, 3, 2]) await numbers.nth(index).click();
  await page.clock.runFor(400);
  await expect(numbers).toHaveCount(4);
  await expect(page.locator(".field .blue")).toHaveCount(0);
  await expect(page.getByText("score: 0", { exact: true })).toBeVisible();
  // 2 x 2 = 4: remove the three selected tiles and add four points.
  for (const index of [1, 2, 3]) await numbers.nth(index).click();
  await page.clock.runFor(400);
  await expect(numbers).toHaveCount(1);
  await expect(page.getByText("score: 4", { exact: true })).toBeVisible();
  await page.clock.runFor(73000);
  await expect(page.getByRole("heading", { name: "GAME OVER" })).toBeVisible();
  await expect(page.getByText("New highscore!")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("highscore"))).toBe(
    "4",
  );
  await page.getByRole("button", { name: "New game" }).click();
  await expect(numbers).toHaveCount(0);
  await expect(page.getByText("score: 0", { exact: true })).toBeVisible();
  await expect(page.getByText("highscore: 4", { exact: true })).toBeVisible();
  await page.clock.runFor(3000);
  await expect(numbers).toHaveCount(1);
  await page.reload();
  await expect(page.getByText("highscore: 4", { exact: true })).toBeVisible();
});

test("arcade touch input and remount clean up the ticker", async ({
  page,
  isMobile,
}) => {
  await startArcade(page);
  const tile = page.locator(".field button").nth(1);
  if (isMobile) await tile.tap();
  else
    await tile.evaluate((element) =>
      element.dispatchEvent(
        new Event("touchstart", { bubbles: true, cancelable: true }),
      ),
    );
  await expect(tile).toHaveClass(/blue/);
  await page.evaluate(() => {
    Math.random = Reflect.get(Math.random, "original");
  });
  await page.getByRole("link", { name: "Back" }).click();
  await page.clock.runFor(300);
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".field")).toHaveCount(0);
  await page.clock.runFor(10000);
  await page.locator('a[href="/game"]').click();
  await page.clock.runFor(300);
  await expect(page.locator(".field button")).toHaveCount(1);
  await page.clock.runFor(3000);
  await expect(page.locator(".field button")).toHaveCount(2);
  await expect(page.locator(".indeterminate")).toHaveCount(0);
});

test("account name and avatar persist across reloads", async ({ page }) => {
  await page.goto("/account");
  await page.getByLabel("Your name").fill("Test Player");
  const firstAvatar = await page
    .getByRole("img", { name: "Test Player", exact: true })
    .getAttribute("src");
  expect(firstAvatar).toMatch(/^data:image\/svg\+xml/);
  expect(decodeURIComponent(firstAvatar)).toContain("<svg");
  await page.getByLabel("Your name").fill("Other Player");
  await expect(
    page.getByRole("img", { name: "Other Player", exact: true }),
  ).not.toHaveAttribute("src", firstAvatar);
  await page.getByLabel("Your name").fill("Test Player");
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("Test Player");
  const avatar = page.getByRole("img", { name: "Test Player", exact: true });
  await expect(avatar).toHaveAttribute("src", firstAvatar);
  await expect(avatar).toHaveJSProperty("complete", true);
  expect(
    await avatar.evaluate(
      (img) => img instanceof HTMLImageElement && img.naturalWidth,
    ),
  ).toBeGreaterThan(0);
});

test("static routes, sound assets, and real 404s", async ({ request }) => {
  const routes = [
    "/",
    "/account",
    "/game",
    "/practice/today",
    ...[1, 10, 2, 5, 3, 4, 6, 7, 8, 9, 11, 20].map((n) => `/table/${n}`),
    ...["add", "subtract"].flatMap((category) =>
      [10, 15, 20, 25, 50, 75, 100, 200, 250, 500, 750, 999].map(
        (n) => `/${category}/${n}`,
      ),
    ),
  ];
  for (const path of routes) {
    expect((await request.get(path)).status()).toBe(200);
  }
  for (const name of ["hooyeah", "nock", "nope", "squakk", "tik"]) {
    const sound = await request.get(`/sounds/${name}.mp3`);
    expect(sound.status()).toBe(200);
    expect((await sound.body()).length).toBeGreaterThan(1000);
  }
  for (const path of [
    "/does-not-exist",
    "/bigheads?seed=old-server",
    "/table/999",
    "/sounds/missing.mp3",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});
