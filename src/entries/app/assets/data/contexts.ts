import { createContext } from 'react';
import { IStateOrders } from '../../components/orders/ordersControl.class';
import { IStateOrder } from '../../components/order.control/orderControl.class';

export const OrdersControlContext = createContext<IStateOrders>({} as IStateOrders);

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);
