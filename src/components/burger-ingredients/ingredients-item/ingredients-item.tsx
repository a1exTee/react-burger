import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import { useDrag } from "react-dnd";
import {useMemo, FC } from 'react';
import { useLocation, Link } from "react-router-dom";
import { TIngredient } from '../../../utils/prop-types';
import { useAppDispatch, useAppSelector } from '../../../utils/prop-types';
  
const IngredientsItem : FC<{ ingredient: TIngredient }> = ({
  ingredient,
}) =>  {
  //const dispatch = useAppDispatch();
  
  const {name, price, image } = ingredient;
  
  /*const handleIngredientClick = () => {
      dispatch(modalAddIngredient(ingredient));
      dispatch(toggleModalIngredient(true)); 
  }*/

  
  const bun = useAppSelector(store => store.burgerConstructorReducer.bun);
  
  const ingredients = useAppSelector(store => store.burgerConstructorReducer.ingredientsConstructor);

  const count = useMemo(() => {
    const allIngredients = [bun, bun, ...ingredients];
    let sum = 0;
    if(allIngredients.length > 2){
       sum = allIngredients.reduce((sum, item) => ingredient._id === item?._id ? sum + 1 : sum, 0);
    }
    return sum;

  }, [ingredients, bun, ingredient._id]);


  const [{isDragging}, dragRef] = useDrag({
    type: 'ingredientDND',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const location = useLocation();

  return(
    <div 
      ref={dragRef} 
      className={`${style.ingredientItem} ${isDragging && style.drag}`} 
    >
       <Link to={`/ingredients/${ingredient._id}`}
          state={{ background: location }}
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
        </Link>
    </div>
  )
}

export default IngredientsItem;