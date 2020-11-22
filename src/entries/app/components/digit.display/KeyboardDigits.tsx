import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Keyboard } from '../keyboard/keyboard.class';
import { KeyboardLayout } from '../keyboard/keyboard.elements/KeyboardLayout';
import {
  KeyboardLayoutOptionsDigitNUMS,
  KeyboardLayoutOptionsDigitFUNC,
} from '../keyboard/keyboard.elements/KeyboardOptions';
import { styles } from './keyboardDigits.styles';

const keyboard = Keyboard.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement;
  const keyElem: HTMLElement | null = target.closest('[data-key]');
  const key = keyElem?.dataset.key;
  if (key) keyboard.onClick(key);
};

const KeyboardLayoutNUMS = <KeyboardLayout options={KeyboardLayoutOptionsDigitNUMS} />;

const KeyboardLayoutFUNC = <KeyboardLayout options={KeyboardLayoutOptionsDigitFUNC} />;

function KeyboardDigitsComponent({ classes }: WithStyles) {
  return (
    <div className={classes.wrapper} onClick={onClick} aria-hidden>
      <div className="nums">{KeyboardLayoutNUMS}</div>
      <div className="func">{KeyboardLayoutFUNC}</div>
    </div>
  );
}

export const KeyboardDigits = withStyles(styles)(KeyboardDigitsComponent);
