'use client';
import React, { useEffect, useState } from 'react';
import s from './CartItems.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import CartItem from './CartItem/CartItem';
import API from '@/services/api/api';
import { MongooseProductPopulated } from '@/types/types';
import { FaShoppingCart } from 'react-icons/fa';

const CartItems = () => {
  const cartItemsidx = useAppSelector((state) => state.cartReducer.cart);
  const [cartItems, setCartItems] = useState<MongooseProductPopulated[]>([]);
  useEffect(() => {
    const getCartInfo = async () => {
      const { data } = await API.getProductsByIds(cartItemsidx);
      setCartItems(data);
    };
    getCartInfo();
  }, [cartItemsidx]);
  return (
    <div className={s.wrapper}>
      <div className={s.cartItems}>
        {cartItems.map((item, idx) => {
          const productInCartCount = cartItemsidx.filter((id) => id === item._id).length;

          return <CartItem key={item._id} item={item} idx={idx} count={productInCartCount} />;
        })}
        {cartItems.length === 0 && <div className={s.cartItem_emptyCart}>Корзина пуста</div>}
        <FaShoppingCart size={20} className={s.cartItems_icon} />
      </div>
    </div>
  );
};

export default CartItems;
