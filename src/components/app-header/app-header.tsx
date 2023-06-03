import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { JSX } from 'react/jsx-runtime';

const AppHeader = (props: any) => {

      return <header className="app-header">
                <nav style={{ display: 'flex' }}>
                    <div className="app-header__item">
                        <BurgerIcon type="primary" />
                        <span>Конструктор</span>
                    </div>
                    <div className="app-header__item">
                        <ListIcon type="primary" />
                        <span>Лента заказов</span>
                    </div>
                </nav>
                <div className='logo'><Logo /></div>
                <div className="app-header__item">
                    <ProfileIcon type="primary" />
                    <span>Личный кабинет</span>
                </div>
            </header>;
} 

export default AppHeader;