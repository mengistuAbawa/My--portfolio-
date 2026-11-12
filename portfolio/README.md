This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin uploads

Admin password and Google sign-in use Supabase Auth. Create a confirmed user for `mengistuabawa21@gmail.com` in the Supabase Dashboard under Authentication > Users and set its password there. Only that email can manage projects or upload the home image. The password is checked by Supabase Auth and is not stored in this repository or a Vercel environment variable.

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in local `.env.local` and Vercel. To enable Google sign-in, enable the Google provider under Supabase Authentication > Sign In / Providers, configure its Google OAuth client, set the Supabase project's Site URL to your website, and allow `https://YOUR-VERCEL-DOMAIN/auth/callback` in Supabase's redirect URL list. In Google Cloud, use the callback URL shown in Supabase's Google provider settings.

The home image is saved in the Prisma `SiteSetting` table. Uploaded images are limited to 2 MB and stored in the configured database.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## GitHub and Vercel deployment

This repository is connected to `https://github.com/mengistuAbawa/Portfolio-.git`. Push the project to GitHub, then import that repository in Vercel. Vercel's Git integration creates Preview deployments for branch pushes and Production deployments from the configured production branch.

The local app uses SQLite for development. Vercel deployments use PostgreSQL because the local SQLite file is not persistent across serverless deployments. The Vercel build runs the checked-in Prisma migrations before building Next.js.

### Before the first deployment

1. Create a Supabase project. Set `DATABASE_URL` to the Supavisor transaction-pool URL (port `6543`) and `DIRECT_URL` to the direct or session-pool URL (port `5432`) in Vercel Production and Preview environments. Use separate databases for Preview and Production.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or the project's anon key) in Vercel. These are Supabase's project URL and public client key.
3. Create and confirm the admin user `mengistuabawa21@gmail.com` in Supabase Authentication > Users. Set the admin password there. The application no longer reads `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET`.
4. To use Google sign-in, enable the Google provider in Supabase Authentication > Sign In / Providers and configure its OAuth credentials. Allow `https://YOUR-VERCEL-DOMAIN/auth/callback` in Supabase Auth redirect URLs and use Supabase's displayed callback URL in Google Cloud. Password sign-in does not require the Google provider.
5. Add optional SMTP variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) if contact form messages should be emailed as well as stored.
6. Import the GitHub repository in Vercel, set **Root Directory** to `portfolio`, and deploy. `vercel.json` selects `npm run build:vercel`, which applies `prisma/migrations` using `DIRECT_URL`, generates the PostgreSQL Prisma client, and builds the app. The regular `npm run build` remains available for the local SQLite setup.

For local development, keep using the SQLite `DATABASE_URL` in `.env` and run `npm run dev`. Do not commit `.env` or `prisma/dev.db`.
