import { apiClient } from '.';
import { Product } from '../store/slices/product';

const getProducts = async () => await apiClient.get('/products');
const createProduct = async (product: Product) => await apiClient.post('/products', product);
const updateProduct = async (id: string) => await apiClient.put(`/products/${id}`);

export const productService = {
  getProducts,
  createProduct,
  updateProduct,
};
