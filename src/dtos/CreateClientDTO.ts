import type { UserInterface } from '@/interfaces/UserInterface';

export type CreateClientDTO = Omit<UserInterface, 'id' | 'role'>;
