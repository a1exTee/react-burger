import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import loginStyles from './Login.module.css';
import { STORE_PASSWORD, login } from '../../services/actions/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import {Form, useForm} from '../../components/form/Form';

export function Login() {
  const {values, handleChange } = useForm({ email: '', password: '' });
  const location = useLocation();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch({
      type: STORE_PASSWORD,
      password: values.password
    });
    dispatch(login(values));
  };

  const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

  return (
    <div className={loginStyles.container}>
      {isAuthorized
        ? (<Navigate to={location?.state?.from || '/'} />)
        : (
          <>
            <Form
              title={'Вход'}
              buttonText={'Войти'}
              onSubmit={onSubmit}
            >
              <Input type='email' name='email' placeholder='E-mail' value={values.email} onChange={handleChange} />
              <PasswordInput name='password' value={values.password} onChange={handleChange} />
            </Form>
            <div className={`text text_type_main-default ${loginStyles.tips}`}>
              <p className={loginStyles.tip}>Вы новый пользователь? <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
              <p className={loginStyles.tip}>Забыли пароль? <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
          </>
        )
      }
    </div>
  )
}
