import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/crater-loaf.png';
import ProductsData from '../../utils/data';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import { useState, setState, useEffect, useMemo, useRef } from 'react';
import OrderDetails from './order-details/order-details';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, TOTAL_PRICE} from "../../services/actions/burger-constructor/burger-constructor";
import { sendOrder } from "../../services/actions/order/order";
import { v4 as uuidv4 } from "uuid";
import {modalDeleteIngredient} from '../../services/actions/burger-ingredients/burger-ingredients';
import {toggleModalOrder} from '../../services/actions/modal/modal';
import BurgerConstructorItem from '../burger-constructor/burger-constructor-item';



const BurgerConstructor = () => {

  const dispatch = useDispatch();
  const ingredientInModal = useSelector(store =>  store.modalReducer.isModalOrder);
  const ingredients = useSelector(store => store.burgerConstructorReducer.ingredientsConstructor);
  const bunConstructor = useSelector(store => store.burgerConstructorReducer.bun);

  const dropHandler = (ingredient) => {
    ingredient.id = uuidv4()
    ingredient.type === 'bun' 
      ?
      dispatch({
        type: ADD_BUN_IN_CONSTRUCTOR,
        bun: ingredient,
      })
      :
      dispatch({
        type: ADD_IN_CONSTRUCTOR,
        ingredientsConstructor: ingredient,
      })
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredientDND',
    drop: (ingredient) => {
      dropHandler(JSON.parse(JSON.stringify(ingredient)))
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })
  
  const ingredientsId = ingredients?.map((ingredient) => ingredient?._id).concat(bunConstructor?._id)
  const createOrder = () => {
    dispatch(sendOrder(ingredientsId));
    dispatch(toggleModalOrder(true));
  }

  const closeModal = () => {
    dispatch(toggleModalOrder(false));
  }

  const orderTotalPrice = useMemo(() => {
    const ingredientsPrice = ingredients?.reduce((prev, ingr) => {
      return prev + ingr.price;
    }, 0);
    return ingredientsPrice + (bunConstructor ? bunConstructor.price * 2 : 0)
  }, [bunConstructor, ingredients]);



     return (
      <div className={`${burgerConstructorStyle.burgerConstructorCol} custom-scroll`}>
        <ul ref={dropTarget}>
          {!bunConstructor 
            ? 
            <div>
              <p>Перетащите булку</p>
            </div>
            :
            <li className={`${burgerConstructorStyle.ingredient} pl-8 pr-4`}>
              <ConstructorElement
                text={`${bunConstructor?.name} (верх)`}
                thumbnail={bunConstructor?.image_mobile}
                price={bunConstructor?.price}
                type="top"
                isLocked={true}
              />
            </li>
          }
          <ul>
          {ingredients.length === 0
            ?
            <div>
              <p>Перетащите ингредиенты</p>
            </div>
            :
            ingredients.map((ingredient, index) => (
              <BurgerConstructorItem key={ingredient.id} ingredient={ingredient} index={index} />
            )
          )}
          </ul>
          {!bunConstructor 
            ? 
            <div>
              <p>Перетащите булку</p>
            </div>
            :               
            <li key={bunConstructor.id} className={`${burgerConstructorStyle.element} pl-8 pr-4`}>
              <ConstructorElement
                text={`${bunConstructor?.name} (низ)`}
                thumbnail={bunConstructor?.image_mobile}
                price={bunConstructor?.price}
                type="bottom"
                isLocked={true}
              />
            </li>
          }
      
        </ul>
        <div className={`${burgerConstructorStyle.orderWrap} mt-10 pr-4`}>
          <div className={`${burgerConstructorStyle.orderTotalPrice} mr-10`}>
            {orderTotalPrice &&
              <span className='mr-8'>{orderTotalPrice}</span>
            }
            <CurrencyIcon />  
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="medium" 
            onClick={createOrder}
            disabled={ingredients === 0 ? true : false}
          >
            Оформить заказ
          </Button>
        </div>
      {ingredientInModal &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>  
      }
      </div>
    )
}



BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
  bunConstructor: PropTypes.object,
  orderTotalPrice: PropTypes.number
  };
  

export default BurgerConstructor;