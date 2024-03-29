import style from "../HomePage/homePage.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../utils/prop-types";
import { FC } from 'react';

export const HomePage: FC = () => {

  const { ingredientsChecker, ingredientsRequest, ingredients } = useAppSelector((state) => state.burgerIngredientsReducer);
  const userData = useAppSelector((store) => store.userInfoReducer); //подгрузка данных из стора

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
      {!ingredientsRequest &&
        !ingredientsChecker &&
        ingredients?.length && (
          <section>
            <div className={style.appContent}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <div className="space"></div>
                <BurgerConstructor />
              </DndProvider>
            </div>
          </section>
        )}
    </>
  );
}