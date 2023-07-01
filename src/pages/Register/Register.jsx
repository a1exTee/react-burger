import React from 'react';
import registerStyles from './Register.module.css';
import { registerProfile } from '../../services/actions/auth/auth';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Form } from '../../components/form/Form';

export function Register() {
  const {values, handleChange } = useForm({ email: '', password: '', name: '' });
  const location = useLocation();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerProfile(values));
  };

  // userBurger
  // userBurger@yandex.ru
  // qwerty

  const registerSuccess = useSelector((store) => store.registerSuccess);
  const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

  if (registerSuccess) {
    return <Navigate to='/login' />
  };

  return (
    <div className={registerStyles.container}>
      {isAuthorized
        ? (<Navigate to={location?.state?.from || '/'} />)
        : (
          <>
            <Form
              title={'Регистрация'}
              buttonText={'Зарегистрироваться'}
              onSubmit={onSubmit}
            >
              <Input name='name' type='text' placeholder='Имя' value={values.name} onChange={handleChange} />
              <Input name='email' type='email' placeholder='E-mail' value={values.email} onChange={handleChange} />
              <PasswordInput name='password' placeholder='Пароль' value={values.password} onChange={handleChange} />
            </Form>
            <div className={`text text_type_main-default ${registerStyles.tips}`}>
              <p className={registerStyles.tip}>Уже зарегистрированы? <Link className={registerStyles.link} to='/login'>Войти</Link></p>
            </div>
          </>
        )
      }
    </div>
  )
}
