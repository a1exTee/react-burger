import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/prop-types';
import { Link, useLocation } from 'react-router-dom';
import { addCurrentOrderInfo } from '../../../services/actions/order/current-order';
import TotalPrice from '../../total-price/total-price';
import OrderIngredient from '../order-ingredient/order-ingredient';
import styles from './order-card.module.css'
import { FC } from 'react';
import { TOrder } from '../../../utils/prop-types';

type TOrderCard = {
  path: string,
  data: TOrder
}

const OrderCard: FC<TOrderCard> = ({ data, path }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector((store) => store.burgerIngredientsReducer.ingredients);
  const uniqueIngredients = data.ingredients.filter((element, index) => {
    return data.ingredients.indexOf(element) === index;
  }).reverse();

  function Counter(arr: string[], id: string) {
    return arr.filter(item => item == id).length
  };

  type Tstatus = {
    text: string | null,
    status: string | null,
    totalPrice: number,
  }

  const [status, setStatus] = useState<Tstatus>(
    {
      text: null,
      status: null,
      totalPrice: 0,
    });

  useMemo(() => {
    if (allIngredients!.length !== 0) {
      const ingredients = data.ingredients.map((item) => allIngredients!.find((data) => data._id === item)).filter(Boolean);
      const totalPrice = ingredients?.reduce((previous, current) => previous + current?.price!, 0);
      setStatus({ ...status, status: data.status, totalPrice: totalPrice })
    }
  }, [data.status]);

  function handleClick() {
    dispatch(addCurrentOrderInfo(data));
  }


  return (
    <Link to={`${path}/${data._id}`} state={{ background: location }} className={`${styles.orderCard}`} onClick={handleClick}>
      <p className={`${styles.number} text text_type_digits-default`}>#{data.number}</p>
      <p className={`${styles.date} text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /></p>
      <h4 className={`${styles.name} text text_type_main-medium`}>{data.name}</h4>
      {status.status === 'created' && (<p className={`${styles.status} ${styles.default} text text_type_main-default`}>Создан</p>)}
      {status.status === 'pending' && (<p className={`${styles.status} ${styles.default} text text_type_main-default`}>Готовится</p>)}
      {status.status === 'done' && (<p className={`${styles.status} ${styles.complete} text text_type_main-default`}>Готов</p>)}
      <div className={`${styles.ingredients}`}>
        {uniqueIngredients.slice(0, 6).map((item) =>
          <OrderIngredient intersection id={item} key={item} counter={Counter(data.ingredients, item)} />
        )}
      </div>
      <div className={`${styles.total}`}>
        <TotalPrice totalPrice={status.totalPrice} />
      </div>

    </Link>
  );
}

export default OrderCard;