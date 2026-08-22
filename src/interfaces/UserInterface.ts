export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'client' | 'admin';
}
