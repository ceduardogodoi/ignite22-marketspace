import { AxiosResponse } from 'axios';
import { http } from '../libs/axios';

interface UserDTO {
  avatar: string;
  name: string;
  email: string;
  tel: string;
  password: string;
}

interface User extends UserDTO {
  id: string;
}

class UsersService {
  async create({ avatar, name, email, tel, password }: UserDTO) {
    const fileExtension = avatar.split('.').pop() ?? '*';

    const avatarFile = {
      uri: avatar,
      name: `${name}.${fileExtension}`.toLowerCase(),
      type: `image/${fileExtension}`,
    } as any;

    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('password', password);

    try {
      await http.post<User, AxiosResponse<User, UserDTO>>(
        '/users',
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
    } catch (error) {
      console.log('error.response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

const usersService = new UsersService();

export { usersService };
