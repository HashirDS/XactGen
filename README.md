# XactGen

Company website for **XactGen**, *Exact Solutions for the Next Generation*, with a built-in admin panel.

- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database and login**: Firebase (Firestore + Authentication + Storage)
- **Admin panel**: `/admin` (login at `/admin/login`)
- **SEO**: per-page meta tags, JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt`

---

## 1. Run it locally

Requires Node.js 18 or newer.

```bash
npm install
cp .env.local.example .env.local   # then fill in your Firebase values (step 2)
npm run dev
```

Open http://localhost:3000. The site also starts without Firebase configured: pages fall back to their built-in content, but the admin panel, contact form, blog and projects need Firebase.

## 2. Create your Firebase project

1. Go to https://console.firebase.google.com and click **Add project** (for example `xactgen`).
2. **Firestore Database**: click **Create database**, choose production mode, and pick a region close to your users.
3. **Authentication**: click **Get started**, enable **Email/Password**, then under **Users** click **Add user** with your admin email and a strong password.
4. Copy that user's **User UID**. Open `firestore.rules` and replace `REPLACE_WITH_ADMIN_UID` with it.
5. In **Firestore > Rules**, paste the whole `firestore.rules` file and click **Publish**.
6. **Project settings > Your apps > Web (`</>`)**: register a web app and copy the config values into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xactgen.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xactgen
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xactgen.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_SITE_URL=https://xactgen.com
```

`.env.local` is git-ignored. Never commit it.

## 3. Add starter content (optional)

Fills the empty database with the services, team, portfolio projects and one blog post. Safe to run more than once.

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword node scripts/seed.js
```

On Windows PowerShell:

```powershell
$env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="yourpassword"; node scripts/seed.js
```

After that, manage everything from `/admin`: services, projects, blog, team, messages and settings.

## 4. Company details

Contact details used across the site (email, phone, WhatsApp, LinkedIn, address, CEO) live in one file: `src/lib/site.ts`. SEO defaults (title, description, keywords) are in `src/lib/seo.ts`. Logos and icons are in `public/` and `public/brand/`.

## 5. Deploy

### Your own server (Node.js)

```bash
npm install
npm run build
npm run start          # serves on port 3000; use PORT=8080 npm run start to change it
```

Put the app behind Nginx or Apache as a reverse proxy with HTTPS, and keep it running with a process manager such as PM2:

```bash
npm install -g pm2
pm2 start npm --name xactgen -- start
pm2 save
```

Set the same `NEXT_PUBLIC_*` values from `.env.local` on the server **before** running `npm run build`, because they are baked into the build.

### Vercel (alternative)

Import the repository in Vercel, add the `NEXT_PUBLIC_*` environment variables in project settings, and deploy.

### After deploying

- In Firebase **Authentication > Settings > Authorized domains**, add your domain (for example `xactgen.com`).
- Submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## Project structure

```
src/
  app/              pages (home, services, projects, blog, about, contact, privacy, terms)
  app/admin/        admin panel (login, services, projects, blog, team, messages, settings, analytics)
  components/       UI, page sections, background effects (MilkyWay)
  lib/              site.ts (company details), seo.ts, firebase.ts, firestore helpers
scripts/seed.js     starter content for Firestore
firestore.rules     database security rules
```

Developed by [Datix AI](https://datixai.com).
