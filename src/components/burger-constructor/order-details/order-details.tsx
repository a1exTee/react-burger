
import style from './order-details.module.css';
import done from '../../../images/done.svg';
import { useAppSelector } from '../../../utils/prop-types';
import { FC } from 'react';

const OrderDetails: FC = () => {

    const order = useAppSelector((store) => store.orderReducer);
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

export default OrderDetails;