import { useAppSelector } from '../../utils/prop-types';
import { useParams } from 'react-router-dom';
import styles from './IngredientDetailsPage.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredients-details/ingredients-details';
import { FC } from "react";


export const IngredientDetailsPage: FC = () => {
  const { id } = useParams();

  const { ingredientsChecker, ingredientsRequest, ingredients } = useAppSelector((state) => state.burgerIngredientsReducer);

  if (ingredientsRequest) {
    return <h2>Загрузка...</h2>;
  }

  if (!ingredientsRequest && ingredientsChecker) {
    return <h2>Ошибка</h2>;
  }

  return (
    <>
      {ingredientsRequest && <h2>Загрузка...</h2>}
      {!ingredientsRequest && ingredientsChecker && <h2>Ошибка</h2>}
      {!ingredientsRequest && !ingredientsChecker && ingredients?.length && (
          <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`} >
            <div className={`${styles.text} text text_type_main-large`} >
              Детали ингредиента
              <IngredientDetails />
            </div>
          </div>
        )}
    </>
  )
}