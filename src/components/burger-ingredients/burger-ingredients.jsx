import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
//import PropTypes from 'prop-types';
//import ProductsData from '../utils/data';
//import { getGroup } from './ingredients-group/ingredients-group';

const BurgerIngredients = ({ingredientsData}) => {
    const [currentTab, setCurrentTab] = React.useState('bun');

    return (
      <section className={burgerIngredientsStyle.burgerIngredientsCol}>
        <h1>Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
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
          {/*<IngredientsGroup tabVal={currentTab} />*/}
          console.log(ingredientsData);
          {ingredientsData.map((ingredient, index) => <IngredientsItem key={index} data={ingredient} />)}
          {/*ProductsData.map(burgersIngredient => <IngredientsItem key={burgersIngredient._id} price={burgersIngredient.price} name={burgersIngredient.name} image={burgersIngredient.image} />)*/}
        </div>
      </section>
    )
}

/*BurgerIngredients.propTypes = {
  price: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
}; */

export default BurgerIngredients;