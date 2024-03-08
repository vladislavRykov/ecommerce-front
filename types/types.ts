import { Overwrite } from './helperTypes';

export interface MongooseFile {
  _id: string;
  fileName: string;
  source: string;
  size: number;
  mimetype: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Product {
  name: string;
  category?: string;
  images?: string[];
  desc: string;
  price: number;
  properties?: { [key: string]: string };
}
export interface ProductPopulated
  extends Overwrite<Product, { images?: MongooseFile[]; category?: MongooseCategory }> {}
export interface MongooseProductPopulated extends ProductPopulated {
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface MongooseProduct extends Product {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface ApiMessage {
  message: string;
}
export type UploadFileResponseData = { fileId: string }[];
export interface Category {
  name: string;
  parent?: string;
  properties: {
    name: string;
    value: string[];
  }[];
}
export interface MongooseCategory extends Category {
  _id: string;
  __v: number;
}
export interface MongooseCategoryPopulated
  extends Overwrite<MongooseCategory, { parent?: MongooseCategory }> {}

export interface PaymentBody {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  street: string;
  country: string;
  productIds: string[];
}
