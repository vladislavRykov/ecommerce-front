'use client';
import React, { ReactNode, useEffect } from 'react';
import NavHeader from './NavBar/NavHeader';
import s from './MainLayout.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCart } from '@/redux/slices/CartSlice';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    cartItems && dispatch(setCart(JSON.parse(cartItems)));
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <NavHeader />
      </div>
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
