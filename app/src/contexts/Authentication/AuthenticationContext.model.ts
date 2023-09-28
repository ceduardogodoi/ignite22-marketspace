import { SignInDTO } from '../../dtos/SignIn';

export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  tel: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  token: string;
  user: User;
  'refresh_token': string;
}

export interface AuthenticationContextModel {
  session?: Session | null;

  signIn(payload: SignInDTO): Promise<void>;
  signOut(): Promise<void>;
}
