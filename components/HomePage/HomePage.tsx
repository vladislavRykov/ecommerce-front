import React from 'react';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import s from './HomePage.module.scss';
import LatestProducts from './LatestProducts/LatestProducts';

const HomePage = () => {
  return (
    <div className={s.home}>
      <FeaturedProduct />
      <LatestProducts />
    </div>
  );
};

export default HomePage;
