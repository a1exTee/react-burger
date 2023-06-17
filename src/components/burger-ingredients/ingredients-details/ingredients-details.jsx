import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-details.module.css';
import PropTypes from 'prop-types';
import ProductsData from '../../utils/data';
import { useSelector } from "react-redux";


const IngredientsDetails = () => {
    const ingredient = useSelector((store) => store.modal.ingredient);
    return (
        <div className={style.ingredientDetails}>
            <div className={style.ingredientDetailsImage}>
                <img src={ingredient.image} className={style.ingredientDetailsImage} alt={ingredient.name} />
            </div>
            <div className={style.ingredientDetailsTitle}>
                {ingredient.name}
            </div>
            <ul className={style.ingredientDetailsOrganicSubstances}>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Калории,ккал</span>{ingredient.proteins}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Белки, г</span>{ingredient.fat}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Жиры, г</span>{ingredient.carbohydrates}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Углеводы, г</span>{ingredient.calories}</li>
            </ul>
        </div>
    )
}

IngredientsDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
}; 

export default IngredientsDetails;