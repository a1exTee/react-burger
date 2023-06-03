import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import IngredientsDetails from '../ingredients-details/ingredients-details';


const IngredientsItem = ({ item, setIngredientInModal }) => {
    //const [modalActive, setModalActive] = useState(false);
    return (
        <div className={style.ingredientItem} onClick={() => setIngredientInModal(item)}>
           { item.count > 0 ? <Counter count={item.count} size="default" extraClass="m-1" /> : "" }
            <div className='ingredientItemImage'>
                <img src={item.image} alt={item.name} />
            </div>
            <div className='ingredientItemPrice'>
                {item.price}
                <CurrencyIcon type='primary' />
            </div>
            <div className='ingredientItemTitle'>
                {item.name}
            </div>
        </div>
    )
}

/*IngredientsItem.propTypes = {
    price: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string
}; */

IngredientsItem.propTypes = {
    item: PropTypes.object.isRequired,
    setIngredientInModal: PropTypes.func.isRequired
}

export default IngredientsItem;