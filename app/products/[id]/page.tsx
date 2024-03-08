import ProductPage from '@/components/ProductPage/ProductPage';
import React from 'react';

interface ParamsProps {
  params: any;
  searchParams: any;
}

const page = (props: ParamsProps) => {
  return <ProductPage {...props} />;
};

export default page;
