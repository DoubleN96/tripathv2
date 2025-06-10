export type UserRole = 'tenant' | 'agency' | 'owner';
export type RoomStatus = 'available' | 'reserved' | 'occupied';
export type BookingStatus = 'pending' | 'paid' | 'confirmed' | 'cancelled';

export interface User {
  id: string;
  role: UserRole;
  name: string | null;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  address: string | null;
  city: string | null;
  video_url: string | null;
  photos: any; // JSONB
  agency_id: string | null;
}

export interface Room {
  id: string;
  title: string;
  size_m2: number | null;
  price_monthly: number;
  deposit: number | null;
  bills_included: boolean | null;
  available_from: string | null; // Date string
  status: RoomStatus;
  photos: any; // JSONB
  property_id: string;
  property?: Property; // joined data
}

export interface Booking {
  id: string;
  tenant_id: string | null;
  room_id: string | null;
  start_date: string | null;
  end_date: string | null;
  status: BookingStatus;
  contract_url: string | null;
}
