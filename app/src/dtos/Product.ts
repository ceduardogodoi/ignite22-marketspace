import { paymentMethods } from '../types/PaymentMethod';

export interface ProductDTO {
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
}

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

export type ProductImagesDTO = Array<{ uri: string }>;

interface ProductImage {
  id: string;
  path: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

export type ProductImages = ProductImage[];

export interface Advertisement extends Product {
  product_images: Array<Pick<ProductImage, 'id' | 'path'>>;
  payment_methods: Array<typeof paymentMethods[number]>;
}
