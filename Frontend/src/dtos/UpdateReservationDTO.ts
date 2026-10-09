import type { CreateReservationDTO } from './CreateReservationDTO';

export type UpdateReservationDTO = Partial<CreateReservationDTO> & { status?: string };
