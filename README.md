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
NEXT_PUBLIC_SITE_URL=https://www.xactgenai.com
```

`.env.local` is git-ignored. Never commit it.

## 3. Website content and the admin panel

The site ships with built-in content (services, team, projects and blog posts) in `src/lib/default-content.ts`, so it looks complete before anything is in the database.

The first time the admin logs in at `/admin`, that content is copied into Firestore automatically. From then on the public pages read only from Firestore, so everything can be edited or deleted from the admin panel, and changes appear on the site within about a minute. This happens once; content the admin deletes is not added back.

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

- In Firebase **Authentication > Settings > Authorized domains**, add your domain (for example `www.xactgenai.com`).
- Submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## Project structure

```
src/
  app/              pages (home, services, projects, blog, about, contact, privacy, terms)
  app/admin/        admin panel (login, services, projects, blog, team, messages, settings, analytics)
  components/       UI, page sections, background effects (MilkyWay)
  lib/              site.ts (company details), default-content.ts (built-in content), seo.ts, firebase.ts, firestore helpers
firestore.rules     database security rules
```

Developed by [Datix AI](https://datixai.com).
