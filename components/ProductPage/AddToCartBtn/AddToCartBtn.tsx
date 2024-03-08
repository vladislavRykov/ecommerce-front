'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addToCart } from '@/redux/slices/CartSlice';
import { saveProductInLS } from '@/utils/localStorageProductFuntions';
import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import s from './AddToCartBtn.module.scss';

const AddToCartBtn = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();
  const amountOfProductInCart = useAppSelector(
    (state) => state.cartReducer.cart.filter((id) => id === productId).length,
  );
  const onAddToCart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(addToCart(productId));
    saveProductInLS(productId);
  };
  return (
    <button onClick={onAddToCart} className={s.btn}>
      <BsCart2 size={18} />
      Добавить в корзину
      {amountOfProductInCart > 0 && <div className={s.count}>{amountOfProductInCart}</div>}
    </button>
  );
};

export default AddToCartBtn;
