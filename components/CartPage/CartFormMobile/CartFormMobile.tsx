'use client';

import React, { useState } from 'react';
import CartForm from '../CartForm/CartForm';
import s from './CartFormMobile.module.scss';
import CartFormModal from '../CartFormModal/CartFormModal';

const CartFormMobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={s.cartFormMobile}>
      <button className={s.cartFormMobile_btn} onClick={() => setIsModalOpen(true)}>
        Заполнить данные для оплаты
      </button>
      {isModalOpen && <CartFormModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CartFormMobile;
