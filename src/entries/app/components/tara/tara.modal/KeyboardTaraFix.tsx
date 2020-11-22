import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './keyboardTaraFix.styles';
import { KeyboardLayoutOptionsTaraFIX } from '../../keyboard/keyboard.elements/KeyboardOptions';
import { Keyboard } from '../../keyboard/keyboard.class';
import { KeyboardLayout } from '../../keyboard/keyboard.elements/KeyboardLayout';

const getMethods = () => {
  const keyboard = Keyboard.getInstance();
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset.key;
    if (key) {
      keyboard.onClick('CLEAR');
      keyboard.onClick(key);
      keyboard.onClick('ENTER');
    }
  };

  return onClick;
};

function KeyboardTaraFixComponent({ classes }: WithStyles) {
  const [onClick] = useState(getMethods);

  return (
    <div className={classes.wrapper} onClick={onClick} aria-hidden>
      <KeyboardLayout options={KeyboardLayoutOptionsTaraFIX} />
    </div>
  );
}

export const KeyboardTaraFix = withStyles(styles)(KeyboardTaraFixComponent);
