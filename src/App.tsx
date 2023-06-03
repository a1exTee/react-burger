import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
//import Modal from './components/modal/modal';
import ModalOverlay from './components/modal/modal-overlay/modal-overlay';
import ErrorBoundary from './components/error-boundary/error-boundary';



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
}

export default App;