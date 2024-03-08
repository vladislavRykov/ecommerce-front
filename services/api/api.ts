import { MongooseCategoryPopulated, MongooseProductPopulated, PaymentBody } from '@/types/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

const API = {
  getAllProducts: () => instance.get<MongooseProductPopulated[]>('/products'),
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
