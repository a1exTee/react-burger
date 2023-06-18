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
import {ADD_BUN_IN_CONSTRUCTOR, ADD_IN_CONSTRUCTOR, DEL_IN_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../services/actions/burger-constructor/burger-constructor";
import { sendOrder } from "../../services/actions/order/order";
import { v4 as uuidv4 } from "uuid";




const BurgerConstructorItem = ({index, ingredient}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const id = ingredient.id

  const [{isDragging}, drag] = useDrag({
    type: 'ingredient',
    item: {id, index},
    collect: (monitor) =>  {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(ingredients) {
      if (!ref.current) {return}
      const dragIndex = ingredients.index
      const hoverIndex = index
      dispatch({
        type: REPLACE_INGREDIENT,
        item: {dragIndex, hoverIndex}
      })
      ingredients.index = hoverIndex
    }
  })
  
  const deleteIngredient = (itemId) => {
    dispatch({
      type: DEL_IN_CONSTRUCTOR,
      id: itemId,
    })
  } 

  drag(drop(ref))

  return (
    <li ref={ref} key={ingredient.id} className={`${burgerConstructorStyle.element} ${isDragging ? burgerConstructorStyle.opacity : ''} pl-4 pr-4`}>
        <div className={burgerConstructorStyle.drag_icon}>
          <DragIcon />
        </div>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          isLocked={false}
          handleClose={(() => deleteIngredient(id))}
        />
    </li>
  )
};

BurgerConstructorItem.propTypes = {
  index: PropTypes.number, 
  ingredient: PropTypes.object.isRequired,
}

export default BurgerConstructorItem;