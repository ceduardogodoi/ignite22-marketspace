import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';

import { CreateUserDTO } from '../dtos/User';

class UserService {
  async create({ avatar, name, email, tel, password }: CreateUserDTO) {
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

    await http.post<void, AxiosResponse<void, CreateUserDTO>, FormData>(
      '/users',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
  }
}

const userService = new UserService();

export { userService };
