import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './main.styles';
import { WeightsDisplay } from '../weights/WeightsDisplay';
import { OrdersControl } from '../orders/OrdersControl';
import { KeyboardMain } from '../keyboard/KeyboardMain';

type Props = {
  maxOrdersCount: number;
} & WithStyles;

function MainComponent({ classes, maxOrdersCount }: Props) {
  return (
    <div className={classes.test_wrapper}>
      <div className={classes.wrapper}>
        <div className="weights">
          <WeightsDisplay />
        </div>
        <div className="orders">
          <OrdersControl maxOrdersCount={maxOrdersCount} />
        </div>
        <div className="keyboard">
          <KeyboardMain />
        </div>
        <div id="modal-root" />
      </div>
    </div>
  );
}

export const Main = withStyles(styles)(MainComponent);
