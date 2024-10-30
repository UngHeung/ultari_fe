import { UserOptions } from '@/components/auth/interfaces/authInterface';

interface TeamOptions {
  id: number;
  name: string;
  community: string;
  createAt: string;
  leader: UserOptions;
  subLeader?: UserOptions;
  Member: UserOptions[];
}

const initialState: TeamOptions = {
  id: 0,
  name: '',
  community: '',
  createAt: '',
  leader: {
    id: -1,
    account: '',
    name: '',
    phone: '',
    email: '',
    role: 'ROLE_ADMIN',
  },
  subLeader: undefined,
  Member: [],
};
