import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from './IngredientDetailsPage.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredients-details/ingredients-details';
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";


export function IngredientDetailsPage() {

  const { id } = useParams();
  const ingredients = useSelector(store => store.burgerIngredientsReducer.ingredients);
  const ingredient = ingredients.find((item) => item._id === id);
  console.log(useSelector(store => store))
  console.log(ingredient);

  return (
    <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`} >
      <div className={`${styles.text} text text_type_main-large`} >
        Детали ингредиента
        <IngredientDetails ingredient={ingredient} />
      </div>
    </div>
  )
}

