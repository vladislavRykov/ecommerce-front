import API from '@/services/api/api';
import { MongooseProductPopulated } from '@/types/types';
import React from 'react';
import s from './FeaturedProduct.module.scss';
import Image from 'next/image';
import ImgSlider from './ImgSlider/ImgSlider';
import { BsCart2 } from 'react-icons/bs';
import Link from 'next/link';
import FeaturedBtns from './FeaturedBtns/FeaturedBtns';

const FeaturedProduct = async () => {
  // const res = await fetch(`${process.env.API_URL}/api/product`, {
  //   method: 'GET',
  //   next: { revalidate: 10 },
  // });
  // const data: MongooseProductPopulated = await res.json();
  // console.log(data);
  // const imgUrls = data.images?.map((img) => img.source);
  return (
    <div className={s.featured}>
      <div className={s.featured_container}>
        <div className={s.featured_info}>
          {/* <h2 className={s.featured_info_title}>{data.name}</h2>
          <p className={s.featured_info_desc}>{data.desc}</p> */}

          {/* <FeaturedBtns productId={data._id} /> */}
        </div>
        {/* <div className={s.featured_imgWrapper}>{imgUrls && <ImgSlider urls={imgUrls} />}</div> */}
      </div>
    </div>
  );
};

export default FeaturedProduct;
