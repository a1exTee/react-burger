import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import { useRef, FC } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { DEL_IN_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../services/actions/burger-constructor/burger-constructor";
import { TIngredient } from '../../utils/prop-types';
import { useAppDispatch } from '../../utils/prop-types';
import type { Identifier } from 'dnd-core'


interface IConstructorIngredient {
  index: number;
  ingredient: TIngredient;
}

type TDragObject = {
  id: string;
  index: number;
  type: 'bun' | 'sauce' | 'main';
}

type TDragCollectedProps = {
  isDragging: boolean;
}

type TDropgCollectedProps = {
  handleId: Identifier;
}

const BurgerConstructorItem: FC<IConstructorIngredient> = ({index, ingredient}) => {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLLIElement>(null)
  const id = ingredient.id

  const [{isDragging}, drag] = useDrag({
    type: 'ingredient',
    item: {id, index},
    collect: (monitor) =>  {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const [, drop] = useDrop<IConstructorIngredient, void, { isDragging: Identifier | null }>({
    accept: 'ingredient',
    hover(ingredients) {
      if (!ref.current) {return}
      const dragIndex = ingredients.index;
      const hoverIndex = index;
      dispatch({
        type: REPLACE_INGREDIENT,
        item: {dragIndex, hoverIndex}
      })
      ingredients.index = hoverIndex
    }
  })
  
  const deleteIngredient = (itemId: string) => {
    dispatch({
      type: DEL_IN_CONSTRUCTOR,
      id: itemId,
    })
  } 

  drag(drop(ref))

  return (
    <li ref={ref} key={ingredient.id} className={`${burgerConstructorStyle.element} ${isDragging ? burgerConstructorStyle.opacity : ''} pl-4 pr-4`}>
        <div className={burgerConstructorStyle.drag_icon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          isLocked={false}
          handleClose={(() => deleteIngredient(id))}
        />
    </li>
  )
};

export default BurgerConstructorItem;