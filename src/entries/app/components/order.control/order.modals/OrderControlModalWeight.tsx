import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { styles } from './orderControlModalWeight.styles';

function OrderControlModalWeightComponent({ classes }: WithStyles) {
  const { t } = useTranslation();
  return <div className={classes.title}>{t('Зніміть товар з вагів!')}</div>;
}

export const OrderControlModalWeight = withStyles(styles)(OrderControlModalWeightComponent);
