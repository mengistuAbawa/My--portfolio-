# Portfolio

## Deploy to Netlify

This is a Vite static site. The included `netlify.toml` configures Netlify to run
`npm run build` and publish the `dist` directory using Node.js 22.

1. Push this project to a Git provider and import the repository in Netlify.
2. If the repository contains this project in a subdirectory, set Netlify's base
   directory to that subdirectory (the folder containing `package.json`).
3. In **Site configuration → Environment variables**, add the EmailJS variables
   below if you want the contact form to send messages:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Trigger a deploy. Changes to these variables require a new deploy.

The EmailJS public key is intended for browser use. Never put private credentials
in `VITE_*` variables because Vite includes them in the public site bundle.

For local development, copy `.env.example` to `.env.local`, fill in the EmailJS
values, and run `npm ci` followed by `npm run dev`. Run `npm run build` to
test the production build locally.
