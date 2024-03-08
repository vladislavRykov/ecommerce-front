'use client';
import React from 'react';
import s from './CartForm.module.scss';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CartField from './CartField/CartField';
import API from '@/services/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { clearProductsInLS } from '@/utils/localStorageProductFuntions';
import { clearCart } from '@/redux/slices/CartSlice';
import Image from 'next/image';

const formValidationSchema = Yup.object({
  name: Yup.string().required('Обязательное поле.'),

  email: Yup.string().email('Введите корректный email').required('Обязательное поле.'),
  city: Yup.string().required('Обязательное поле.'),
  postalCode: Yup.string().required('Обязательное поле.'),
  street: Yup.string().required('Обязательное поле.'),
  country: Yup.string().required('Обязательное поле.'),
});

interface Values {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  street: string;
  country: string;
}
interface CartFormProps {
  onSuccess?: () => void;
}

const CartForm: React.FC<CartFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector((state) => state.cartReducer.cart);
  const initialValues: Values = {
    name: '',
    email: '',
    city: '',
    postalCode: '',
    street: '',
    country: '',
  };
  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    if (productsInCart.length === 0) return helpers.setStatus('Корзина пуста.');

    const res = await API.checkout({ ...values, productIds: productsInCart });
    console.log(res.data);
    dispatch(clearCart());
    clearProductsInLS();
    helpers.resetForm();
    onSuccess?.();
  };
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Информация о заказе</h2>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={formValidationSchema}>
        {(formik) => (
          <Form className={s.form}>
            <CartField name="name" placeholder="Имя" />
            <CartField name="email" placeholder="Электронная почта" />
            <div className={s.form_flex}>
              <CartField name="city" placeholder="Город" />
              <CartField name="postalCode" placeholder="Почтовый индекс" />
            </div>
            <CartField name="street" placeholder="Улица" />
            <CartField name="country" placeholder="Страна" />
            <p className={s.form_status}>{formik.status}</p>
            <button
              disabled={!formik.isValid || formik.isSubmitting || formik.status}
              className={s.form_submit}>
              {formik.isSubmitting ? (
                <Image src={'/circleTube.svg'} height={25} width={25} alt="loading" />
              ) : (
                <span>Продолжить оплату</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CartForm;
