import { useEffect } from 'react';
import styles from './profile-orders.module.css'
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from '../../services/actions/ws/ws-auth-actions';
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';
import Orders from '../../components/orders/orders';
import { FC } from 'react';

const ProfileOrders: FC<{path: string, reverse?: boolean }> = ({ path, reverse }) => {
  const dispatch = useAppDispatch();
  const wsAuthData = useAppSelector((store) => store.wsAuthReducer.orders);

  useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {dispatch({ type: WS_AUTH_CONNECTION_CLOSED })};
  }, [dispatch]);

  return (
    <>
    {!wsAuthData
      ? <p>...Загрузка</p>
      : <Orders ordersData={wsAuthData} path={path} reverse={reverse} />}
    </>
  );
}

export default ProfileOrders;