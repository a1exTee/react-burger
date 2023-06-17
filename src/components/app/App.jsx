import React, { useState } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalOverlay from '../modal/modal-overlay/modal-overlay';
import ErrorBoundary from '../error-boundary/error-boundary';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {getIngredients} from '../services/actions/burger-ingredients/burger-ingredients';
import { useSelector, useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch();
  const { ingredientsChecker } = useSelector(
    (store) => store.ingredients.ingredientsChecker
  );

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={style.App}>
        <div className="container">
        <ErrorBoundary>
          <AppHeader />
          <section>
            <div className={style.appContent}>
              {!ingredientsChecker ? (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <div className='space'></div>
                  <BurgerConstructor />
                </DndProvider>
              ) : ('')}
            </div>
          </section>
          </ErrorBoundary>
        </div>
    </main>
  );
}

export default App;