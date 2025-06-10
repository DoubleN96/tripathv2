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

## Project Structure

- `types.ts` – TypeScript types for the Supabase schema.
- `components/RoomCard.tsx` – UI component to display a room card.
- `components/BookingWidget.tsx` – Client component for selecting dates and continuing to reservation.
- `app/page.tsx` – Server page listing available rooms.
- `app/room/[id]/page.tsx` – Server page showing room details with booking widget.
- `app/reserve/[roomId]/page.tsx` – Client page for reservation and payment.
- `app/actions.ts` – Server action to create a booking and start a Stripe Checkout session.
