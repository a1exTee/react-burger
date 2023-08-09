import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import { useRef, FC } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { DEL_IN_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../services/actions/burger-constructor/burger-constructor";
import { TIngredient } from '../../utils/prop-types';
import { useAppDispatch } from '../../utils/prop-types';
import type { Identifier } from 'dnd-core'
import { moveIngredientInConstructor, deleteIngredient } from '../../services/actions/burger-constructor/burger-constructor';


interface IConstructorIngredient {
  index: number;
  ingredient: TIngredient;
  id: string
}

const BurgerConstructorItem: FC<IConstructorIngredient> = ({index, ingredient, id}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{isDragging}, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) =>  {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(ingredients: IConstructorIngredient, monitor) {
      if (!ref.current) {return}
      const dragIndex = ingredients.index;
      const hoverIndex = index;
      console.log(hoverIndex);
      console.log(dragIndex);
      dispatch(moveIngredientInConstructor({ dragIndex, hoverIndex }));
      /*dispatch({
        type: REPLACE_INGREDIENT,
        item: {dragIndex, hoverIndex}
      })*/
      ingredients.index = hoverIndex;
    }
  })
  

  drag(drop(ref))
  return (
    <li ref={ref} id={ingredient.id} key={ingredient.id} className={`${burgerConstructorStyle.element} ${isDragging ? burgerConstructorStyle.opacity : ''} pl-4 pr-4`}>
        <div className={burgerConstructorStyle.drag_icon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          isLocked={false}
          handleClose={(() => dispatch(deleteIngredient(id)))}
        />
    </li>
  )
};

export default BurgerConstructorItem;