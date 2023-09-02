import { AxiosResponse } from 'axios';

import { http } from '../libs/axios';
import { Product, ProductDTO, ProductImages, ProductImagesDTO } from '../dtos/Product';

class ProductService {
  async create(
    data: ProductDTO,
    images: ProductImagesDTO
  ): Promise<void> {
    const {
      name,
      description,
      is_new,
      price,
      accept_trade,
      payment_methods,
    } = data;

    const response = await http.post<
      Product,
      AxiosResponse<Product, ProductDTO>,
      ProductDTO
    >('/products', {
      name,
      description,
      is_new,
      price,
      accept_trade,
      payment_methods,
    });

    const product = response.data;

    const formData = new FormData();
    formData.append('product_id', product.id);
    images.forEach(image => {
      const fileExtension = image.uri.split('.').pop() ?? '*';

      formData.append('images', {
        uri: image.uri,
        name: new Date().getTime().toString(),
        type: `image/${fileExtension}`,
      });
    });

    await http.post<ProductImages, AxiosResponse<ProductImages, ProductImagesDTO>, FormData>(
      '/products/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  }
}

const productService = new ProductService();

export { productService };
