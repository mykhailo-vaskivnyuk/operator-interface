import { useState } from 'react';
import { IOrdersControl } from './ordersControl.class';

const createCallbacks = (orders: IOrdersControl) => {
  const callbacksControls = {
    deleteOrder: orders.deleteOrder,
    printOrder: orders.printOrder,
  };
  const callbacksTabs = {
    selectOrder: orders.selectOrder,
    createOrder: orders.createOrder,
  };
  const callbacksOrder = {
    onOrderChange: orders.onOrderItemsChange,
  };
  return { callbacksTabs, callbacksControls, callbacksOrder };
};

type IUseOrders = ReturnType<typeof createCallbacks>;

export const useOrders = (orders: IOrdersControl): IUseOrders => {
  const [methods] = useState(() => createCallbacks(orders));
  return methods;
};
