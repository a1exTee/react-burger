import { FC } from "react";
import forgotPasswordStyles from './ForgotPassword.module.css';
import { restorePassword } from '../../services/actions/auth/auth';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {Form} from '../../components/form/Form';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';


export const ForgotPassword: FC = () => {
  const {values, handleChange } = useForm({ email: '' });
  const location = useLocation();
  const dispatch = useAppDispatch();

  function onSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(restorePassword(values));
  };

  
  const restoreSuccess = useAppSelector((store) => store.authReducer.restoreSuccess);
  
  const isAuthorized = useAppSelector((store) => store.authReducer.isAuthorized);

  if (restoreSuccess) {
    return <Navigate to='/reset-password' />
  };

  return (
    <div className={forgotPasswordStyles.container}>
      {isAuthorized
        ? (<Navigate to={location?.state?.from || '/'} />)
        : (
          <>
            <Form
              title={'Восстановление пароля'}
              buttonText={'Восстановить'}
              onSubmit={() => onSubmit}
            >
              <Input name='email' type='email' placeholder='Укажите e-mail' value={values.email || ''} onChange={handleChange} />
            </Form>
            <div className={`text text_type_main-default ${forgotPasswordStyles.tips}`}>
              <p className={forgotPasswordStyles.tip}>Вспомнили пароль? <Link className={forgotPasswordStyles.link} to='/login'>Войти</Link></p>
            </div>
          </>
        )
      }
    </div>
  )
}