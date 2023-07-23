import { useState, useEffect, useMemo } from 'react';
import { Tab  } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientsDetails from './ingredients-details/ingredients-details';
import {modalDeleteIngredient} from '../../services/actions/burger-ingredients/burger-ingredients';
import {toggleModalIngredient} from '../../services/actions/modal/modal';
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import { TIngredient } from '../../utils/prop-types';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
    // @ts-ignore
  const ingredients = useSelector(store => store.burgerIngredientsReducer.ingredients);
    // @ts-ignore
  const ingredientInModal = useSelector(store => store.modalReducer.isModalIngr);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    document.querySelector(`#${tab}`)?.scrollIntoView({ behavior: "smooth" });
  }

  const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

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
      <ul className={`${burgerIngredientsStyle.tabContent} pt-5 custom-scroll`}>
        <li ref={bunRef}>
          <h2 id='bun' className='pt-5'>Булки</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {buns.map((ingredient) => 
              <li key={ingredient._id}>
                <IngredientsItem ingredient={ingredient} />
              </li>
            )}
          </ul>
        </li>
        <li ref={sauceRef}>
          <h2 id='sauce' className='pt-5'>Соусы</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {sauces.map(ingredient =>
              <li key={ingredient._id}>
                <IngredientsItem ingredient={ingredient} />
              </li>
            )}
          </ul>
        </li>
        <li ref={mainRef}>
          <h2 id='main' className='pt-5'>Начинки</h2>
          <ul className={`ml-4 mr-4 mt-6 mb-5`}>
            {mains.map(ingredient =>
              <li key={ingredient._id}>
                <IngredientsItem ingredient={ingredient} />
              </li>
            )}
          </ul>
        </li>
      </ul>
    </section>
    {ingredientInModal && 
      <Modal closeModal={closeModal} title='Детали ингредиента'>
        <IngredientsDetails />
      </Modal>  
    }
    </>
  )
}


export default BurgerIngredients;
