'use client';
import React from 'react';
import s from './CartItem.module.scss';
import cn from 'classnames';
import { MongooseProductPopulated } from '@/types/types';
import Image from 'next/image';
import ResponsitiveImg from '@/components/UI/ResponsitiveImg/ResponsitiveImg';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addToCart, removeFromCart, totalRemoveFromCart } from '@/redux/slices/CartSlice';
import Button from '@/components/UI/Button/Button';
import {
  deleteProductFromLS,
  deleteWholeProductFromLS,
  saveProductInLS,
} from '@/utils/localStorageProductFuntions';

interface CartItemProps {
  item: MongooseProductPopulated;
  idx: number;
  count: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, idx, count }) => {
  const isEven = idx % 2 !== 1;
  const dispatch = useAppDispatch();
  const removeProductFromCart = () => {
    dispatch(totalRemoveFromCart(item._id));
    deleteWholeProductFromLS(item._id);
  };
  const increaseProductCount = () => {
    dispatch(addToCart(item._id));
    saveProductInLS(item._id);
  };
  const deincreaseProductCount = () => {
    dispatch(removeFromCart(item._id));
    deleteProductFromLS(item._id);
  };
  console.log(idx);
  return (
    <div className={s.cartItem}>
      <ResponsitiveImg
        blurDataURL="/loader1.gif"
        placeholder="blur"
        src={item.images?.[0]?.source || '/mock2.jpg'}
        height={1000}
        width={1000}
        alt="product image"
      />
      <div className={s.cartItem_info}>
        <span className={s.cartItem_name}>{item.name}</span>
        <span className={s.cartItem_price}>{item.price * count} $</span>
      </div>
      {count > 0 && (
        <div className={s.cartItem_count}>
          <Button onClick={deincreaseProductCount} className={s.cartItem_countBtn}>
            <FiMinus />
          </Button>
          <span className={s.cartItem_number}>{'x' + count}</span>
          <Button onClick={increaseProductCount} className={s.cartItem_countBtn}>
            <FiPlus />
          </Button>
        </div>
      )}
      <div className={s.cartItem_buttons}>
        <Link href={`/products/${item._id}`} className={s.cartItem_more + ' ' + s.cartItem_btn}>
          О товаре
        </Link>
        <button
          onClick={removeProductFromCart}
          className={s.cartItem_delete + ' ' + s.cartItem_btn}>
          Убрать из корзины
        </button>
      </div>
    </div>
  );
};

export default CartItem;
