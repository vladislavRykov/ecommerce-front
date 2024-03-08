'use client';
import React, { useEffect, useState } from 'react';
import CartForm from '../CartForm/CartForm';
import s from './CartFormModal.module.scss';
import { delay } from '@/utils/delay';
import cn from 'classnames';

interface CartFormModalProps {
  closeModal: () => void;
}

const CartFormModal: React.FC<CartFormModalProps> = ({ closeModal }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);
  const onModalClose = async () => {
    setAnimate(false);
    await delay(300);
    closeModal();
  };
  return (
    <div
      onClick={onModalClose}
      className={cn(s.cartFormModal, { [s.cartFormModal_open]: animate })}>
      <div onClick={(e) => e.stopPropagation()}>
        <CartForm onSuccess={closeModal} />
      </div>
    </div>
  );
};

export default CartFormModal;
