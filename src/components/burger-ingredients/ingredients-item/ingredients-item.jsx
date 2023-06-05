import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';


const IngredientsItem = ({ item, setIngredientInModal }) => {
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

export default IngredientsItem;