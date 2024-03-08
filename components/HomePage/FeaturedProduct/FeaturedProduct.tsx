'use client';
import API from '@/services/api/api';
import { MongooseProductPopulated } from '@/types/types';
import React, { useEffect, useState } from 'react';
import s from './FeaturedProduct.module.scss';
import Image from 'next/image';
import ImgSlider from './ImgSlider/ImgSlider';
import { BsCart2 } from 'react-icons/bs';
import Link from 'next/link';
import FeaturedBtns from './FeaturedBtns/FeaturedBtns';

const FeaturedProduct = () => {
  // const res = await fetch(`${process.env.API_URL}/api/product`, {
  //   method: 'GET',
  //   next: { revalidate: 10 },
  // });
  // const data: MongooseProductPopulated = await res.json();
  // console.log(data);
  // const imgUrls = data.images?.map((img) => img.source);

  const [product, setProduct] = useState<MongooseProductPopulated | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      const res = await API.getFirstProduct();
      setProduct(res.data);
    };
    getProduct();
  }, []);
  const imgUrls = product?.images?.map((img) => img.source);
  return (
    <div className={s.featured}>
      <div className={s.featured_container}>
        <div className={s.featured_info}>
          <h2 className={s.featured_info_title}>{product?.name}</h2>
          <p className={s.featured_info_desc}>{product?.desc}</p>

          <FeaturedBtns productId={product?._id || ''} />
        </div>
        <div className={s.featured_imgWrapper}>{imgUrls && <ImgSlider urls={imgUrls} />}</div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
