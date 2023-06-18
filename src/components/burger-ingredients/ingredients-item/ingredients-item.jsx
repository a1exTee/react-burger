import { Counter, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import { useDrag } from "react-dnd";
import { modalAddIngredient } from "../../../services/actions/burger-ingredients/burger-ingredients";
import { toggleModalIngredient } from "../../../services/actions/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, setState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from "prop-types";

  
const IngredientsItem = ({ ingredient }) => {
    const dispatch = useDispatch()
    const {name, price, image, _id} = ingredient;
    
    const handleIngredientClick = () => {
        dispatch(modalAddIngredient(ingredient));
        dispatch(toggleModalIngredient(true));
    }

    const bun = useSelector(store => store.burgerConstructorReducer.bun);
    const ingredients = useSelector(store => store.burgerConstructorReducer.ingredientsConstructor);
    const allIngredientsConstructor = ingredients.concat(bun, bun);

    let count = 0;

    useMemo(() => {
        allIngredientsConstructor.forEach(
        (item) => {
          if (item?._id === _id) {
              (count += 1)
          }
        }
    )
    }, [allIngredientsConstructor])

  const [{isDragging}, dragRef] = useDrag({
    type: 'ingredientDND',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return(
    <div 
      ref={dragRef} 
      className={`${style.ingredientItem} ${isDragging && style.drag}`} 
      onClick={handleIngredientClick}
    >
      <div className='pl-4 pr-4'>
        <img src={image} alt={name} />
      </div>
      <div className={`${style.ingredientPrice} mt-1 mb-1`}>
        <span className='mr-2'>
          {price}
        </span>
        <CurrencyIcon type="primary"/>
      </div>
      <h3 className={`${style.ingredientHeader} mr-2`}>
        {name}
      </h3>
      {count > 0 &&
        <Counter count={count} size="default" />}
    </div>
  )
}

IngredientsItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
}

export default IngredientsItem;
