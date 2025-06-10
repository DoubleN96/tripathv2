"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createBookingAndPay } from '../../actions';
import { Button } from '@/components/ui/button';

export default function ReservePage({ params }: { params: { roomId: string } }) {
  const search = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const moveInDate = search.get('moveInDate');
  const moveOutDate = search.get('moveOutDate');

  async function onSubmit() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('roomId', params.roomId);
    if (moveInDate) formData.append('startDate', moveInDate);
    if (moveOutDate) formData.append('endDate', moveOutDate);
    await createBookingAndPay(formData);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Confirm your booking</h1>
      <p>Move in: {moveInDate}</p>
      <p>Move out: {moveOutDate}</p>
      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button onClick={onSubmit}>Confirm and Pay</Button>
    </div>
  );
}
