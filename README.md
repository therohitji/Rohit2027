# Rohit2027

Everything behind [www.rohitswerashi.com](https://www.rohitswerashi.com), the personal website of Rohit Swerashi.

The site is live on Hostinger. This repository is the source. Changing a file here does not change the website until it is published, see [Publish to the website](#publish-to-the-website).

## What is in this repository

Only the code of the website, in `rohit-swerashi/`. Original photos, logos and working files are kept elsewhere.

## Run it on your laptop

You need Node.js 20 or newer.

```bash
cd rohit-swerashi
npm install
npm run dev
```

Open http://127.0.0.1:5188. Saved changes appear straight away.

To see the finished build:

```bash
npm run build
npm run preview
```

Open http://127.0.0.1:5189.

`npm run build` writes a separate HTML file for each page so search engines can read them. It uses Playwright, so install it once if the build asks for it: `npx playwright install chromium`.

## Change something

All paths are inside `rohit-swerashi/`.

### Words and numbers

| What you want to change | File |
|---|---|
| Name, email, location, social links, Welcome page numbers | `src/content/site.js` |
| The companies and projects | `src/content/projects.js`, `src/content/work.js` |
| The long stories on each Experience page | `src/content/stories.js` |
| The Profile page text | `src/content/era.js` |
| The Welcome page whiteboards | `src/content/whiteboard.js` |
| AI tools and the names in the footer animation (`WALK_TOOLS`) | `src/content/ai.js` |
| Other short text | `src/content/copy.js` |
| Page titles and Google descriptions | `src/content/seo.js` |

### Moments wall on the Profile page

The list is in `src/content/moments.js`. Each photo looks like this:

```js
{
  "src": "/assets/moments/keynote-niet-2023.webp",
  "t": "Keynote @NIET",
  "y": "2023",
  "c": 3,
  "r": 4,
  "pos": "50% 20%"
}
```

| Field | Meaning |
|---|---|
| `src` | The image, inside `public/assets/moments/`. Use WebP, up to 1400 px on the long side. |
| `t`, `y` | The tag shown on the photo: name and year. |
| `c` | Width, out of 12 columns. `6` is big, `3` or `4` is small. |
| `r` | Height in rows. |
| `pos` | Which part of the photo stays in frame. `50% 20%` keeps the upper part, which suits faces. |

Photos appear in list order. Move an entry up or down to move the photo. Each row should add up to 12 columns or the wall will show a gap.

### Look and feel

| What you want to change | File |
|---|---|
| Colours, sizes, phone layout | `src/styles/theme.css`. It loads last, so its rules win. |
| Top menu, including the phone menu | `src/components/SiteNav.jsx` |
| Footer | `src/components/Footer.jsx` |
| Footer animation: robot, city, tool boxes | `src/components/BoardWalk.jsx` |
| Road animation at the top of the Welcome page | `src/pages/home/Street.jsx` |
| Pages and their sections | `src/pages/` |
| Images | `public/assets/` |

When you replace an image, give it a new file name. Browsers keep old images, and a new name makes everyone see the new one.

## Publish to the website

Publishing runs from a laptop that has the server details.

Set it up once:

1. In `rohit-swerashi/`, copy `.deploy.env.example` to `.deploy.env`.
2. Fill in the Hostinger details. This file never goes to GitHub.
3. Put the SSH key at the path you gave in `DEPLOY_KEY`.

Then, each time:

```bash
cd rohit-swerashi
git pull
npm install
npm run deploy
```

This builds the site, saves a backup of the current site on the server in `~/backups`, and uploads the new version. It takes about a minute. If a page looks old afterwards, close the tab and open it again.

### Go back to an earlier version

Backups are on the server in `~/backups`, named by date and time. To restore one, connect to the server and run:

```bash
cd ~/domains/rohitswerashi.com
tar xzf ~/backups/rohitswerashi-public_html-YYYYMMDD-HHMMSS.tgz
```

## Save your changes to GitHub

```bash
git add -A
git commit -m "Say what changed"
git push
```

If you edit a file on the GitHub website, run `git pull` on the laptop before you publish.

To save everything as a zip, use **Code > Download ZIP** at the top of this page.

## Check before publishing

```bash
cd rohit-swerashi
npm run build && npm run preview
node qa/run.cjs http://127.0.0.1:5189
```

The second command takes about eight minutes. It opens every page on laptop and phone sizes and checks text, buttons, links and overflow. It prints each failure and a total at the end.

To check what search engines receive, run this after publishing:

```bash
node qa/seo.mjs https://www.rohitswerashi.com
```

On the live site, the browser check reports three failures for `/does-not-exist`. That page is meant to return a 404, so those three are expected.

## After a big update

Tell search engines that pages changed:

```bash
bash scripts/indexnow.sh
```

## Keep this repository clean

This repository is public, so anyone can read every file and its history.

- Never commit passwords, API keys, SSH keys or server addresses. `.deploy.env` is ignored for this reason.
- Do not commit customer data or private company numbers.
- Original photos, research notes and old backups are not part of this repository.
