import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './printModal.styles';
import { IControlButton } from '../button/controlButton.class';

interface Props {
  title?: string;
  confirm?: string;
  reject?: string;
  button: IControlButton;
}

function PrintModalComponent({ title, confirm, reject, classes, button }: Props & WithStyles) {
  const onClickTrue = useCallback(() => button.doAction(true), [button]);
  const onClickFalse = useCallback(() => button.doAction(false), [button]);
  return (
    <div className={classes.wrapper}>
      <div className="title">{title}</div>
      <div className="controls">
        <button type="button" className="btn" onClick={onClickTrue}>
          {confirm}
        </button>
        <button type="button" className="btn" onClick={onClickFalse}>
          {reject}
        </button>
      </div>
    </div>
  );
}

PrintModalComponent.defaultProps = {
  title: 'Роздрукувати замовлення?',
  confirm: 'ТАК',
  reject: 'НІ',
};

export const PrintModal = withStyles(styles)(PrintModalComponent);
