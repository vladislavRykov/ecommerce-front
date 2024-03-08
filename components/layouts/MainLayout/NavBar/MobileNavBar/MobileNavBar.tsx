import React, { useEffect, useState } from 'react';
import s from './MobileNavBar.module.scss';
import { RxHamburgerMenu } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { BsShop } from 'react-icons/bs';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import Button from '@/components/UI/Button/Button';
import NavBarOverlay from './NavBarOverlay/NavBarOverlay';

interface MobileNavBarProps {
  navLinks: {
    title: string;
    href: string;
  }[];
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ navLinks }) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (isNavBarOpen) {
    }
  }, [isNavBarOpen]);
  return (
    <div className={s.wrapper}>
      <Link className={s.logo} href={'/'}>
        Ecommerce
      </Link>
      <div className={s.navBtn}>
        <Button onClick={() => setIsNavBarOpen(true)}>
          <RxHamburgerMenu size={26} />
        </Button>
      </div>
      {isNavBarOpen && (
        <NavBarOverlay navLinks={navLinks} closeNav={() => setIsNavBarOpen(false)} />
      )}
    </div>
  );
};

export default MobileNavBar;
