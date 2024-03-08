'use client';
import ImgSlider from '@/components/HomePage/FeaturedProduct/ImgSlider/ImgSlider';
import { MongooseProductPopulated } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import s from './ProductItem.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addToCart } from '@/redux/slices/CartSlice';
import { saveProductInLS } from '@/utils/localStorageProductFuntions';
import { BsCart2 } from 'react-icons/bs';

interface ProductItemProps {
  product: MongooseProductPopulated;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const imgUrls = product.images?.map((img) => img.source);
  const dispatch = useAppDispatch();
  const amountOfProductInCart = useAppSelector(
    (state) => state.cartReducer.cart.filter((id) => id === product._id).length,
  );
  const onAddToCart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(addToCart(product._id));
    saveProductInLS(product._id);
  };
  return (
    <div className={s.product}>
      <div className={s.product_slider}>
        <ImgSlider urls={imgUrls} />
      </div>
      <div className={s.product_bottom}>
        <div className={s.product_info}>
          <span className={s.product_name}>{product.name}</span>
          <span className={s.product_price}>{product.price} $</span>
        </div>
        <div className={s.product_btns}>
          <Link
            href={`/products/${product._id}`}
            className={s.product_btn + ' ' + s.product_btn_more}>
            Узнать больше
          </Link>
          <button onClick={onAddToCart} className={s.product_btn + ' ' + s.product_btn_addToCart}>
            <BsCart2 size={18} />
            Добавить в корзину
            {amountOfProductInCart > 0 && (
              <div className={s.product_count}>{amountOfProductInCart}</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
