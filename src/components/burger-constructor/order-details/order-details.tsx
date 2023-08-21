import style from './order-details.module.css';
import done from '../../../images/done.svg';
import { useAppSelector } from '../../../utils/prop-types';
import { FC } from 'react';

const OrderDetails: FC = () => {

    const zeroLength = 6;
    const orderInfo = useAppSelector((store) => store.orderReducer.orderNumber); 
    const orderNumber = String(orderInfo).padStart(zeroLength, '0');

    return (
        <>
        {orderInfo === null
         ? <p className='text text_type_main-large pb-8'>Загрузка</p>
         : <div className={style.orderDetailsId}>{orderNumber}</div> 
        }
            <div className={style.orderDetailsTitle}>идентификатор заказа</div>
            <img src={done} className={style.orderDetailsImage} alt="Успешно" />
            <div className={style.orderDetailsText}>Ваш заказ начали готовить</div>
            <div className={style.orderDetailsWait}>Дождитесь готовности на орбитальной станции</div>
        </>
    )
}

export default OrderDetails;