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

## Portfolio content

The portfolio has no admin login or public project-management interface. Featured projects are loaded from the database and seeded from `lib/data.ts` when the project table is empty. The home profile image is the static file configured in `lib/data.ts`.

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
2. Add optional SMTP variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) if contact form messages should be emailed as well as stored.
3. Import the GitHub repository in Vercel, set **Root Directory** to `portfolio`, and deploy. `vercel.json` selects `npm run build:vercel`, which applies `prisma/migrations` using `DIRECT_URL`, generates the PostgreSQL Prisma client, and builds the app. The regular `npm run build` remains available for the local SQLite setup.

For local development, keep using the SQLite `DATABASE_URL` in `.env` and run `npm run dev`. Do not commit `.env` or `prisma/dev.db`.
