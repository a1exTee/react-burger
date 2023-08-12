import resetPasswordStyles from './ResetPassword.module.css';
import { resetPassword } from '../../services/actions/auth/reset-password';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FC } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';

export const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { verificationSent } = useAppSelector((store) => store.resetPasswordReducer);
  const navigate = useNavigate();
  const {values, handleChange } = useForm({ password: '', token: '' });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(values.newPassword, values.token));
    navigate('/login')
  }

  if (!verificationSent) {
    navigate('/forgot-password')
  }

  return (
    <div className={resetPasswordStyles.container}>
      <form onSubmit={onSubmit}>
        <PasswordInput name='password' placeholder='Введите новый пароль' value={values.password || ''} onChange={handleChange} />
        <Input name='token' type='text' placeholder='Введите код из письма' value={values.token || ''} onChange={handleChange} />
        <Button htmlType='submit'>Сохранить</Button>
      </form>
      <div className={`text text_type_main-default ${resetPasswordStyles.tips}`}>
        <p>Вспомнили пароль? <Link className={resetPasswordStyles.link} to='/login'>Войти</Link></p>
      </div>
    </div>
  )
}