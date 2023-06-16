import React, { useState, setState } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import { dataPropTypes } from "../../components/utils/prop-types";
import Modal from '../modal/modal';
import IngredientsDetails from './ingredients-details/ingredients-details';

const BurgerIngredients = ({ingredientsData}) => {
    const [currentTab, setCurrentTab] = React.useState('bun');
    const [ingredientInModal, setIngredientInModal] = useState(null);
    const closeIngredientModal = () => setIngredientInModal(null);
   

    return (
      <section className={burgerIngredientsStyle.burgerIngredientsCol}>
        <h1>Соберите бургер</h1>
        <div className={burgerIngredientsStyle.tabWrap}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
          Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
          Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
          Начинки 
          </Tab>
        </div>
        <div className={burgerIngredientsStyle.tabContent}>
          <div>
              <h2>Булки</h2>
              <div className={burgerIngredientsStyle.ingredientsGroup}>
                  {ingredientsData.map((ingredient, index) => {
                      if (ingredient.type === "bun") {
                          return (
                              <IngredientsItem key={index} item={ingredient} setIngredientInModal={setIngredientInModal} />
                          )
                      }
                  })}
              </div>

              <h2>Соусы</h2>
              <div className={burgerIngredientsStyle.ingredientsGroup}>
                  {ingredientsData.map((ingredient, index) => {
                      if (ingredient.type === "sauce") {
                          return (
                              <IngredientsItem key={index} item={ingredient} setIngredientInModal={setIngredientInModal} />
                          )
                      }
                  })}
              </div>

              <h2>Начинки</h2>
              <div className={burgerIngredientsStyle.ingredientsGroup}>
                  {ingredientsData.map((ingredient, index) => {
                      if (ingredient.type === "main") {
                          return (
                              <IngredientsItem key={index} item={ingredient} setIngredientInModal={setIngredientInModal} />
                          )
                      }
                  })}
              </div>
          </div>

          {ingredientInModal && (
              <Modal title='Детали ингредиента' closeModal={closeIngredientModal}>
                  <IngredientsDetails ingredientData={ingredientInModal} />
              </Modal>
          )}
        </div>
      </section>
    )

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(dataPropTypes).isRequired),
};


export default BurgerIngredients;