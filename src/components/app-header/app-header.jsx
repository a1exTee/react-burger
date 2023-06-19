import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

const AppHeader = () => {

      return <header className={style.appHeader}>
                <nav className={style.appHeaderNav}>
                    <div className={style.appHeaderItem}>
                        <span className={`mr-4`}>
                            <BurgerIcon type="primary" />
                        </span>
                        <span>Конструктор</span>
                    </div>
                    <div className={style.appHeaderItem}>
                    <span className={`mr-4`}>
                        <ListIcon type="primary" />
                        </span>
                        <span>Лента заказов</span>
                    </div>
                </nav>
                <div className='logo'><Logo /></div>
                <div className={style.appHeaderItem}>
                <span className={`mr-4`}>
                    <ProfileIcon type="primary" />
                    </span>
                    <span>Личный кабинет</span>
                </div>
            </header>;
} 

export default AppHeader;
