import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import PropTypes from 'prop-types';
//import Modal from '../../modal/modal';



const IngredientsItem = ({props}) => {
    //const [modalActive, setModalActive] = useState(false);

    console.log(props);
    return (
        <div className={style.ingredientItem}>
            <Counter count={1} size='default' extraClass='m-1' />
            <div className='ingredientItemImage'>
                <img src={props.image} alt={props.name} />
            </div>
            <div className='ingredientItemPrice'>
                {props.price}
                <CurrencyIcon type='primary' />
            </div>
            <div className='ingredientItemTitle'>
                {props.name}
            </div>
        </div>
    )
}

IngredientsItem.propTypes = {
    price: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string
}; 

export default IngredientsItem;