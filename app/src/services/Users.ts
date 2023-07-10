import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';

interface UserDTO {
  avatar: string;
  name: string;
  email: string;
  tel: string;
  password: string;
}

class UsersService {
  async create({ avatar, name, email, tel, password }: UserDTO) {
    const fileExtension = avatar.split('.').pop() ?? '*';

    const formData = new FormData();
    formData.append('avatar', {
      uri: avatar,
      name: `${name}.${fileExtension}`.toLowerCase(),
      type: `image/${fileExtension}`,
    });
    formData.append('name', name);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('password', password);

    await http.post<void, AxiosResponse<void, UserDTO>>(
      '/users',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
  }
}

const usersService = new UsersService();

export { usersService };
