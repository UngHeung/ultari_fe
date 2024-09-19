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
}

export interface ValidationResultOptions {
  success: boolean;
  message?: string;
}

export interface UserOptions {
  id: number;
  account: string;
  name: string;
  phone: string;
  email: string;
  profile?: string;
  role: string;
  isLoggedIn: boolean;
}
