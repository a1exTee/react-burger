import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/crater-loaf.png';
import ProductsData from '../utils/data';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/prop-types';
import Modal from '../modal/modal';
import { useState, setState, useEffect, useMemo, useRef } from 'react';
import OrderDetails from './order-details/order-details';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {DND_CONSTRUCTOR, ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, TOTAL_PRICE} from "../services/actions/burger-constructor/burger-constructor";
import { sendOrder } from "../services/actions/order/order";
import { v4 as uuidv4 } from "uuid";




const BurgerConstructorItem = ({ data, id, delItem, type, isLocked }) => {
    const [, dragRef] = useDrag({
      type: "item-drag",
      item: { id },
    });
  
    const ingredientsConstructor = useSelector(
      (store) => store.burgerConstructor.ingredientsConstructor
    );
    const dispatch = useDispatch();
  
    const [, dropRef] = useDrop({
      accept: "item-drag",
      drop(id) {
        if (id.id != ref.current.id) {
          dispatch({
            type: DND_CONSTRUCTOR,
            indexDrop: ref.current.id,
            valueDrag: ingredientsConstructor.find((item, index) => index == id.id),
            indexDrag: id.id,
            valueDrop: ingredientsConstructor.find((item, index) => index == ref.current.id),
          });
        }
      },
    });
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));
    if (type) {
      return (
        <li id={id}>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            handleClose={delItem}
          />
        </li>
      );
    } else {
      return (
        <li ref={ref} id={id}>
          <DragIcon type="primary" />
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            handleClose={delItem}
          />
        </li>
      );
    }
};

export default BurgerConstructorItem;