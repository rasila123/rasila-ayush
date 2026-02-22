# Rasila – Music & Artists

React frontend for Rasila: responsive landing page with Labels, Platforms, Artists, Music, Services, and Contact. Ready for Supabase and Vercel.

## Stack

- **React 18** + **Vite**
- **React Router** for routes
- **Supabase** (optional) – set env vars to connect
- **Vercel** – deploy with `vercel` or connect repo

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Connect Supabase

1. Copy `.env.example` to `.env`.
2. In [Supabase](https://app.supabase.com): Project → Settings → API.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.

You can then load Labels, Artists, Music, and Services from Supabase tables and pass them into the components (e.g. `<Labels labels={data} />`).

## Deploy on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), import the project.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Project → Settings → Environment Variables.
4. Deploy.

Or from CLI: `npx vercel`.

## Structure

- `src/components/` – Header, Hero, Labels, Platforms, Artists, Music, Services, Footer
- `src/pages/` – Home, Artist (dynamic), Music, Services, Contact
- `src/lib/supabase.js` – Supabase client (used when env is set)
- `public/logo.svg`, `public/placeholders/` – logo and placeholder images

Replace placeholders with your own images and content. All section images use the same responsive size via CSS variables in `src/index.css`.
