import registerStyles from './Register.module.css';
import { postNewUser } from '../../utils/data';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { FC, FormEvent } from 'react';

export const Register: FC = () => {
  const {values, handleChange } = useForm({ email: '', password: '', name: '' });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    postNewUser(values.email, values.password, values.name);
  }

  // ltcool
  // ltcool@yandex.ru
  // qwerty

  return (
    <div className={registerStyles.container}>
      <h2 className={`${registerStyles.title} text text_type_main-medium`}>Регистрация</h2>
      <form className={registerStyles.form} onSubmit={onSubmit}>
        <Input name={'name'} type='text' placeholder='Имя' value={values.name || ''} onChange={handleChange} />
        <EmailInput name={'email'} placeholder='E-mail' value={values.email || ''} onChange={handleChange} />
        <PasswordInput name={'password'} placeholder='Пароль' value={values.password || ''} onChange={handleChange} />
        <Button htmlType='submit'>Зарегестрироваться</Button>
      </form>
      <div className={`text text_type_main-default ${registerStyles.tips}`}>
        <p className={registerStyles.tip}>Уже зарегистрированы? <Link className={registerStyles.link} to='/login'>Войти</Link></p>
      </div>
    </div>
  )
}