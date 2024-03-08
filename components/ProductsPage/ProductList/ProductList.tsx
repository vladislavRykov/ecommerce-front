import { MongooseProductPopulated } from '@/types/types';
import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import s from './ProductList.module.scss';

interface ProductListProps {
  list: MongooseProductPopulated[];
}

const ProductList: React.FC<ProductListProps> = ({ list }) => {
  return (
    <div className={s.list}>
      {list.map((product) => (
        <ProductItem product={product} />
      ))}
    </div>
  );
};

export default ProductList;
