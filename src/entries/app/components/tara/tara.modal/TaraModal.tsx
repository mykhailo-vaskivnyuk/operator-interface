import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles, useDigitDisplayStyles } from './taraModal.styles';
import { DigitDisplay } from '../../digit.display/DigitDisplay';
import { KeyboardTaraFix } from './KeyboardTaraFix';
import { ITaraButton } from '../taraButton.class';

type Props = {
  button: ITaraButton;
} & WithStyles;

function TaraModalComponent({ classes, button }: Props) {
  const { setAdditionalTara } = button;
  const classesDigitDisplay = useDigitDisplayStyles();
  return (
    <div className={classes.wrapper}>
      <DigitDisplay onSelect={setAdditionalTara} fractionDigits={3} classes={classesDigitDisplay} />
      <div className="keyboardTaraFix">
        <KeyboardTaraFix />
      </div>
    </div>
  );
}

export const TaraModal = withStyles(styles)(TaraModalComponent);
