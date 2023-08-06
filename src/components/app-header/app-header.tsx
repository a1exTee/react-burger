import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';
import { Link, NavLink, useMatch } from 'react-router-dom';
import { setMenuClass, setIconType } from '../../utils/data';

const AppHeader = () => {

    const rootLink = useMatch('/');
    const ordersLink = useMatch('/orders-feed');
    const profileLink = useMatch('/profile/*');
    const registerLink = useMatch('/register');
    const loginLink = useMatch('/login');
    const forgotPassLink = useMatch('/forgot-password');
    const resetPassLink = useMatch('/reset-password');

      return <header className={style.appHeader}>
                <nav className={style.appHeaderNav}>
                    <NavLink to='/' className={style.appHeaderItem}>
                        <span className={`mr-4`}>
                            <BurgerIcon type={setIconType('primary', !!rootLink)} />
                        </span>
                        <span className={`${setMenuClass('text', !!rootLink)}`}>Конструктор</span>
                    </NavLink>
                    <NavLink to='/feed' className={style.appHeaderItem}>
                        <span className={`mr-4`}>
                            <ListIcon type={setIconType('primary', !!ordersLink)}  />
                        </span>
                        <span className={`${setMenuClass('text', !!ordersLink)}`}>Лента заказов</span>
                    </NavLink>
                </nav>
                <Link className='logo' to='/'><Logo /></Link>
                <NavLink to='/profile' className={style.appHeaderItem}>
                    <span className={`mr-4`}>
                        <ProfileIcon type={setIconType('primary', !!profileLink || !!registerLink || !!loginLink || !!forgotPassLink || !!resetPassLink)} />
                    </span>
                    <span className={`${setMenuClass('text', !!profileLink || !!registerLink || !!loginLink || !!forgotPassLink || !!resetPassLink)}`}>Личный кабинет</span>
                </NavLink>
            </header>;
} 

export default AppHeader;