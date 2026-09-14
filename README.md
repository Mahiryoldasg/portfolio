# Portfolio

Personal portfolio site for Mahir Yoldaş Gazeloğlu, Senior Frontend Engineer.
It presents production case studies from five years building fintech and BNPL
frontends, alongside an about page and a downloadable CV.

Case studies are MDX files in `content/case-studies/`, rendered as static pages
at build time.

## Stack

Next.js 16 (App Router) with React 19, TypeScript in strict mode, Tailwind CSS
v4 (CSS-first config, no `tailwind.config.js`), MDX for content, Resend for the
contact form, and Vitest for unit tests.

## Getting started

```bash
git clone https://github.com/Mahiryoldasg/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev
```

The site runs at http://localhost:3000. Every page except the contact form
works without any environment variables set.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |

Tests cover logic only: validators, formatters, and similar. Pages and
components are verified with the build and a browser, not unit tests.

## Environment variables

| Variable | Needed for | Notes |
|---|---|---|
| `SITE_URL` | Absolute URLs in metadata, `sitemap.xml`, `robots.txt` | Optional. Read at build time. Falls back to Render's own URL, then to localhost |
| `RESEND_API_KEY` | Sending contact form email | Runtime only. Server-side secret, never prefix with `NEXT_PUBLIC_` |
| `CONTACT_EMAIL_TO` | Where contact form email is delivered | Runtime only. See the Resend note below |

`SITE_URL` is read during `npm run build`, not at runtime, because the metadata,
sitemap and robots routes are all evaluated while building. Setting it only in a
runtime environment ships localhost URLs.

The two Resend variables are read only when the contact form is submitted, so
the build succeeds without them.

## Deploying to Render

The repo carries its own deployment config in `render.yaml`, so Render builds
the service from the file instead of settings typed into a form. You use the
dashboard once, to connect the repo.

1. Push `main` to GitHub. Render reads `render.yaml` from the connected branch,
   so the file has to be on GitHub, not just on your machine.
2. In Render, choose **New > Blueprint** and select the repository. Render finds
   `render.yaml` and shows the service it is about to create.
3. Render prompts for the two secrets marked `sync: false` in the blueprint:
   `RESEND_API_KEY` and `CONTACT_EMAIL_TO`. Everything else (build and start
   commands, port, region, health check) comes from the file.
4. Apply. Render builds and deploys.

After the first deploy you do not need the dashboard again. `autoDeployTrigger`
is set to `commit`, so every push to `main` deploys automatically.

### Notes

**You do not need to set `SITE_URL` for the first deploy.** The service URL does
not exist until the service does, so `lib/site.ts` falls back to Render's own
`RENDER_EXTERNAL_URL`, which Render provides at build time. The first build
already produces correct absolute URLs. Set `SITE_URL` explicitly only when a
custom domain is attached; it outranks Render's URL.

**`CONTACT_EMAIL_TO` has to be the address that owns the Resend account.** Until
a sending domain is verified, Resend sends from `onboarding@resend.dev`, and
that sender can only deliver to the account owner. Pointing it elsewhere fails
silently: the form reports success and no mail arrives.

**The free plan sleeps.** A free Render web service spins down after 15 minutes
of inactivity, and the next request pays a cold start of 20 to 90 seconds. See
[Keeping the free instance awake](#keeping-the-free-instance-awake) for how that
is worked around without paying for an always-on instance.

**Scaling past one instance needs one more variable.** The contact form is a
Server Action, and Next encrypts its closure with a key generated per build. Run
more than one instance without a shared
`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` and submissions fail with "Failed to find
Server Action". This does not apply to a single instance.

## Keeping the free instance awake

A free Render service spins down after 15 minutes of inactivity, so someone
opening the link cold waits on Render's loading page instead of seeing the site.
Two scheduled jobs keep it up through the hours the link is likely to be opened.
Neither lives in this repo, so both are written down here.

**Keep-alive.** A cron-job.org job requests
`https://mahirgazeloglu.onrender.com/` on `3,13,23,33,43,53 8-20 * * 1-6`
(Europe/Istanbul): every 10 minutes from 08:03 to 20:53, Monday to Saturday. Ten
minutes sits inside the 15-minute spin-down window with room for a missed run.

**Morning wake.** A second cron-job.org job, at `50 7 * * 1-6`, POSTs to this
repository to start the `Morning wake` workflow, whose runner requests the site.
It fires 13 minutes before the keep-alive window opens, close enough that the
service cannot fall asleep again in between.

### Why the morning wake goes through GitHub

cron-job.org keeps a warm service warm but cannot wake a sleeping one. It gives
up while Render is still serving its spin-up page, and Render's logs show the
request never reaching the app, so the service stays down. A GitHub runner holds
the connection through the full cold start and does wake it. GitHub's own
scheduler, though, delivered the morning runs about five hours late, which for
this job is the same as not running. So the reliable scheduler triggers the
capable runner, and neither is asked to do the half it is bad at.

### The dispatch request

| Field | Value |
|---|---|
| Method | `POST` |
| URL | `https://api.github.com/repos/Mahiryoldasg/portfolio/actions/workflows/morning-wake.yml/dispatches` |
| Body | `{"ref":"main"}` |
| `Authorization` | `Bearer <token>` |
| `Accept` | `application/vnd.github+json` |
| `Content-Type` | `application/json` |
| `X-GitHub-Api-Version` | `2022-11-28` |

GitHub answers `204 No Content`. That matters here: cron-job.org aborts any
response over 64 KB, which is what ruled out pointing it at a page on the site.

The token is a fine-grained personal access token scoped to this repository
alone, with **Actions: Read and write** and nothing else. It expires. When it
does, the morning wake fails quietly and the first visit of the day is slow
again, so the fix is to regenerate it and paste the new value into the
cron-job.org job.
