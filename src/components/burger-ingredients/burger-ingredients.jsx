import React, { useState, setState, useEffect, useMemo, useCallback } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import { dataPropTypes } from "../../utils/prop-types";
import Modal from '../modal/modal';
import IngredientsDetails from './ingredients-details/ingredients-details';
import {modalDeleteIngredient} from '../../services/actions/burger-ingredients/burger-ingredients';
import {toggleModalIngredient} from '../../services/actions/modal/modal';
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const ingredients = useSelector(store => store.burgerIngredientsReducer.ingredients);
  const ingredientInModal = useSelector(store => store.modalReducer.isModalIngr);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    document.querySelector(`#${tab}`)?.scrollIntoView({ behavior: "smooth" });
  }

  const closeModal = () => {
    dispatch(toggleModalIngredient(false));
    dispatch(modalDeleteIngredient());
  }

  const [bunRef, isBunActive] = useInView({ threshold: 0.25 });
  const [sauceRef, isSauceActive] = useInView({ threshold: 0.25 });
  const [mainRef, isMainActive] = useInView({ threshold: 0.25 });

  useEffect(() => {
    if (isBunActive) {
      setCurrentTab('bun');
    } else if (isSauceActive) {
      setCurrentTab('sauce');
    } else if (isMainActive) {
      setCurrentTab('main');
    }
  }, [isBunActive, isSauceActive, isMainActive]);
  return (
<>
    <section className={burgerIngredientsStyle.burgerIngredientsCol}>
      <h1 className='mt-10 mb-5'>Соберите бургер</h1>
      <div className={burgerIngredientsStyle.tabWrap}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyle.tabContent} pt-5 custom-scroll`}>
        <div ref={bunRef}>
          <h2 id='bun' className='pt-5'>Булки</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'bun' && 
              <li key={ingredient._id}>
                <IngredientsItem key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={sauceRef}>
          <h2 id='sauce' className='pt-5'>Соусы</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'sauce' && 
              <li key={ingredient._id}>
                <IngredientsItem key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
        <div ref={mainRef}>
          <h2 id='main' className='pt-5'>Начинки</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {ingredients && ingredients.map((ingredient) => ingredient.type === 'main' && 
              <li key={ingredient._id}>
                <IngredientsItem key={ingredient._id} ingredient={ingredient} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
    {ingredientInModal && 
      <Modal closeModal={closeModal} title='Детали ингредиента'>
        <IngredientsDetails />
      </Modal>  
    }
    </>
  )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};


export default BurgerIngredients;