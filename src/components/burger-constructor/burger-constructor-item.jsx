import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyle from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DEL_IN_CONSTRUCTOR, REPLACE_INGREDIENT} from "../../services/actions/burger-constructor/burger-constructor";

const BurgerConstructorItem = ({index, ingredient}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
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

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(ingredients) {
      if (!ref.current) {return}
      const dragIndex = ingredients.index
      const hoverIndex = index
      dispatch({
        type: REPLACE_INGREDIENT,
        item: {dragIndex, hoverIndex}
      })
      ingredients.index = hoverIndex
    }
  })
  
  const deleteIngredient = (itemId) => {
    dispatch({
      type: DEL_IN_CONSTRUCTOR,
      id: itemId,
    })
  } 

  drag(drop(ref))

  return (
    <li ref={ref} key={ingredient.id} className={`${burgerConstructorStyle.element} ${isDragging ? burgerConstructorStyle.opacity : ''} pl-4 pr-4`}>
        <div className={burgerConstructorStyle.drag_icon}>
          <DragIcon />
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

BurgerConstructorItem.propTypes = {
  index: PropTypes.number, 
  ingredient: PropTypes.object.isRequired,
}

export default BurgerConstructorItem;
