import { http } from '../libs/axios';
import { Advertisement } from '../dtos/Product';

class UserProductsService {
  async getAll(): Promise<Advertisement[]> {
    const response = await http.get<Advertisement[]>('/users/products');

    return response.data;
  }
}

const userProductsService = new UserProductsService();

export { userProductsService };
