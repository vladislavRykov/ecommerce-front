import React, { ReactSVG } from 'react';
import s from './ImgDots.module.scss';
import cn from 'classnames';

interface ImgDotsProps {
  urls: string[];
  setCurrentImgIdx: React.Dispatch<React.SetStateAction<number>>;
  currentImgIdx: number;
}
const ImgDots: React.FC<ImgDotsProps> = ({ urls, currentImgIdx, setCurrentImgIdx }) => {
  const onDotClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
    e.preventDefault();
    if (idx !== currentImgIdx) setCurrentImgIdx(idx);
  };
  return (
    <div className={s.dots}>
      {urls.map((url, idx) => (
        <button
          key={url}
          // className={cn(s.dots_dot, { [s.dots_selected]: idx === currentImgIdx })}
          className={s.dots_btn}
          onClick={(e) => onDotClick(e, idx)}>
          <div className={cn(s.dots_dot, { [s.dots_selected]: idx === currentImgIdx })}></div>
        </button>
      ))}
    </div>
  );
};

export default ImgDots;
