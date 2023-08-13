import { FC } from 'react';
import profileStyles from './Profile.module.css';
import { userLogout } from '../../services/actions/auth/auth'; 
import { NavLink, useMatch, useNavigate, Outlet } from 'react-router-dom';
import { setMenuClass } from '../../utils/data';
import { useAppDispatch } from '../../utils/prop-types';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profileLink = useMatch('/profile');
  const ordersLink = useMatch('/profile/orders');

  const logOut = () => {
    dispatch(userLogout(() => navigate('/login')));
  }
   
  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.menu}>
        <ul className={`text text_type_main-medium ${profileStyles.links}`}>
          <li className={`text_color_inactive ${profileStyles.link}`}>
            <NavLink end to="/profile" className={setMenuClass('text', !!profileLink)}>Профиль</NavLink>
          </li>
          <li className={`text_color_inactive ${profileStyles.link}`}>
            <NavLink to="/profile/orders" className={setMenuClass('text', !!ordersLink)}>История заказов</NavLink>
          </li>
          <li className={`text_color_inactive ${profileStyles.link}`}><span onClick={logOut}>Выход</span></li>
        </ul>
        <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  )
}