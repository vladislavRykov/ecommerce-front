import { MongooseCategoryPopulated, MongooseProductPopulated, PaymentBody } from '@/types/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

const API = {
  getAllProducts: ({ sort = 1 }: { sort?: -1 | 1 }) =>
    instance.get<MongooseProductPopulated[]>('/products', {
      params: {
        sort: sort,
      },
    }),
  getProductsByIds: (ids: string[]) => instance.post<MongooseProductPopulated[]>('/products', ids),
  getLatestProducts: (limit?: number) =>
    instance.get<MongooseProductPopulated[]>(`/products/latest?limit=${limit}`),
  getProductById: (id: string) => instance.get<MongooseProductPopulated>(`/product?id=${id}`),
  getFirstProduct: () => instance.get<MongooseProductPopulated>('/product'),

  getAllCategories: () => instance.get<MongooseCategoryPopulated[]>('/categories'),
  getCategoryById: (id: string) => instance.get<MongooseCategoryPopulated>(`/categories?id=${id}`),

  checkout: (paymentBody: PaymentBody) => instance.post<string[]>('/checkout', paymentBody),
};
export default API;
