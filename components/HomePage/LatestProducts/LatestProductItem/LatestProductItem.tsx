'use client';
import React from 'react';
import s from './LatestProductItem.module.scss';
import { MongooseProductPopulated } from '@/types/types';
import Image from 'next/image';
import ImgSlider from '../../FeaturedProduct/ImgSlider/ImgSlider';
import ResponsitiveImg from '@/components/UI/ResponsitiveImg/ResponsitiveImg';
import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';
import { IoIosCheckmark } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addToCart } from '@/redux/slices/CartSlice';
import { saveProductInLS } from '@/utils/localStorageProductFuntions';

interface LatestProductItemProps {
  product: MongooseProductPopulated;
}

const LatestProductItem: React.FC<LatestProductItemProps> = ({ product }) => {
  const urls = product.images?.map((img) => img.source);
  const dispatch = useAppDispatch();
  const amountOfProductInCart = useAppSelector(
    (state) => state.cartReducer.cart.filter((id) => id === product._id).length,
  );
  const onAddToCart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(addToCart(product._id));
    saveProductInLS(product._id);
  };

  return (
    <Link href={`/products/${product._id}`} className={s.product}>
      <div className={s.product_img}>
        <ImgSlider urls={urls} />
      </div>

      <div className={s.product_bottom}>
        <span className={s.product_name}>{product.name}</span>
        <div className={s.product_info}>
          <span className={s.product_price}>{product.price} $</span>
          <button onClick={onAddToCart} className={s.product_addToCart}>
            {amountOfProductInCart > 0 ? (
              <span className={s.product_count}>{amountOfProductInCart}</span>
            ) : (
              <BsCart2 size={18} />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default LatestProductItem;
