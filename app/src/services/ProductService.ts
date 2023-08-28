import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';
import { CreateAdvertisementFormData } from '../screens/CreateAdvertisement';

export interface Product {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class ProductService {
  async create({
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  }: CreateAdvertisementFormData): Promise<Product> {
    const response = await http.post<
      Product,
      AxiosResponse<Product, CreateAdvertisementFormData>,
      CreateAdvertisementFormData
    >('/products', {
      name,
      description,
      is_new,
      price,
      accept_trade,
      payment_methods,
    });

    return response.data;
  }
}

const productService = new ProductService();

export { productService };
