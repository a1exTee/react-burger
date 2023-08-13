import OrderCard from './order-card/order-card';
import styles from './orders.module.css'
import { FC } from 'react';
import { TOrder } from '../../utils/prop-types';

type TOrders = {
  path: string,
  ordersData: Array<TOrder>,
  reverse?: boolean
}

const Orders: FC<TOrders> = ({ path, ordersData, reverse }) => {
  
  return (
    <ul className={`${styles.blockWithScroll} mt-10`}>
      {reverse
        ? ordersData?.map(item => <OrderCard data={item} path={path} key={item._id} />).reverse()
        : ordersData?.map(item => <OrderCard data={item} path={path} key={item._id} />)
      }
    </ul>
  );
}

export default Orders;
