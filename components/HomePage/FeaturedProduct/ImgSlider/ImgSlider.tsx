'use client';
import React, { useState } from 'react';
import s from './ImgSlider.module.scss';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import cn from 'classnames';
import Button from '@/components/UI/Button/Button';
import ImgDots from './ImgDots/ImgDots';
import ResponsitiveImg from '@/components/UI/ResponsitiveImg/ResponsitiveImg';

interface ImgSliderProps {
  urls: string[] | undefined;
}

const ImgSlider: React.FC<ImgSliderProps> = ({ urls }) => {
  const isImgExist = urls && urls.length > 0;
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const nextImg: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!isImgExist) return;
    if (urls.length === currentImgIdx + 1) setCurrentImgIdx(0);
    else {
      setCurrentImgIdx((prev) => prev + 1);
    }
  };
  const prevImg: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!isImgExist) return;
    if (currentImgIdx === 0) setCurrentImgIdx(urls.length - 1);
    else {
      setCurrentImgIdx((prev) => prev - 1);
    }
  };
  return (
    <div className={s.slider}>
      {/* <Image
        blurDataURL="/loader1.gif"
        placeholder="blur"
        className={s.slider_img}
        height={500}
        width={500}
        src={urls[currentImgIdx]}
        // src='/loader1.gif'
        alt="featured image"
      /> */}
      <ResponsitiveImg
        blurDataURL="/loader1.gif"
        placeholder="blur"
        className={s.slider_img}
        height={500}
        width={500}
        src={isImgExist ? urls[currentImgIdx] : '/mock2.jpg'}
        // src='/loader1.gif'
        alt="featured image"
      />
      {isImgExist && (
        <>
          <Button onClick={prevImg} className={cn(s.slider_arrows, s.slider_arrows_left)}>
            <IoIosArrowBack size={20} />
          </Button>
          <Button onClick={nextImg} className={cn(s.slider_arrows, s.slider_arrows_right)}>
            <IoIosArrowForward size={20} />
          </Button>

          <ImgDots urls={urls} currentImgIdx={currentImgIdx} setCurrentImgIdx={setCurrentImgIdx} />
        </>
      )}
    </div>
  );
};

export default ImgSlider;
