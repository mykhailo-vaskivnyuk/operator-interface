import React, { useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { styles } from './orderInfo.styles';
import { OrderControlContext } from '../../../assets/data/contexts';
import { numberToCurrency } from '../../../assets/helpers/helpers';

type Props = {
  onClick: () => void;
} & WithStyles;

function OrderInfoComponent({ classes, onClick }: Props) {
  const { isSelected, total } = useContext(OrderControlContext);

  return (
    <div className={classes.wrapper}>
      {isSelected ? (
        <button type="button" className="delete" onClick={onClick}>
          <DeleteForeverIcon />
        </button>
      ) : (
        <div className="total">{numberToCurrency(total)}</div>
      )}
    </div>
  );
}

export const OrderInfo = withStyles(styles)(OrderInfoComponent);
