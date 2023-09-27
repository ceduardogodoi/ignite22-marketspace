import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';

import {
  Session,
} from '../contexts/Authentication/Authentication.model';

import { SignInDTO } from '../dtos/SignIn';

class SessionService {
  async create({ email, password }: SignInDTO) {
    const response = await http.post<
      Session,
      AxiosResponse<Session, SignInDTO>,
      SignInDTO
    >('/sessions', {
      email,
      password,
    });

    return response.data;
  }
}

const sessionService = new SessionService();

export { sessionService };
