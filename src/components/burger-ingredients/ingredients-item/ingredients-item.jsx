import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import { useDrag } from "react-dnd";
import { modalAddIngredient } from "../../../services/actions/burger-ingredients/burger-ingredients";
import { toggleModalIngredient } from "../../../services/actions/modal/modal";
import { useSelector, useDispatch } from "react-redux";
import {useMemo } from 'react';
import { ingredientsPropTypes } from '../../../utils/prop-types';

  
const IngredientsItem = ({ ingredient }) => {
  const dispatch = useDispatch();
  
  const {name, price, image } = ingredient;
  
  const handleIngredientClick = () => {
      dispatch(modalAddIngredient(ingredient));
      dispatch(toggleModalIngredient(true));
  }

  const bun = useSelector(store => store.burgerConstructorReducer.bun);
  const ingredients = useSelector(store => store.burgerConstructorReducer.ingredientsConstructor);

  const count = useMemo(() => {
    const allIngredients = [bun, bun, ...ingredients];
    return allIngredients.reduce((sum, item) => ingredient._id === item?._id ? sum + 1 : sum, 0);
  }, [ingredients, bun, ingredient._id]);


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
  ingredient: ingredientsPropTypes,
}

export default IngredientsItem;
