'use client';
import React, { useEffect, useState } from 'react';
import ImgSlider from '../HomePage/FeaturedProduct/ImgSlider/ImgSlider';
import { MongooseProductPopulated } from '@/types/types';
import s from './ProductPage.module.scss';
import AddToCartBtn from './AddToCartBtn/AddToCartBtn';
import API from '@/services/api/api';

interface ParamsProps {
  params: any;
  searchParams: any;
}

const ProductPage = (props: ParamsProps) => {
  // const res = await fetch(`${process.env.API_URL}/api/product?id=${props.params.id}`, {
  //   method: 'GET',
  //   next: { revalidate: 20 },
  // });
  // const data: MongooseProductPopulated = await res.json();
  // console.log(data.properties);
  // const imgUrls = data.images?.map((img) => img.source);
  const [product, setProduct] = useState<MongooseProductPopulated | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      const res = await API.getProductById(props.params.id);
      setProduct(res.data);
    };
    getProduct();
  }, []);
  const imgUrls = product?.images?.map((img) => img.source);
  return (
    <div className={s.product}>
      <div className={s.product_container}>
        <div className={s.product_imgWrapper}>
          <ImgSlider urls={imgUrls} />
        </div>
        <div className={s.product_info}>
          <h2 className={s.product_title}>{product?.name}</h2>
          <p className={s.product_desc}>{product?.desc}</p>
          <div className={s.product_flex}>
            <span className={s.product_price}>{product?.price} $</span>
            <AddToCartBtn productId={props.params.id} />
          </div>
          {product?.category && (
            <div title="Категория" className={s.product_cat}>
              {product.category?.name}
            </div>
          )}
          {product?.properties && (
            <ul title="Свойства продукта" className={s.product_props}>
              {Object.keys(product.properties).map((key) => (
                <li
                  key={key}
                  className={s.product_prop}>{`${key}: ${product.properties?.[key]}`}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
