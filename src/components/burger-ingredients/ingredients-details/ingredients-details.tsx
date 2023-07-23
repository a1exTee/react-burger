import style from './ingredients-details.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const IngredientsDetails = () => {
    const { id } = useParams();

    // @ts-ignore
    const ingredients = useSelector((store) => store.burgerIngredientsReducer.ingredients);
    
    const ingredient = ingredients.find((item) => item._id === id);

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

export default IngredientsDetails;