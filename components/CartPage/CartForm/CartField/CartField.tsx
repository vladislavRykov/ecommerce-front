import React, { ClassAttributes, InputHTMLAttributes } from 'react';
import { Field, FieldAttributes, FieldHookConfig, useField } from 'formik';
import s from './CartField.module.scss';

interface CartFieldProps {
  isLoading?: boolean;
}

const CartField: React.FC<CartFieldProps & FieldAttributes<any>> = ({
  isLoading = false,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className={s.field + ' ' + className}>
      <Field {...field} {...props} className={s.field_input} />
      <div className={s.field_error}>{meta.touched && meta.error && meta.error}</div>
    </div>
  );
};
export default CartField;
