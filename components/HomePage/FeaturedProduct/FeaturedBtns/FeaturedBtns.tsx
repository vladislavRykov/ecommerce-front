'use client';
import Link from 'next/link';
import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import s from './FeaturedBtns.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addToCart } from '@/redux/slices/CartSlice';
import { IoIosCheckmark } from 'react-icons/io';
import { saveProductInLS } from '@/utils/localStorageProductFuntions';

const FeaturedBtns = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();
  const [productCount, cart] = useAppSelector((state) => [
    state.cartReducer.cart.filter((id) => id === productId).length,
    state.cartReducer.cart,
  ]);

  console.log(productCount, cart, productId);
  const onAddToCart = () => {
    dispatch(addToCart(productId));
    saveProductInLS(productId);
  };
  return (
    <div className={s.featuredBtns}>
      <Link
        href={`/products/${productId}`}
        className={s.featuredBtns_btn + ' ' + s.featuredBtns_btn_more}>
        Узнать больше
      </Link>
      <button onClick={onAddToCart} className={s.featuredBtns_btn + ' ' + s.featuredBtns_btn_cart}>
        {productCount > 0 ? (
          <>
            <IoIosCheckmark size={18} />В корзине: {productCount}
          </>
        ) : (
          <>
            <BsCart2 size={18} />
            Добавить в корзину
          </>
        )}
      </button>
    </div>
  );
};

export default FeaturedBtns;
