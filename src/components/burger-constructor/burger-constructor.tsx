import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from '../modal/modal';
import {useMemo, FC} from 'react';
import OrderDetails from './order-details/order-details';
import { useDrop } from "react-dnd";
import { addOrderItems, deleteOrderInfo } from '../../services/actions/order/order';
import { sentOrderInformation } from '../../services/actions/order/order';
import { v4 as uuidv4 } from "uuid";
import {toggleModalOrder} from '../../services/actions/modal/modal';
import BurgerConstructorItem from '../burger-constructor/burger-constructor-item';
import { getCookie } from "../../utils/data";
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/prop-types';
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';
import { addIngredientInConstructor, addBunsInConstructor, deleteAllIngredients } from '../../services/actions/burger-constructor/burger-constructor';


const BurgerConstructor: FC = () => {

  const dispatch = useAppDispatch();
  const ingredientInModal = useAppSelector(store =>  store.modalReducer.isModalOrder);
  const ingredients = useAppSelector(store => store.burgerConstructorReducer.ingredientsConstructor);
  const bunConstructor = useAppSelector(store => store.burgerConstructorReducer.bun);
  const navigate = useNavigate();
   
  const isAuthorized = useAppSelector((store) => store.userInfoReducer); 

  const dropHandler = (ingredient: TIngredient) => {
    ingredient.id = uuidv4();
    ingredient.type === 'bun' 
      ?
      dispatch(addBunsInConstructor(ingredient))
      :
      dispatch(addIngredientInConstructor({ ...ingredient, id: uuidv4() }));
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredientDND',
    drop: (ingredient: TIngredient) => {
      dropHandler(JSON.parse(JSON.stringify(ingredient)))
    },
  });

  const createOrder = () => {
    if (getCookie('accessToken') && isAuthorized && bunConstructor) {
      const ingredientsId = ingredients?.map((ingredient: TIngredient) => ingredient._id).concat(bunConstructor._id);
      dispatch(addOrderItems(ingredientsId));
      dispatch(sentOrderInformation(ingredientsId));
      dispatch(toggleModalOrder(true));
    } else {
      navigate('/login')
    }
  }

  const closeModal = () => {
    dispatch(deleteOrderInfo());
    dispatch(toggleModalOrder(false));
  }

  const orderTotalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce((prev: number, ingr: TIngredient) => {
      return prev + ingr.price;
    }, 0);
    return ingredientsPrice + (bunConstructor ? bunConstructor.price * 2 : 0);
  }, [bunConstructor, ingredients]);
  


     return (
      <div className={`${burgerConstructorStyle.burgerConstructorCol} custom-scroll`}>
        <ul ref={dropTarget} data-test="drop-container">
          {!bunConstructor
            ? 
            <div>
              <p>Перетащите булку</p>
            </div>
            :
            <li className={`${burgerConstructorStyle.ingredient} pl-8 pr-4`} data-test={`bun-top`}>
              <ConstructorElement
                text={`${bunConstructor!.name} (верх)`}
                thumbnail={bunConstructor!.image_mobile}
                price={bunConstructor!.price}
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
              <BurgerConstructorItem key={ingredient.id} ingredient={ingredient} index={index} id={ingredient.id} />
            )
          )}
          </ul>
          {!bunConstructor
            ? 
            <div>
              <p>Перетащите булку</p>
            </div>
            :               
            <li key={bunConstructor!.id} className={`${burgerConstructorStyle.element} pl-8 pr-4`} data-test={`bun-bottom`}>
              <ConstructorElement
                text={`${bunConstructor!.name} (низ)`}
                thumbnail={bunConstructor!.image_mobile}
                price={bunConstructor!.price}
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
            disabled={!bunConstructor}
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