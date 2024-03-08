import { MongooseProductPopulated } from '@/types/types';
import React from 'react';
import ProductList from './ProductList/ProductList';
import s from './ProductsPage.module.scss';

const ProductsPage = async () => {
  const res = await fetch(`${process.env.API_URL}/api/products?sort=1`, {
    method: 'GET',
    next: { revalidate: 20 },
  });
  const data: MongooseProductPopulated[] = await res.json();
  // const imgUrls = data.images?.map((img) => img.source);
  return (
    <div>
      <h2 className={s.title}>Все товары</h2>
      <ProductList list={data} />
    </div>
  );
};

export default ProductsPage;
