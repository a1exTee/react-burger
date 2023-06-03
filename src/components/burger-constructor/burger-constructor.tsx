import React from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/crater-loaf.png';
import ProductsData from '../utils/data';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';


const BurgerConstructor = () => {
   
    return (
        <div className={burgerConstructorStyle.burgerConstructorCol}>
            <div className={`${burgerConstructorStyle.burgerConstructorContent} custom-scroll`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    {/*ProductsData.map((item, index) => <ConstructorElement key={index} isLocked={true} text={item.name} price={item.price} thumbnail={item.image} />)*/}
                    
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
            </div>
            <div className='result' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}><span className={burgerConstructorStyle.total}>610</span><CurrencyIcon type="primary" /></div>
                <Button htmlType={'button'}>Оформить заказ</Button>
            </div>
        </div>
    )
}


BurgerConstructor.propTypes = {
    price: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    isLocked: PropTypes.bool,
    type: PropTypes.string,
}; 

export default BurgerConstructor;