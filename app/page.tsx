import { createClient } from '@supabase/supabase-js';
import RoomCard from '../components/RoomCard';
import { Room } from '../types';

// Assume env vars SUPABASE_URL and SUPABASE_ANON_KEY are set
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default async function Page() {
  const { data } = await supabase
    .from('rooms')
    .select('*, property:properties(city, address)')
    .eq('status', 'available');

  const rooms = (data as (Room & { property: { city: string | null; address: string | null } })[]) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
