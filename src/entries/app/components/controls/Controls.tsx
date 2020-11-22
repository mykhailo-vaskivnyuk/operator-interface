import React, { useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Buttons } from './ControlButtons';
import { styles } from './controls.styles';
import { OrdersControlContext } from '../../assets/data/contexts';
import { Services } from '../services/Services';

type Props = {
  callbacks: {
    deleteOrder: () => void;
    printOrder: () => void;
  };
} & WithStyles;

function ControlsComponent({ classes, callbacks }: Props) {
  const { printIsActive, closeIsActive, bindClose } = useContext(OrdersControlContext);
  return (
    <div className={classes.wrapper}>
      <Buttons.TaraButton services={Services} />
      <Buttons.PrintButton isActive={printIsActive} onAction={callbacks.printOrder} />
      <Buttons.CloseButton
        isActive={closeIsActive}
        onAction={callbacks.deleteOrder}
        doAction={bindClose}
      />
    </div>
  );
}

export const Controls = withStyles(styles)(ControlsComponent);
