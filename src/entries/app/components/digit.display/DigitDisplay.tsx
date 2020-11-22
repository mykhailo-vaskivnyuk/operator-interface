import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './DigitDisplay.styles';
import { Display } from './Display';
import { KeyboardDigits } from './KeyboardDigits';
import { Services } from '../services/Services';

type Props = {
  onSelect: (pieces: number) => void;
  fractionDigits: number;
} & WithStyles;

function DigitDisplayComponent({ classes, onSelect, fractionDigits }: Props) {
  return (
    <div className={classes.wrapper}>
      <div className="display">
        <Display onSelect={onSelect} services={Services} fractionDigits={fractionDigits} />
      </div>
      <div className="keyboardPieces">
        <KeyboardDigits />
      </div>
    </div>
  );
}

export const DigitDisplay = withStyles(styles)(DigitDisplayComponent);
