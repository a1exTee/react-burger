import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-details.module.css';
import PropTypes from 'prop-types';
import ProductsData from '../../utils/data';


const IngredientsDetails = ({ingredientData}) => {

    return (
        <div className={style.ingredientDetails}>
            <div className={style.ingredientDetailsImage}>
                <img src={ingredientData.image} className={style.ingredientDetailsImage} alt={ingredientData.name} />
            </div>
            <div className={style.ingredientDetailsTitle}>
                {ingredientData.name}
            </div>
            <ul className={style.ingredientDetailsOrganicSubstances}>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Калории,ккал</span>{ingredientData.proteins}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Белки, г</span>{ingredientData.fat}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Жиры, г</span>{ingredientData.carbohydrates}</li>
                <li className={style.ingredientDetailsOrganicSubstancesItem}><span>Углеводы, г</span>{ingredientData.calories}</li>
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