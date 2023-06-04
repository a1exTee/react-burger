import React, { useState } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
//import Modal from './components/modal/modal';
import ModalOverlay from '../modal/modal-overlay/modal-overlay';
import ErrorBoundary from '../error-boundary/error-boundary';


function App() {

  const apiUrl = `https://norma.nomoreparties.space/api/ingredients`;

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    
    fetch(apiUrl)
        .then((res) => {
          if(!res.ok) throw new Error(res.status);
          else return res.json();
        })
        .then(({data}) => setState({ data: data, isLoading: false, hasError: false }))
        .catch(e => setState({ ...state, isLoading: false, hasError: true }))
    };

    React.useEffect(() => {
      getIngredients();
    }, []);


    const { data, isLoading, hasError } = state;
    
    

  return (
    <main className={style.App}>
        <div className="container">
        <ErrorBoundary>
          <AppHeader />
          <section>
            <div className={style.appContent}>
              {isLoading && 'Загрузка...'}
              {hasError && 'Произошла ошибка'}
              {!isLoading &&
                !hasError &&
                data.length &&
                <>
                <BurgerIngredients ingredientsData={state.data} />
                <div className='space'></div>
                <BurgerConstructor ingredientsData={state.data} />
                </>
                }
            </div>
          </section>
          </ErrorBoundary>
        </div>
        
    </main>
  );
}

/*function App() {

  const apiUrl = `https://norma.nomoreparties.space/api/ingredients`;

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    
    fetch(apiUrl)
        .then(res => res.json() as Promise<{sucsess: Boolean; data: []}>)
        .then(({data}) => setState({ data: data, isLoading: false, hasError: false }))
        .catch(e => setState({ ...state, isLoading: false, hasError: true }))
    };

    React.useEffect(() => {
      getIngredients();
    }, []);


    const { data, isLoading, hasError } = state;
    
    

  return (
    <main className="App">
        <div className="container">
        <ErrorBoundary>
          <AppHeader />
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isLoading &&
              !hasError &&
              data.length &&
              <>
              <BurgerIngredients ingredientsData={state.data} />
              <div className='space'></div>
              <BurgerConstructor ingredientsData={state.data} />
              </>
              }
            </div>
          </section>
          </ErrorBoundary>
        </div>
        
    </main>
  );
}*/

export default App;