import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';
import { FC } from 'react';
import { TOrder, useAppDispatch } from '../../utils/prop-types';

type TOrderFullScreen = {
  start: string,
  close: string,
  data: Array<TOrder>
}

const OrderFullScreen: FC <TOrderFullScreen> = ({ start, close, data }) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data === null) {
      dispatch({ type: start });
    }
    return () => {dispatch({ type: close })};
  }, []);

  return (
    <>
      {data
        ? <OrderInfo data={data} ></OrderInfo>
        : <p>Загрузка данных...</p>}
    </>
  );
}

export default OrderFullScreen;