import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './orderItems.styles';
import { useOrderItems } from './orderItems.hook';

type Props = {
  onSelect: (index: number | null) => void;
} & WithStyles;

function OrderItemsComponent({ classes, onSelect }: Props) {
  const { items, onClick } = useOrderItems(onSelect);

  return (
    <div className={classes.wrapper} onClick={onClick} aria-hidden>
      <ul>{items}</ul>
    </div>
  );
}

export const OrderItems = withStyles(styles)(OrderItemsComponent);
