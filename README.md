# Uvril Social Growth

Premium dark-neon storefront starter built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Included
- Responsive storefront, platform categories, service catalog and package selection
- Supabase Auth signup/login/logout/password reset
- Persistent customer orders, dashboard and purchase history
- Cash App manual payment submission with private receipt storage
- Separate payment and fulfillment statuses
- Server-checked admin role for the admin console and payment review endpoint
- Audit log entries for payment reviews
- Terms, privacy, high-visibility Discord and Instagram contact links

## Important launch status
This is a deployable application foundation, but it is **not live until configured**. It does not process Cash App payments automatically and does not connect to an SMM fulfillment provider. The Cash App $Cashtag is intentionally blank. The admin console currently supports payment review and a basic order queue; service/package CRUD, fulfillment editing, customer search, and sales analytics are follow-on admin features rather than implemented UI controls.

## Requirements
- Node.js 18.17+
- Supabase project

## Setup
1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only; do not prefix with NEXT_PUBLIC)
   - `NEXT_PUBLIC_SITE_URL`
4. In Supabase Auth settings, configure your site URL and redirect URLs, including `http://localhost:3000/**` for development and your production domain.
5. Install and run:
   ```bash
   npm install
   npm run dev
   ```
6. Register your owner account. Find its UUID in Supabase Authentication > Users, then run:
   ```sql
   update public.profiles set role='admin' where id='YOUR-AUTH-USER-UUID';
   ```
7. Set the Cash App $Cashtag in `site_settings`:
   ```sql
   update public.site_settings set cash_app_cashtag='$YourCashtag', updated_at=now() where id=1;
   ```
   Replace the example with the actual owner-supplied Cashtag. Never add Cash App credentials.
8. Add/edit services and packages in Supabase tables for now. The initial example Instagram follower packages are seeded by the schema.

## Deploy
- Push the project to a Git provider and import it into Vercel (or another Next.js host).
- Add the same environment variables in the host's project settings.
- Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.
- Configure Supabase Auth redirect URLs for production.
- Run `npm run build` before release.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.

## Security and operational checklist
- Review Supabase RLS policies and test using separate customer and admin accounts.
- Verify storage bucket privacy and receipt access.
- Add rate limiting / bot protection to auth and order/payment submission routes.
- Add server-side admin CRUD for catalog and fulfillment before operating at scale.
- Add transactional email notifications if desired.
- Have counsel review Terms and Privacy Policy for your jurisdiction and business model.
- Check platform terms before offering any artificial/incentivized engagement. No organic growth or retention claims are made.
- No fulfillment provider is integrated. Orders stay in manual fulfillment until an authorized admin updates them.
- Cash App is manual only. A submitted reference or screenshot never verifies payment automatically.

## Routes
`/` home · `/services` catalog · `/services/[id]` order configuration · `/login` · `/signup` · `/dashboard` · `/history` · `/orders/[id]` · `/admin` · `/terms` · `/privacy`

## Suggested next steps
1. Build full admin catalog and fulfillment forms.
2. Add signed/private receipt download flow in the admin view.
3. Add status-change audit logging for fulfillment changes.
4. Add automated tests, rate limits, monitoring and production error reporting.
