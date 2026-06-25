# BrowserStack Self-Heal Demo

A demo project showcasing **BrowserStack Self-Heal** — an AI-powered feature that automatically fixes broken Selenium selectors when your app's HTML changes.

🔗 **Demo Website:** https://bstack_self-heal.site.drasticcoder.in/

---

## 📋 Prerequisites

- Node.js (v16+)
- A [BrowserStack](https://www.browserstack.com) account (username & access key)
- VS Code with the **Live Server** extension (for local testing)

---

## 🚀 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BrowserStackCE/bstack-self-heal.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure BrowserStack credentials**

   Copy `env.sample` to `.env` and fill in your credentials:

   ```bash
   cp env.sample .env
   ```

   Then edit `.env`:

   ```
   BROWSERSTACK_USERNAME=your_browserstack_username
   BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
   ```

   > Get your credentials from [BrowserStack Automate dashboard](https://automate.browserstack.com/dashboard).

---

## 🌐 Running the Website

### Option A — Local Testing (VS Code Live Server)

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `index.html` → **Open with Live Server**.
4. The site will be served at `http://127.0.0.1:5500/`.
5. The test file (`test.js`) is pre-configured to use this URL.

### Option B — Public Website

If you don't want to run locally, use the hosted version:

```
https://bstack_self-heal.site.drasticcoder.in/
```

Update `PAGE_URL` in `test.js` to point to this URL instead of `localhost`.

---

## ▶️ Running the Tests

```bash
npm run test
```

This runs the Selenium test suite on BrowserStack using the SDK.

---

## 🛡️ Testing Self-Heal

Self-Heal works by detecting broken selectors and automatically healing them using AI. Here's how to demo it:

### Step 1 — Run a passing session (baseline)

Run the tests once with the default selectors. All 3 tests should pass. This establishes the baseline for Self-Heal.

```bash
npm run test
```

### Step 2 — Break the selectors & run again

You can break the selectors in two ways:

#### Method A — Use the Self-Heal Toggle (quick demo)

The page has a **🛡️ Self-Heal** toggle in the header. When enabled, it swaps all actionable element IDs/classes to `-action-` variants (e.g. `#explore-menu-btn` → `#explore-menu-action`), simulating a real-world selector breakage.

To activate this in the test, open `test.js` and **uncomment the marked line**:

```js
// TODO: Uncomment the line below to enable the Self-Heal toggle
// await driver.executeScript('arguments[0].click();', toggle);
```

Remove the `//` from the `executeScript` line so it reads:

```js
await driver.executeScript('arguments[0].click();', toggle);
```

Then run the tests again:

```bash
npm run test
```

BrowserStack Self-Heal will detect the broken selectors and fix them automatically.

#### Method B — Manually update selectors in `index.html`

See the [Manual Selector Tweaking Guide](#-manual-selector-tweaking-guide) below.

---

## ✏️ Manual Selector Tweaking Guide

You can manually change element IDs or classes in `index.html` to simulate selector breakage. Here's how:

### Buttons

Find these elements in `index.html` and rename their `id` attributes:

| Element             | Current ID         | Example broken ID         |
| ------------------- | ------------------ | ------------------------- |
| Explore Menu button | `explore-menu-btn` | `explore-menu-action-btn` |
| Contact Us button   | `contact-us-btn`   | `contact-us-action-btn`   |
| Send Message button | `send-message-btn` | `send-message-action-btn` |

**Example — before:**

```html
<button id="explore-menu-btn" onclick="...">Explore Menu</button>
```

**After (broken):**

```html
<button id="explore-menu-action-btn" onclick="...">Explore Menu</button>
```

### Form Inputs

Find the contact form inputs and rename their `class` attributes:

| Element          | Current class           | Example broken class           |
| ---------------- | ----------------------- | ------------------------------ |
| Name input       | `contact-name-input`    | `contact-name-action-input`    |
| Email input      | `contact-email-input`   | `contact-email-action-input`   |
| Message textarea | `contact-message-input` | `contact-message-action-input` |

**Example — before:**

```html
<input
  type="text"
  class="contact-name-input"
  placeholder="Your Name"
  required
/>
```

**After (broken):**

```html
<input
  type="text"
  class="contact-name-action-input"
  placeholder="Your Name"
  required
/>
```

### Contact Form

| Element      | Current ID     | Example broken ID     |
| ------------ | -------------- | --------------------- |
| Contact form | `contact-form` | `contact-action-form` |

After making changes, run `npm run test` — BrowserStack Self-Heal will detect and fix the broken selectors automatically.

> **Note:** All `//TODO:` comments in `test.js` and `index.html` mark the places where changes are needed for the Self-Heal demo.

---

## 📁 Project Structure

```
Self-Heal/
├── index.html          # Demo bakery website
├── style.css           # Styles
├── test.js             # Selenium test suite
├── browserstack.yml    # BrowserStack SDK config
├── package.json
├── env.sample         # Sample environment variables
└── README.md
```

---

## 🔗 Resources

- [BrowserStack Self-Heal Docs](https://www.browserstack.com/docs/automate/selenium/self-healing-tests)
- [BrowserStack Automate](https://automate.browserstack.com)
- [Live Demo Site](https://bstack_self-heal.site.drasticcoder.in/)
