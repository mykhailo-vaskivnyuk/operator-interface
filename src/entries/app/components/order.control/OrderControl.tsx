import React, { useState, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './orderControl.styles';
import { Mode } from '../../assets/types/types';
import { Search } from '../search/Search';
import { OrderInfo } from './order.info/OrderInfo';
import { OrderItems } from './order.items/OrderItems';
import { Modal } from '../main/Modal';
import { OrderControlModalWeight } from './order.modals/OrderControlModalWeight';
import { DigitDisplay } from '../digit.display/DigitDisplay';
import { OrderControlClass, IOrderControl } from './orderControl.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';
import { ItemType } from '../../assets/types/Item.types';
import { OrderControlContext } from '../../assets/data/contexts';
import { IOrder } from '../orders/order.class';
import { Services, IServices } from '../services/Services';

export type PropsOrderControl = {
  order: IOrder;
  services: IServices;
  callbacks: {
    onOrderChange: () => void;
  };
} & WithStyles &
  ComponentState<IOrderControl>;

function OrderControlComponent(props: PropsOrderControl) {
  const { state, callbacks, order } = props;
  useState(() => state.onItemsChange(callbacks.onOrderChange));
  useEffect(() => state.setOrder(order), [state, order]);
  const { addItem, delItem, selectItem, selectPieces, bindReset } = state;
  const stateOrder = state.getStateObject();

  if (!stateOrder) return null;

  const { orderMode, itemType } = stateOrder;
  const { classes } = props;
  return (
    <>
      <OrderControlContext.Provider value={stateOrder}>
        <div className={classes.wrapper}>
          <div className="search-panel">
            <Search onSelect={addItem} bindReset={bindReset} services={Services} />
            <OrderInfo onClick={delItem} />
          </div>
          <div className="order-items">
            <OrderItems onSelect={selectItem} />
          </div>
        </div>
      </OrderControlContext.Provider>
      {orderMode === Mode.MODAL ? (
        <Modal>
          {itemType === ItemType.PIECE ? (
            <DigitDisplay onSelect={selectPieces} fractionDigits={0} />
          ) : (
            <OrderControlModalWeight />
          )}
        </Modal>
      ) : null}
    </>
  );
}

const OredrWithObject = withState<IOrderControl, PropsOrderControl>(
  OrderControlClass,
  OrderControlComponent,
);

export const OrderControl = withStyles(styles)(OredrWithObject);
