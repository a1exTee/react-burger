import { FormEvent, FC } from "react";
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import loginStyles from './Login.module.css';
import {Form} from '../../components/form/Form';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';
import { loginUser } from "../../services/actions/auth/auth";


export const Login: FC = () => {
  const userData = useAppSelector((store) => store.userInfoReducer);
  const {values, handleChange } = useForm({ email: '', password: '' });
  const location = useLocation();
  const dispatch = useAppDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(values))
  };

  return (
    <div className={loginStyles.container}>
        <Form title={'Вход'} buttonText={'Войти'} onSubmit={onSubmit}>
          <Input type='email' name='email' placeholder='E-mail' value={values.email || ''} onChange={handleChange} />
          <PasswordInput name='password' value={values.password || ''} onChange={handleChange} />
          <>{userData.loginRequestFailed && (
            <p className={`${loginStyles.error} text text_type_main-default mb-2`}>
            Неверный логин или пароль
            </p>
          )}</>
        </Form>
        <div className={`text text_type_main-default ${loginStyles.tips}`}>
          <p className={loginStyles.tip}>Вы новый пользователь? <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link></p>
          <p className={loginStyles.tip}>Забыли пароль? <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    </div>
  )
}

