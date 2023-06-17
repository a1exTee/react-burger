import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/crater-loaf.png';
import ProductsData from '../utils/data';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../components/utils/prop-types';
import Modal from '../modal/modal';
import { useState, setState, useEffect, useMemo, useRef } from 'react';
import OrderDetails from './order-details/order-details';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {DND_CONSTRUCTOR, ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, TOTAL_PRICE} from "../services/actions/burger-constructor/burger-constructor";
import { sendOrder } from "../services/actions/order/order";
import { v4 as uuidv4 } from "uuid";
import BurgerConstructorItem from '../burger-constructor/burger-constructor-item';



const BurgerConstructor = () => {

    const [ingredientInModal, setIngredientInModal] = useState(false);
    const closeIngredientModal = () => setIngredientInModal(null);

    const { ingredients, ingredientsConstructor, order, total, orderRequest, orderFailed } =
    useSelector((store) => ({
        ingredients: store.ingredients.ingredients,
        ingredientsConstructor: store.burgerConstructor.ingredientsConstructor,
        order: store.order.order,
        total: store.burgerConstructor.total,
        orderRequest: store.order.orderRequest,
        orderFailed: store.order.orderFailed,
    }));
   
    const dispatch = useDispatch();

    const totalPrice = useMemo(
        () => (data) => {
          const sum = data.reduce((sum, item) => sum + item.price, 0);
          console.log(sum);
          dispatch({ type: TOTAL_PRICE, value: sum });
        },
        [ingredientsConstructor]
    );

    const [, dropRef] = useDrop({
        accept: "ingredientDND",
    
        drop(item) {
          const ingredient = ingredients.find((el) => el._id === item._id);
    
          if (ingredient && ingredient.type !== "bun") {
            const uuid = uuidv4();
            dispatch({
              type: ADD_IN_CONSTRUCTOR,
              value: { ...ingredient, uuid: uuid },
            });
          } else {
            const uuidBunTop = uuidv4();
            const uuidBunBottom = uuidv4();
            dispatch({
              type: ADD_BUN_IN_CONSTRUCTOR,
    
              valueTop: { ...ingredient, uuid: uuidBunTop },
              valueBottom: { ...ingredient, uuid: uuidBunBottom },
            });
            totalPrice(ingredientsConstructor);
          }
       },
    });

      React.useEffect(() => {
        totalPrice(ingredientsConstructor);
      }, [ingredientsConstructor]);


      React.useEffect(() => {
        addBun(ingredients);
      }, [ingredients]);
    
      const addBun = (dataIngr) => {
        if (dataIngr.length > 0) {
          const bunTop = {
            ...dataIngr.find((item) => item.type == "bun"),
            uuid: uuidv4(),
          };
          const bunBottom = {
            ...dataIngr.find((item) => item.type == "bun"),
            uuid: uuidv4(),
          };
          dispatch({ type: ADD_IN_CONSTRUCTOR, value: bunTop });
          dispatch({ type: ADD_IN_CONSTRUCTOR, value: bunBottom });
        }
      };
    
      const toggleModal = () => {
        console.log('ingredientInModal');
        console.log(ingredientInModal);
        if (!ingredientInModal) {
          setIngredientInModal(true);
        } else {
            setIngredientInModal(false);
        }
      };
    
      const createOrder = () => {
        if (ingredientsConstructor.length > 2) {
          dispatch(sendOrder(ingredientsConstructor));
          toggleModal();
          totalPrice(ingredientsConstructor);
        }
      };
    
      const delItem = (e) => {
        dispatch({ type: DEL_IN_CONSTRUCTOR, value: e.target.closest("li").id });
        totalPrice(ingredientsConstructor);
      };
    
      const renderBun = (arr, type) => {
        if (type === "top") {
          return (
            <BurgerConstructorItem
              data={arr[0]}
              id={0}
              type={type}
              isLocked={true}
              key={arr[0].uuid}
            />
          );
        } else {
          return (
            <BurgerConstructorItem
              data={arr[1]}
              id={1}
              type={type}
              isLocked={true}
              key={arr[1].uuid}
            />
          );
        }
      };
    
      const renderConstr = (data) => {
        return data.map((element, index) => {
          if (element.type !== "bun") {
            return (
              <BurgerConstructorItem
                data={element}
                id={index}
                delItem={delItem}
                key={element.uuid}
              />
            );
          }
        });
      };

      if (ingredientsConstructor.length > 0) {
        return (
          <div ref={dropRef}>
            <ul>
              {renderBun(ingredientsConstructor, "top")}
              <ul>
                {renderConstr(ingredientsConstructor)}
              </ul>
              {renderBun(ingredientsConstructor, "bottom")}
            </ul>
    
            <div>
              <p>{total} <CurrencyIcon type="primary" /></p>
              <Button
                onClick={createOrder}
                htmlType="button"
                type="primary"
                size="medium"
              >
                Оформить заказ
              </Button>
            </div>
            {ingredientInModal && !orderRequest && !orderFailed && (
              <>
                  <Modal title={""} closeModal={closeIngredientModal}>
                    <OrderDetails />
                  </Modal>
              </>
            )}
          </div>
        );
      }
}



BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
  };
  

export default BurgerConstructor;