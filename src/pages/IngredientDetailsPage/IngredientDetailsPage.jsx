import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from './IngredientDetailsPage.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredients-details/ingredients-details';
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";
import { modalAddIngredient } from "../../services/actions/burger-ingredients/burger-ingredients";
import {toggleModalIngredient} from '../../services/actions/modal/modal';


export function IngredientDetailsPage() {
  const { id } = useParams();
  const { ingredientsChecker, ingredientsRequest, ingredients } = useSelector(
    (state) => state.burgerIngredientsReducer
  );
  const dispatch = useDispatch();
  //let ingredient = null;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (ingredientsRequest) {
    return <h2>Загрузка...</h2>;
  }

  if (!ingredientsRequest && ingredientsChecker) {
    return <h2>Ошибка</h2>;
  }

  /*if(!ingredientsRequest && !ingredientsChecker && ingredients.length){
    console.log(ingredientsRequest);
    console.log(ingredientsChecker);
    console.log(ingredients);
    ingredient = ingredients.find((item) => item._id === id);
    //dispatch(modalAddIngredient(ingredient));
    //dispatch(toggleModalIngredient(true));
  }*/
  //
  //
  //const ingredients = useSelector(store => store.burgerIngredientsReducer.ingredients);


  return (
    <>
      {ingredientsRequest && <h2>Загрузка...</h2>}
      {!ingredientsRequest && ingredientsChecker && <h2>Ошибка</h2>}
      {!ingredientsRequest && !ingredientsChecker && ingredients.length && (
          <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`} >
            <div className={`${styles.text} text text_type_main-large`} >
              Детали ингредиента
              <IngredientDetails ingredient={ingredients.find((item) => item._id === id)} />
            </div>
          </div>
        )}
    </>
  )
}

