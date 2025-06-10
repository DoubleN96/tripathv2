"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface Props {
  price_monthly: number;
  deposit: number | null;
  roomId: string;
}

export default function BookingWidget({ price_monthly, deposit = 0, roomId }: Props) {
  const router = useRouter();
  const [moveInDate, setMoveInDate] = useState<Date | undefined>();
  const [moveOutDate, setMoveOutDate] = useState<Date | undefined>();

  const totalPrice = price_monthly + (deposit || 0);

  return (
    <div className="space-y-4 p-4 border rounded sticky top-4">
      <p className="text-xl font-semibold">{price_monthly} € per month</p>
      <div className="space-y-2">
        <label>MOVE IN</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{moveInDate?.toDateString() || 'Select date'}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={moveInDate} onSelect={setMoveInDate} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <label>MOVE OUT</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{moveOutDate?.toDateString() || 'Select date'}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={moveOutDate} onSelect={setMoveOutDate} />
          </PopoverContent>
        </Popover>
      </div>
      <p>Total: {totalPrice} €</p>
      <Button
        onClick={() => {
          const params = new URLSearchParams({
            moveInDate: moveInDate?.toISOString() || '',
            moveOutDate: moveOutDate?.toISOString() || '',
          });
          router.push(`/reserve/${roomId}?` + params.toString());
        }}
      >
        Continue
      </Button>
    </div>
  );
}
