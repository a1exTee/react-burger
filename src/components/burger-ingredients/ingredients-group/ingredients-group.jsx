import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from '../ingredients-item/ingredients-item';
import ProductsData from '../../../utils/data';
import { useState } from 'react';
import style from './ingredients-group.module.css';


//TODO модалка, попап Оформить заказ открывает модальное окно с описанием заказа., оверлей,
//отправьте ссылку на пул-реквест, открытый из ветки sprint-1/step-2 в main, через интерфейс Практикума. 

export const getGroup = (tabVal) => {
    ProductsData.map(item => {
        
        if(item.type === tabVal){
            return (<IngredientsItem key={item._id} name={item.name} price={item.price} image={item.image} />)
        }
    });
}

const IngredientsGroup = (props) => {

    const [currentList, setCurrenList] = useState(getGroup(props.tabVal));
    return (
        <>
            <div className='ingredientGroup'>
                <h3>{props.tabVal === 'bun' ? 'Булки' : (props.tabVal === 'sauce' ? 'Соусы' : (props.tabVal === 'main' ? 'Начинки' : ''))}</h3>
                <div className='ingredientGgroupList'>
                    { getGroup(props.tabVal) }
                </div>
            </div>
        </>
    )
}

export default IngredientsGroup;