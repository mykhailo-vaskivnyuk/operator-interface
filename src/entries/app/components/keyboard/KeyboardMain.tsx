import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './keyboardMain.styles';
import { useKeyboardMain } from './keyboardMain.hook';

function KeyboardMainComponent({ classes }: WithStyles) {
  const {
    lang,
    onClick,
    KeyboardLayoutEN,
    KeyboardLayoutUA,
    KeyboardLayoutNUMS,
    KeyboardLayoutFUNC,
  } = useKeyboardMain();

  return (
    <div className={classes.wrapper} onClick={onClick} aria-hidden>
      <div className="letters">
        {lang === 'UA' && KeyboardLayoutUA}
        {lang === 'EN' && KeyboardLayoutEN}
      </div>
      <div className="nums">{KeyboardLayoutNUMS}</div>
      <div className="func">{KeyboardLayoutFUNC}</div>
    </div>
  );
}

export const KeyboardMain = withStyles(styles)(KeyboardMainComponent);
