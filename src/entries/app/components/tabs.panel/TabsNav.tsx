import React, { useState, useContext, MouseEventHandler, MouseEvent } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './tabsNav.styles';
import { OrdersControlContext } from '../../assets/data/contexts';

const getMethods = (
  selectOrder: (orderNumber: number) => void,
): MouseEventHandler<HTMLButtonElement> => {
  const onSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    if (orderNumber && Number.parseInt(orderNumber, 10)) selectOrder(+orderNumber);
  };
  return onSelect;
};

type PropsTabs = {
  callbacks: {
    createOrder: () => void;
    selectOrder: (orderNumber: number) => void;
  };
} & WithStyles;

function TabsNavComponent({ classes, callbacks }: PropsTabs) {
  const { ordersNumbers, currentOrderNumber, canCreate } = useContext(OrdersControlContext);
  const [selectOrder] = useState(() => getMethods(callbacks.selectOrder));
  const tabs = ordersNumbers.map((orderNumber: number) => {
    const className = orderNumber === currentOrderNumber ? 'tab active' : 'tab';
    return (
      <button
        type="button"
        className={className}
        key={orderNumber}
        data-order-number={orderNumber}
        onClick={selectOrder}
      >
        {orderNumber}
      </button>
    );
  });

  if (canCreate)
    tabs.push(
      <button type="button" className="tab" key={0} onClick={callbacks.createOrder}>
        +
      </button>,
    );

  return <div className={classes.wrapper}>{tabs}</div>;
}

export const TabsNav = withStyles(styles)(TabsNavComponent);
