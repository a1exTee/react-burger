import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-details.module.css';
import PropTypes from 'prop-types';
import ProductsData from '../../utils/data';


const IngredientsDetails = ({ingredientData}) => {

    return (
        <div className='ingredientDetails'>
            <div className='ingredientDetailsImage'>
                <img src={ingredientData.image} alt={ingredientData.name} />
            </div>
            <div className='ingredientDetailsTitle'>
                {ingredientData.name}
            </div>
            <ul className='ingredientDetailsOrganicSubstances'>
                <li>{ingredientData.proteins}</li>
                <li>{ingredientData.fat}</li>
                <li>{ingredientData.carbohydrates}</li>
                <li>{ingredientData.calories}</li>
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