'use client';
import { MongooseProductPopulated } from '@/types/types';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList/ProductList';
import s from './ProductsPage.module.scss';
import API from '@/services/api/api';

const ProductsPage = () => {
  // const res = await fetch(`${process.env.API_URL}/api/products?sort=1`, {
  //   method: 'GET',
  //   next: { revalidate: 20 },
  // });
  // const data: MongooseProductPopulated[] = await res.json();
  const [products, setProducts] = useState<MongooseProductPopulated[]>([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await API.getAllProducts({});
      setProducts(res.data);
    };
    getProduct();
  }, []);
  return (
    <div>
      <h2 className={s.title}>Все товары</h2>
      <ProductList list={products} />
    </div>
  );
};

export default ProductsPage;
