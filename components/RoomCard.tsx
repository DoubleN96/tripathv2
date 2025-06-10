import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Room } from '../types';

interface Props {
  room: Room & { property?: { city: string | null; address: string | null } };
}

export default function RoomCard({ room }: Props) {
  const image = Array.isArray(room.photos) ? room.photos[0] : null;
  return (
    <Card>
      <CardHeader>
        {image && <img src={image} alt={room.title} className="w-full h-48 object-cover" />}
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">{room.title}</h3>
        <p className="text-muted-foreground">{room.property?.city}, {room.property?.address}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">{room.price_monthly} €/al mes</span>
          <span className="text-green-600 text-xs font-semibold">VERIFICADO</span>
        </div>
        <Link href={`/room/${room.id}`} className="underline text-primary">
          Ver habitación
        </Link>
      </CardContent>
    </Card>
  );
}
