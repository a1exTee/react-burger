import React, { useState, setState, useEffect, useMemo } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from './ingredients-item/ingredients-item';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import { dataPropTypes } from "../../components/utils/prop-types";
import Modal from '../modal/modal';
import IngredientsDetails from './ingredients-details/ingredients-details';
import {SET_INGREDIENT_IN_MODAL, DEL_INGREDIENT_IN_MODAL} from '../services/actions/modal/modal';
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState('bun');
    const [ingredientInModal, setIngredientInModal] = useState(false);
    const closeIngredientModal = () => setIngredientInModal(null);


    const { ingredientsData, ingredientsConstructor } = useSelector((store) => ({
        ingredientsData: store.ingredients.ingredients,
        ingredientsConstructor: store.burgerConstructor.ingredientsConstructor,
    }));

    const dispatch = useDispatch();

    const toggleModal = (e) => {
        if (!ingredientInModal) {
            setIngredientInModal(true);
            addIngredientInModal(e.target);
        } else {
            setIngredientInModal(false);
            dispatch({ type: DEL_INGREDIENT_IN_MODAL });
        }
    };

    const [refBun, tabBun] = useInView({ threshold: 0.4 });
    const [refMain, tabMain] = useInView({ threshold: 0.5 });
    const [refSauce, tabSauce] = useInView({ threshold: 1, delay: 500 });

    useEffect(() => {
      if (tabBun && !tabMain && tabSauce) {
          setCurrentTab("bun");
      }
      if (!tabBun && !tabMain && tabSauce) {
          setCurrentTab("sauce");
      }
      if (!tabBun && tabMain && !tabSauce) {
          setCurrentTab("main");
      }
    }, [tabBun, tabMain, tabSauce]);

    useEffect(() => {
        if (document.getElementById(currentTab)) {
            document.getElementById(currentTab).scrollIntoView({ behavior: "smooth" });
        }
    }, [currentTab]);

    const addIngredientInModal = (element) => {
        if (element.closest("li") != undefined) {
            const item = ingredientsData.find((item) => item._id === element.closest("li").id);
            dispatch({
                type: SET_INGREDIENT_IN_MODAL,
                value: item,
            });
        }
    };

    const addIngredients = useMemo(
        () => (data, type) => {
          console.log(data);
        return data.map((ingredient, index) => {
            if (ingredient.type === type) {
              if(type === 'bun'){
                console.log(ingredientsConstructor.filter(
                  (item) => item._id === ingredient._id
              ));
                console.log(ingredientsConstructor.filter(
                  (item) => item._id === ingredient._id
              ).length);
              }
            const counter = ingredientsConstructor.filter(
                (item) => item._id === ingredient._id
            ).length;
            console.log(counter);
            return (
                <IngredientsItem
                key={index}
                item={ingredient}
                setIngredientInModal={toggleModal}
                counter={counter}
                />
            );
            }
        });
        },
        [ingredientsConstructor]
    );

    const renderTabs = (data) => {
      //console.log(currentTab);
        return (
          <>
            <div id="bun">
              <h2 ref={refBun}>Булки</h2>
              <ul>
                {addIngredients(data, "bun")}
              </ul>
            </div>
            <div id="sauce">
              <h2 ref={refSauce}>Соуcы</h2>
              <ul>
                {addIngredients(data, "sauce")}
              </ul>
            </div>
            <div id="main">
              <h2 ref={refMain}>Начинки</h2>
              <ul>
                {addIngredients(data, "main")}
              </ul>
            </div>
          </>
        );
      };

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
            <div>
              {console.log(ingredientsData)}
             {renderTabs(ingredientsData)}
            </div>
          </div>

          {ingredientInModal && (
              <Modal title='Детали ингредиента' closeModal={closeIngredientModal}>
                  <IngredientsDetails />
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