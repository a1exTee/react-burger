import React, { useMemo } from 'react';
import profileStyles from './Profile.module.css';
import { logout, patchUser } from '../../services/actions/auth/auth';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuClass } from '../../utils/data';
import { useForm } from '../../components/form/Form';

export function Profile() {
  const {isAuthorized, user, logoutRequest} = useSelector((store) => store.authReducer);
  const {values, setValues, handleChange } = useForm({ name: user.name, email: user.email, password: '' });

  const isProfileChanged = useMemo(() => user.email !== values.email
    || user.name !== values.name, [user, values]
  );

  const buttonClass = useMemo(() =>
    isProfileChanged ? '' : profileStyles.hidden, [isProfileChanged]
  );

  const profileLink = useMatch('/profile');
  const ordersLink = useMatch('/profile/orders');
  const dispatch = useDispatch();

  function saveChanges(e) {
    e.preventDefault();
    dispatch(patchUser(values))
  };

  function resetChanges() {
    setValues({
      ...values,
      name: user?.name ? user.name : '',
      email: user?.email ? user.email : ''
    })
  };

  function onLogout() {
    dispatch(logout());
  };

  if (logoutRequest) {
    return (
      <h3 className={`text text_type_main-large mt-10`}>
        Загрузка...
      </h3>
    )
  };

  if (!isAuthorized) {
    return <Navigate to='/login' />
  };

  return (
    <>
      {isAuthorized ? (
        <div className={profileStyles.container}>
          <div className={profileStyles.menu}>
            <ul className={`text text_type_main-medium ${profileStyles.links}`}>
              <li className={`text_color_inactive ${profileStyles.link}`}>
                <Link to='/profile' className={setMenuClass('text', profileLink)}>Профиль</Link>
              </li>
              <li className={`text_color_inactive ${profileStyles.link}`}>
                <Link to='/profile/orders' className={setMenuClass('text', ordersLink)}>История заказов</Link>
              </li>
              <li className={`text_color_inactive ${profileStyles.link}`}><span onClick={onLogout}>Выход</span></li>
            </ul>
            <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете
              изменить свои персональные данные
            </p>
          </div>
          <div className={profileStyles.auth_fields}>
            <Input name='name' placeholder='Имя' value={values.name} onChange={handleChange} />
            <Input name='email' placeholder='Логин' value={values.email} onChange={handleChange} />
            <PasswordInput name='password' value={values.password} onChange={handleChange} />
            <div className={`${profileStyles.buttons} ${buttonClass}`}>
              <span onClick={resetChanges}
                className={`text text_type_main-small ${profileStyles.link}`}>Отмена</span>
              <Button htmlType='submit' size='medium' type='primary' onClick={saveChanges}>Сохранить</Button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  )
}
