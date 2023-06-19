import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ErrorBoundary from "../error-boundary/error-boundary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

function App() {
  const { ingredientsChecker, ingredientsRequest, ingredients } = useSelector(
    (state) => state.burgerIngredientsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (ingredientsRequest) {
    return <h2>Загрузка...</h2>;
  }

  if (!ingredientsRequest && ingredientsChecker) {
    return <h2>Ошибка</h2>;
  }

  return (
    <main className={style.App}>
      <div className="container">
        <ErrorBoundary>
          <AppHeader />
          {ingredientsRequest && <h2>Загрузка...</h2>}
          {!ingredientsRequest && ingredientsChecker && <h2>Ошибка</h2>}
          {!ingredientsRequest &&
            !ingredientsChecker &&
            ingredients.length && (
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
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
