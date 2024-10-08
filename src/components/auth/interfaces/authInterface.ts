import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import { TeamOptioins } from '@/components/team/components/TeamDetail';

export interface LoginOptions {
  account?: string;
  password?: string;
}

export interface SignUpOptions {
  account?: string;
  password?: string;
  checkPassword?: string;
  name?: string;
  phone?: string;
  email?: string;
  community?: string;
}

export interface UserOptions {
  id: number;
  account: string;
  name: string;
  phone: string;
  email: string;
  community?: string;
  profile?: string;
  role: RoleTypes;
  isLoggedIn: boolean;
  team?: TeamOptioins;
  posts?: PostOptions[];
  likedPosts?: PostOptions[];
  lead?: TeamOptioins;
  subLead?: TeamOptioins;
}

export type RoleTypes =
  | 'ROLE_ADMIN'
  | 'ROLE_USER'
  | 'ROLE_SHEPHERD'
  | 'ROLE_SHEEP';
