# StoryForge ✦ Write with Consequence

An AI-powered writing co-pilot that challenges your choices, guards your continuity, and pushes your story toward its most dangerous, most honest version.

**Live demo:** `https://YOUR_USERNAME.github.io/storyforge`

---

## Features

- **🔥 The Forge** — AI scene co-writer with 6 personality archetypes (Dark Romance, Fantasy, Contemporary, Thriller, Paranormal, Comedy) + Rivalry Mode
- **📐 Blueprint** — Generate 3 plot skeletons, character conflict webs, a twist, and a multi-book arc from your parameters
- **✂️ Rewrite Lab** — Flags clichés, flat dialogue, and weak verbs then rewrites in Lyrical, Brutal, Minimalist, or Elevated tone
- **🗂 Project** — Live continuity tracker for secrets/clues + relationship heat map with adjustable sliders

---

## Setup

### 1. Deploy the Cloudflare Worker

StoryForge uses a Cloudflare Worker to call the Anthropic API securely — your API key never touches the browser.

1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) and create a free account
2. Click **Create Worker** → paste the contents of `worker.js`
3. Go to **Settings → Variables → Add Secret:**
   - Name: `ANTHROPIC_API_KEY`
   - Value: your `sk-ant-...` key from [console.anthropic.com](https://console.anthropic.com)
4. Click **Save and Deploy**
5. Copy your worker URL (e.g. `https://storyforge.your-name.workers.dev`)

### 2. Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Click **Save** — your app will be live at `https://YOUR_USERNAME.github.io/storyforge`

### 3. Lock down CORS (recommended)

In `worker.js`, change:
```js
"Access-Control-Allow-Origin": "*"
```
to:
```js
"Access-Control-Allow-Origin": "https://YOUR_USERNAME.github.io"
```
Then redeploy the worker.

### 4. Open the app

On first load, a setup modal will ask for your Worker URL. Paste it in — it saves to localStorage so you only enter it once.

---

## Tech Stack

- **Frontend:** Vanilla React (via Babel standalone) · Cormorant Garamond · DM Mono · Libre Baskerville
- **AI:** Anthropic Claude (claude-sonnet-4-5)
- **Proxy:** Cloudflare Workers (free tier)
- **Hosting:** GitHub Pages (free)

---

## File Structure

```
index.html    ← Main app (HTML + CSS + React components)
worker.js     ← Cloudflare Worker proxy (deploy separately)
README.md     ← This file
```

---

*Built with StoryForge · Powered by Claude*
