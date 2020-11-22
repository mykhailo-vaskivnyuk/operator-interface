import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { styles } from './weightsDisplay.styles';
import { WeightsService } from './weightsTest.class';
import { IWeights } from './weights.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';
import { numberToFix2, numberToFix3 } from '../../assets/helpers/helpers';

type Props = WithStyles & ComponentState<IWeights>;

function WeightsDisplayComponent({ classes, state }: Props) {
  const { title, tara, weight, price, sum } = state.getStateObject();
  const { t } = useTranslation();

  return (
    <div className={`${classes.grid} border`}>
      <div className="title border">
        {t('Title')}
        <span className="val">{title}</span>
      </div>
      <div className="tara border">
        {t('Tara')}
        <div className="val">{numberToFix3(tara)}</div>
      </div>
      <div className="weight border">
        {t('Weight')}
        <div className="val">{numberToFix3(weight)}</div>
      </div>
      <div className="price border">
        {t('Price')}
        <div className="val">{price ? numberToFix2(price) : numberToFix2(0)}</div>
      </div>
      <div className="total border">
        {t('Total')}
        <div className="val">{numberToFix2(sum)}</div>
      </div>
    </div>
  );
}

const WeightsDisplaysWithObject = withState<IWeights, Props>(
  WeightsService,
  WeightsDisplayComponent,
);

export const WeightsDisplay = withStyles(styles)(WeightsDisplaysWithObject);
