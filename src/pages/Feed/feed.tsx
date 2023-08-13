import { useEffect } from 'react';
import styles from './feed.module.css'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/ws/ws-actions';
import { useAppSelector, useAppDispatch } from '../../utils/prop-types';
import Orders from '../../components/orders/orders';
import InfoTable from '../../components/info-table/info-table';
import { FC } from 'react';

const Feed: FC<{ path:string }> = ({ path }) => {
  const dispatch = useAppDispatch();
  const wsData = useAppSelector((store) => store.wsReducer);
  const ordersData = useAppSelector((store) => store.wsReducer.orders);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
  }, [dispatch]);

  return (
    <div className={`${styles.page}`}>
      <h2 className={`${styles.block} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
      <div className={`${styles.block}`}>
        <Orders ordersData={wsData.orders!} path={path} />
        <div className={`${styles.ordersTemplate}`}>
          <div className={`${styles.ordersStatus}`}>
            {ordersData
              ? <>
                <InfoTable done name={"Готов"} arr={ordersData} statusString={"done"} />
                <InfoTable name={"В работе"} arr={ordersData} statusString={"pending"} />
              </>
              : null}
          </div>
          <h3 className={`${styles.statsHeader} text text_type_main-medium mt-15`}>Выполненно за все время:</h3>
          <p className={`${styles.statsData} text text_type_digits-large`}>{wsData.total}</p>
          <h3 className={`${styles.statsHeader} text text_type_main-medium mt-15`}>Выполненно за сегодня:</h3>
          <p className={`${styles.statsData} text text_type_digits-large`}>{wsData.totalToday}</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;