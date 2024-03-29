import React, {useEffect, useState } from 'react';
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-info.module.css'
import { FC } from 'react';
import { useForm } from '../../hooks/useForm';
import { updateUserData } from '../../services/actions/auth/auth';
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';

const ProfileInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { email, name } = useAppSelector((store) => store.userInfoReducer.user);
  const [disabled, setDisabled] = useState(true);
  const {values, handleChange, setValues} = useForm(
    {
      email: "",
      password: "",
      name: ""
    }); 

  useEffect(() => {
    setValues({ ...values, name: name, email: email });
    }, [email, name]);

  const submitChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData(values))
  }

  const cancelChanges = () => {
    setValues({
      email: email,
      password: "",
      name: name
    })
  }

  return (
    <>{
      values &&
      <form onSubmit={submitChanges} className={`${styles.form} mt-30`}>
      <Input id='form1' placeholder="Имя" value={values.name} name={'name'} onChange={handleChange} icon="EditIcon" disabled={disabled} onIconClick={() => setDisabled(false)} />
      <EmailInput placeholder="Логин" value={values.email} name={'email'} onChange={handleChange} isIcon={true} />
      <PasswordInput placeholder="Пароль" value={values.password} name={'password'} onChange={handleChange} icon="EditIcon" />
      <div className={styles.buttons}>
        <Button htmlType="button" type="secondary" size="medium" onClick={cancelChanges}>Отменить</Button>
        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
      </div>
    </form>
    }</>

  );
}

export default ProfileInfo;