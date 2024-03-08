import React from 'react';
import DefaultNavBar from './DefaultNavBar/DefaultNavBar';
import MobileNavBar from './MobileNavBar/MobileNavBar';

const navLinks = [
  {
    title: 'Главная',
    href: '/',
  },
  {
    title: 'Все продукты',
    href: '/products',
  },
  {
    title: 'Корзина',
    href: '/cart',
  },
];

const NavHeader = () => {
  return (
    <>
      <DefaultNavBar navLinks={navLinks} />
      <MobileNavBar navLinks={navLinks} />
    </>
  );
};

export default NavHeader;
