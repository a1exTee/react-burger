import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/crater-loaf.png';
import ProductsData from '../utils/data';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../components/utils/prop-types';
import Modal from '../modal/modal';
import { useState, setState, useEffect } from 'react';
import OrderDetails from './order-details/order-details';


const BurgerConstructor = ({ingredientsData}) => {

    const [order, setOrder] = useState(null);
    const closeOrderModal = () => setOrder(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        let total = 0;
        const priceOfBuns = 2510;
        ingredientsData.map((item) => {
            if (item.type !== "bun") {
                total += item.price;
            }
        });
        setAmount(priceOfBuns + total);
    }, [ingredientsData, setAmount]);
   
    return (
        <>
        {ingredientsData.length !== 0 &&
        <div className={burgerConstructorStyle.burgerConstructorCol}>
            <div className={`${burgerConstructorStyle.burgerConstructorContent}`}>
                <div className={`${burgerConstructorStyle.burgerConstructorList}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />

                    <div className={`${burgerConstructorStyle.burgerConstructorData} custom-scroll`}>
                        {ingredientsData.map((ingredient) => {
                            if (ingredient.type !== "bun") {
                                return (
                                    <div key={ingredient._id} className={`${burgerConstructorStyle.ingredient} mt-4 mr-4`}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>

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
            <div className={`${burgerConstructorStyle.result}`}>
                <div className={`${burgerConstructorStyle.resultContent}`}><span className={burgerConstructorStyle.total}>610</span><CurrencyIcon type="primary" /></div>
                <Button htmlType={'button'} onClick={setOrder}>Оформить заказ</Button>
            </div>
            {order && (
                <Modal closeModal={closeOrderModal}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
        }
        </>
    )
}



BurgerConstructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
  };

export default BurgerConstructor;