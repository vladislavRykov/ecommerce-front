'use client';
import React, { useEffect, useState } from 'react';
import s from './LatestProducts.module.scss';
import API from '@/services/api/api';
import { MongooseProductPopulated } from '@/types/types';
import LatestProductItem from './LatestProductItem/LatestProductItem';
import { useHorizontalScroll } from '@/hooks/useHoriontalScroll';
import { useAppSelector } from '@/hooks/reduxHooks';

const LatestProducts = () => {
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const [data, setData] = useState<MongooseProductPopulated[]>([]);
  useEffect(() => {
    const getLatestProducts = async () => {
      const { data } = await API.getLatestProducts(10);
      setData(data);
    };
    getLatestProducts();
  }, []);
  // const res = await fetch(`${process.env.API_URL}/api/products/latest?limit=4`, {
  //   method: 'GET',
  //   next: { revalidate: 20 },
  // });
  // const data: MongooseProductPopulated[] = await res.json();

  console.log(data);
  return (
    <div className={s.latestproducts}>
      <h2 className={s.latestproducts_title}>Последние товары</h2>
      <div ref={scrollRef} className={s.latestproducts_products}>
        {data.map((product) => (
          <LatestProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
