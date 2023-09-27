import { SignInDTO } from '../../dtos/SignIn';

interface User {
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
  'refresh-token': string;
}

export interface AuthenticationModel {
  session?: Session;
  
  signIn(payload: SignInDTO): Promise<void>;
  signOut(): void;
}
