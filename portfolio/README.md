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

The `/upload` page requires the admin password configured as `ADMIN_PASSWORD`. The session cookie is signed with `ADMIN_SESSION_SECRET`. Keep both values in your local `.env` file or deployment environment settings; never commit them.

To enable Google sign-in, create an OAuth 2.0 web client in Google Cloud and set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and (optionally) `GOOGLE_REDIRECT_URI`. Add `https://your-domain.example/api/admin/google/callback` as an authorized redirect URI. Only the verified account `mengistuabawa19@gmail.com` is accepted.

The home image is saved in the Prisma `SiteSetting` table. After deploying the schema change, run `npx prisma db push` against the configured database. Uploaded images are limited to 2 MB and stored as data URLs in that database.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
