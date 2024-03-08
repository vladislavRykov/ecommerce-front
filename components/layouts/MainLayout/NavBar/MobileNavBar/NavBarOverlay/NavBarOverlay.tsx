'use client';
import Button from '@/components/UI/Button/Button';
import { delay } from '@/utils/delay';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { BsShop } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import s from './NavBarOverlay.module.scss';
import cn from 'classnames';
import { checkIsLinkActive } from '@/utils/checkIsLinkActive';
import { useAppSelector } from '@/hooks/reduxHooks';

interface NavBarOverlayProps {
  navLinks: {
    title: string;
    href: string;
  }[];
  closeNav: () => void;
}

const NavBarOverlay: React.FC<NavBarOverlayProps> = ({ navLinks, closeNav }) => {
  const cartCount = useAppSelector((state) => state.cartReducer.cart.length);
  const pathname = usePathname();
  const activeLink = 'bg-white text-blue-900';
  const [animate, setAnimate] = useState(false);
  const mountedStyles = 'opacity-100';
  useEffect(() => {
    setAnimate(true);
  }, []);
  const closeNavF = async () => {
    setAnimate(false);
    await delay(300);
    closeNav();
  };
  return (
    <div className={cn(s.navOverlay, { [s.navOverlay_mountedStyles]: animate })}>
      <div
        //   className="h-12 p-3"
        className={s.navOverlay_burger}>
        <Button onClick={closeNavF}>
          <RxHamburgerMenu size={26} />
        </Button>
      </div>

      <div className={s.navOverlay_container}>
        <a href="/" className={s.navOverlay_ecommerce}>
          <BsShop size={25} />
          <span>Ecommerce</span>
        </a>
        <nav className={s.navOverlay_navLinks}>
          {navLinks.map((item) => (
            <Link
              onClick={closeNavF}
              key={item.href}
              href={item.href}
              className={cn(s.navOverlay_link, {
                [s.navOverlay_link_activeLink]: checkIsLinkActive(pathname, item.href),
              })}>
              <span>
                {cartCount > 0 && item.title === 'Корзина'
                  ? `${item.title} (${cartCount})`
                  : item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBarOverlay;
