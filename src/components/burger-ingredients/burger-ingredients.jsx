import React, { useState, setState } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
//import ProductsData from '../utils/data';
//import { getGroup } from './ingredients-group/ingredients-group';
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
              <div>
                  {ingredientsData.map((ingredient, index) => {
                      if (ingredient.type === "bun") {
                          return (
                              <IngredientsItem key={index} item={ingredient} setIngredientInModal={setIngredientInModal} />
                          )
                      }
                  })}
              </div>

              <h2>Соусы</h2>
              <div>
                  {ingredientsData.map((ingredient, index) => {
                      if (ingredient.type === "sauce") {
                          return (
                              <IngredientsItem key={index} item={ingredient} setIngredientInModal={setIngredientInModal} />
                          )
                      }
                  })}
              </div>

              <h2>Начинки</h2>
              <div>
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
          {/*<IngredientsGroup tabVal={currentTab} />*/}

          {/*ingredientsData.map((ingredient, index) => <IngredientsItem key={index} data={ingredient} />)*/}
          {/*ProductsData.map(burgersIngredient => <IngredientsItem key={burgersIngredient._id} price={burgersIngredient.price} name={burgersIngredient.name} image={burgersIngredient.image} />)*/}

        </div>
      </section>
    )

}



BurgerIngredients.propTypes = {
  price: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
}; 

export default BurgerIngredients;