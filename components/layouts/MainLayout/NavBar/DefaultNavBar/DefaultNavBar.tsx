'use client';
import { useAppSelector } from '@/hooks/reduxHooks';
import { checkIsLinkActive } from '@/utils/checkIsLinkActive';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import s from './DefaultNavBar.module.scss';
import cn from 'classnames';

interface DefaultNavBarProps {
  navLinks: {
    title: string;
    href: string;
  }[];
}

const DefaultNavBar: React.FC<DefaultNavBarProps> = ({ navLinks }) => {
  const cartCount = useAppSelector((state) => state.cartReducer.cart.length);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className={s.wrapper}>
      <Link className={s.logo} href={'/'}>
        Ecommerce
      </Link>
      <nav className={s.nav}>
        {navLinks.map(({ href, title }) => (
          <Link
            key={href}
            className={cn(s.nav_link, {
              [s.nav_link_active]: checkIsLinkActive(pathname, href),
            })}
            href={href}>
            {title}
            {cartCount > 0 && title === 'Корзина' ? ` (${cartCount})` : ''}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DefaultNavBar;
