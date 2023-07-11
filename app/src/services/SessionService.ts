import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';

interface CreateSessionProps {
  email: string;
  password: string;
}

interface Session {
  token: string;
  user: {
    id: string;
    avatar: string;
    name: string;
    email: string;
    tel: string;
    created_at: string;
    updated_at: string;
  };
}

class SessionService {
  async create({ email, password }: CreateSessionProps) {
    const response = await http.post<
      Session,
      AxiosResponse<Session, CreateSessionProps>,
      CreateSessionProps
    >('/sessions', {
      email,
      password,
    });

    return response.data;
  }
}

const sessionService = new SessionService();

export { sessionService };
