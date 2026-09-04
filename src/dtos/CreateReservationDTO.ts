import type { ReservationInterface } from '@/interfaces/ReservationInterface';

export type CreateReservationDTO = Omit<ReservationInterface, 'id' | 'status'>;
