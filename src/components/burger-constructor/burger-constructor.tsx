import React from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import {useMemo} from 'react';
import OrderDetails from './order-details/order-details';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR } from "../../services/actions/burger-constructor/burger-constructor";
import { sendOrder } from "../../services/actions/order/order";
import { v4 as uuidv4 } from "uuid";
import {toggleModalOrder} from '../../services/actions/modal/modal';
import BurgerConstructorItem from '../burger-constructor/burger-constructor-item';
import { getCookie } from "../../utils/data";
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/prop-types';
import { useAppDispatch } from '../../utils/prop-types';


const BurgerConstructor = () => {

  const dispatch = useAppDispatch();
  // @ts-ignore
  const ingredientInModal = useSelector(store =>  store.modalReducer.isModalOrder);
    // @ts-ignore
  const ingredients = useSelector(store => store.burgerConstructorReducer.ingredientsConstructor);
    // @ts-ignore
  const bunConstructor = useSelector(store => store.burgerConstructorReducer.bun);
  const navigate = useNavigate();
    // @ts-ignore
  const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

  const dropHandler = (ingredient: TIngredient) => {
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

  const [, dropTarget] = useDrop({
    accept: 'ingredientDND',
    drop: (ingredient) => {
      dropHandler(JSON.parse(JSON.stringify(ingredient)))
    },
  })
  
  const ingredientsId = ingredients?.map((ingredient: TIngredient) => ingredient?._id).concat(bunConstructor?._id)
  const createOrder = () => {
    if (getCookie('accessToken') && isAuthorized) {
      dispatch(sendOrder(ingredientsId));
      dispatch(toggleModalOrder(true));
    } else {
      navigate('/login')
    }
  }

  const closeModal = () => {
    dispatch(toggleModalOrder(false));
  }

  const orderTotalPrice = useMemo(() => {
    const ingredientsPrice = ingredients?.reduce((prev: number, ingr: TIngredient) => {
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
            ingredients.map((ingredient: TIngredient, index: number) => (
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
            <CurrencyIcon type="primary" />  
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="medium" 
            onClick={createOrder}
            disabled={!bunConstructor?.price}
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
  
export default BurgerConstructor;
