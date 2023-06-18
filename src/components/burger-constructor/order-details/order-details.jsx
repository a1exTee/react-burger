
import style from './order-details.module.css';
import done from '../../../images/done.svg';
import PropTypes from 'prop-types';

import { useSelector } from "react-redux";

const OrderDetails = () => {
    const order = useSelector((store) => store.orderReducer);
    return (
        <>
            <div className={style.orderDetailsId}>{order.order}</div>
            <div className={style.orderDetailsTitle}>идентификатор заказа</div>
            <img src={done} className={style.orderDetailsImage} alt="Успешно" />
            <div className={style.orderDetailsText}>Ваш заказ начали готовить</div>
            <div className={style.orderDetailsWait}>Дождитесь готовности на орбитальной станции</div>
        </>
    )
}

OrderDetails.propTypes = {
    order: PropTypes.number,
  }

export default OrderDetails;