import { Counter, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredients-item.module.css';
import { useDrag } from "react-dnd";

  
const IngredientsItem = ({ item, setIngredientInModal, counter }) => {
    const { _id } = item;
  
    const [, ref, refImg] = useDrag({
        type: "ingredientDND",
        item: { _id },
    });
    return (
        <li 
        className={style.ingredientItem} 
        onClick={setIngredientInModal}
        ref={ref}
        id={item._id}
        >
           { counter > 0 && (<Counter count={counter} size="default" extraClass="m-1" />) }
            <div className='ingredientItemImage'>
                <img ref={refImg} src={item.image} alt={item.name} />
            </div>
            <div className='ingredientItemPrice'>
                {item.price}
                <CurrencyIcon type='primary' />
            </div>
            <div className='ingredientItemTitle'>
                {item.name}
            </div>
        </li>
    )
}

export default IngredientsItem;