import { createClient } from '@supabase/supabase-js';
import BookingWidget from '../../../components/BookingWidget';
import { Room } from '../../../types';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

interface Props { params: { id: string } }

export default async function RoomPage({ params }: Props) {
  const { data } = await supabase
    .from('rooms')
    .select('*, property:properties(*)')
    .eq('id', params.id)
    .single();

  if (!data) return <p>Room not found</p>;
  const room = data as Room & { property: any };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">{room.title}</h1>
        {Array.isArray(room.photos) && (
          <div className="grid grid-cols-2 gap-2">
            {room.photos.map((src: string) => (
              <img key={src} src={src} alt={room.title} className="object-cover" />
            ))}
          </div>
        )}
        <p>{room.property.address}</p>
        {room.property.video_url && (
          <a href={room.property.video_url} target="_blank" className="underline">Video Tour</a>
        )}
      </div>
      <BookingWidget price_monthly={room.price_monthly} deposit={room.deposit} roomId={room.id} />
    </div>
  );
}
