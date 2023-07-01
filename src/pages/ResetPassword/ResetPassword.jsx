import React from 'react';
import resetPasswordStyles from './ResetPassword.module.css';
import { resetPassword } from '../../services/actions/auth/auth';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from '../../components/form/Form';

export function ResetPassword() {
  const {values, handleChange } = useForm({ password: '', token: '' });
  const location = useLocation();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(resetPassword(values));
  };

  const resetSuccess = useSelector((store) => store.resetSuccess);
  const restoreSuccess = useSelector((store) => store.restoreSuccess);
  const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

  if (resetSuccess) {
    return <Navigate to='/login' />
  };

  if (!restoreSuccess) {
    return <Navigate to='/forgot-password' />
  };

  return (
    <div className={resetPasswordStyles.container}>
      {isAuthorized
        ? (<Navigate to={location?.state?.from || '/'} />)
        : (
          <>
            <Form
              title={'Восстановление пароля'}
              buttonText={'Сохранить'}
              onSubmit={onSubmit}
            >
              <PasswordInput name='password' placeholder='Введите новый пароль' value={values.password} onChange={handleChange} />
              <Input name='token' type='text' placeholder='Введите код из письма' value={values.token} onChange={handleChange} />
            </Form>
            <div className={`text text_type_main-default ${resetPasswordStyles.tips}`}>
              <p>Вспомнили пароль? <Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
            </div>
          </>
        )
      }
    </div>
  )
}
