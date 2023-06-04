
import style from './order-details.module.css';
import done from '../../../images/done.svg';
import PropTypes from 'prop-types';

function OrderDetails() {
    return (
        <>
            <div className={style.orderDetailsId}>034536</div>
            <div className={style.orderDetailsTitle}>идентификатор заказа</div>
            <img src={done} className={style.orderDetailsImage} alt="Успешно" />
            <div className={style.orderDetailsText}>Ваш заказ начали готовить</div>
            <div className={style.orderDetailsWait}>Дождитесь готовности на орбитальной станции</div>
        </>
    )
}

/*OrderDetails.propTypes = {
    id: PropTypes.number.isRequired,
}*/

export default OrderDetails;