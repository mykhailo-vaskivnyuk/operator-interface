import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './orders.styles';
import { useOrders } from './ordersControl.hook';
import { TabsNav } from '../tabs.panel/TabsNav';
import { Message } from '../message/Message';
import { HomeButton } from '../tabs.panel/home/HomeButton';
import { OrderControl } from '../order.control/OrderControl';
import { Controls } from '../controls/Controls';
import { Services } from '../services/Services';

import { OrdersControlClass, IOrdersControl } from './ordersControl.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';

import { OrdersControlContext } from '../../assets/data/contexts';

type PropsOrders = {
  maxOrdersCount: number;
} & WithStyles &
  ComponentState<IOrdersControl>;

function OrdersComponent({ classes, state }: Omit<PropsOrders, 'maxOrdersCount'>) {
  const { callbacksTabs, callbacksControls, callbacksOrder } = useOrders(state);
  const stateOrders = state.getStateObject();
  const { currentOrder } = stateOrders;

  if (!currentOrder) return null;

  return (
    <OrdersControlContext.Provider value={stateOrders}>
      <div className={classes.wrapper}>
        <div className="tabs-panel">
          <TabsNav callbacks={callbacksTabs} />
          <Message />
          <HomeButton />
        </div>
        <div className="order-panel">
          <OrderControl order={currentOrder} callbacks={callbacksOrder} services={Services} />
          <Controls callbacks={callbacksControls} />
        </div>
      </div>
    </OrdersControlContext.Provider>
  );
}

const OrdersWithObject = withState<IOrdersControl, PropsOrders>(
  OrdersControlClass,
  OrdersComponent,
);

export const OrdersControl = withStyles(styles)(OrdersWithObject);
