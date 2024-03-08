import React from 'react';
import s from './CartPage.module.scss';
import CartItems from './CartItems/CartItems';
import CartForm from './CartForm/CartForm';
import CartFormMobile from './CartFormMobile/CartFormMobile';

const CartPage = () => {
  return (
    <div className={s.cart}>
      <CartFormMobile />
      <CartItems />
      <div className={s.cart_formWrapper}>
        <CartForm />
      </div>
    </div>
  );
};

export default CartPage;
