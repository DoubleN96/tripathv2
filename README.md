# ChattyRental Example Code

This repository contains example code snippets for a Next.js 14 application using Supabase and Stripe.

## Setup

Install dependencies (requires internet):

```bash
npm install next react react-dom @supabase/supabase-js stripe
```

Add Shadcn UI components:

```bash
npx shadcn-ui@latest add card button popover calendar
```

Configure environment variables for Supabase and Stripe in a `.env.local` file.
Example variables:

```
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="public-anon-key"
SUPABASE_SERVICE_ROLE_KEY="service-role-key"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Project Structure

- `types.ts` – TypeScript types for the Supabase schema.
- `components/RoomCard.tsx` – UI component to display a room card.
- `components/BookingWidget.tsx` – Client component for selecting dates and continuing to reservation.
- `app/page.tsx` – Server page listing available rooms.
- `app/room/[id]/page.tsx` – Server page showing room details with booking widget.
- `app/reserve/[roomId]/page.tsx` – Client page for reservation and payment.
- `app/actions.ts` – Server action to create a booking and start a Stripe Checkout session.

## Deployment with Coolify

Because this project uses **Next.js**, it needs to run as a Node.js application when deployed.

1. Ensure `package.json` contains the standard Next.js scripts (`dev`, `build`, `start`).
2. Push your code to GitHub with `.env.local` excluded.
3. In Coolify, create a new **Application** and connect your repository.
4. Use `npm run build` as the build command and `npm run start` as the start command.
5. Define environment variables such as `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `PORT`.
6. Deploy and monitor the logs in Coolify to verify the app starts correctly.
