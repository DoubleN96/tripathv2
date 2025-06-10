'use server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function createBookingAndPay(formData: FormData) {
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const roomId = String(formData.get('roomId'));
  const startDate = formData.get('startDate') as string | null;
  const endDate = formData.get('endDate') as string | null;

  const { data: room } = await supabase
    .from('rooms')
    .select('price_monthly')
    .eq('id', roomId)
    .single();

  const priceMonthly = room?.price_monthly ?? 0;

  const { data: booking } = await supabase
    .from('bookings')
    .insert({ tenant_id: null, room_id: roomId, start_date: startDate, end_date: endDate, status: 'pending' })
    .select()
    .single();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: `Booking for room ${roomId}` },
          unit_amount: priceMonthly * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/room/${roomId}`,
    metadata: { booking_id: booking.id },
    customer_email: email,
    client_reference_id: name,
  });

  redirect(session.url!);
}
