import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-details.module.css';
import PropTypes from 'prop-types';


const IngredientsDetails = (props: { image: string | undefined; name: string | undefined; proteins: number | undefined; fat: number | undefined; carbohydrates: number | undefined; calories: number | undefined; }) => {

    return (
        <div className='ingredientDetails'>
            <CloseIcon type="primary" />
            <div className='ingredientDetailsImage'>
                <img src={props.image} alt={props.name} />
            </div>
            <div className='ingredientDetailsTitle'>
                {props.name}
            </div>
            <ul className='ingredientDetailsOrganicSubstances'>
                <li>{props.proteins}</li>
                <li>{props.fat}</li>
                <li>{props.carbohydrates}</li>
                <li>{props.calories}</li>
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