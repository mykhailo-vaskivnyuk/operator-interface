import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import {
  keyboardSetEN,
  keyboardSetUA,
  keyboardSetNUMS,
  keyboardSetFUNC,
  keyboardSetTaraFIX,
} from '../../../assets/data/keyboardSets';
import { IDifferentKeys, IKeyboardOptions } from '../../../assets/types/keyboard.types';

export const KeyboardLayoutOptionsEN: IKeyboardOptions = {
  keyboardSet: keyboardSetEN.setKeys,
  keyCountByRow: [10, 9, 8],
  k1: 0.7,
  k2: 0.55,
  k3: 0.85,
  differentKeys: {
    SPACE: {
      width: 3,
      content: ' ',
    },
  },
  useStyles: () => ({}),
};

export const KeyboardLayoutOptionsUA: IKeyboardOptions = {
  keyboardSet: keyboardSetUA.setKeys,
  keyCountByRow: [12, 12, 10],
  k1: 0.4,
  k2: 1,
  k3: 0.85,
  differentKeys: {
    SPACE: {
      width: 3,
      content: ' ',
    },
  },
  useStyles: () => ({}),
};

export const KeyboardLayoutOptionsNUMS: IKeyboardOptions = {
  keyboardSet: keyboardSetNUMS.setKeys,
  keyCountByRow: [3, 3, 3, 1],
  k1: 0.2,
  k2: 1,
  k3: 0.9,
  differentKeys: {
    '0': {
      width: 3,
    },
  },
  useStyles: () => ({}),
};

let keyboardSet = [...keyboardSetFUNC.setKeys];
keyboardSet.splice(2, 1);
keyboardSet.push('LANG');

export const KeyboardLayoutOptionsFUNC: IKeyboardOptions = {
  keyboardSet,
  keyCountByRow: [1, 1, 1],
  k1: 0.4,
  k2: 1,
  k3: 0.9,
  differentKeys: {
    CLEAR: {
      content: 'CLEAR',
    },
    BACKSPACE: {
      content: <span>&#8592;</span>,
    },
    LANG: {
      content: 'EN',
    },
  },
  useStyles: () => ({}),
};

export const KeyboardLayoutOptionsTaraFIX: IKeyboardOptions = {
  keyboardSet: keyboardSetTaraFIX.setKeys,
  keyCountByRow: [3, 3, 3],
  k1: 0.3,
  k2: 1,
  k3: 0.9,
  differentKeys: keyboardSetTaraFIX.setKeys.reduce((r: IDifferentKeys, key: string) => {
    return Object.assign(r, { [key]: { content: `${key} гр` } });
  }, {}),
  useStyles: makeStyles(
    createStyles({
      layout: {
        '& .key': {
          borderWidth: '2px',
          borderRadius: '0.7rem',
          fontSize: '1.2rem',
        },
      },
    }),
  ),
};

export const KeyboardLayoutOptionsDigitNUMS: IKeyboardOptions = {
  keyboardSet: keyboardSetNUMS.setKeys,
  keyCountByRow: [3, 3, 3, 1],
  k1: 0.2,
  k2: 1,
  k3: 0.8,
  differentKeys: {
    '0': {
      width: 3,
    },
  },
  useStyles: makeStyles(
    createStyles({
      layout: {
        '& .key': {
          borderWidth: '2px',
          borderRadius: '2rem',
          fontSize: '1.2rem',
        },
      },
    }),
  ),
};

keyboardSet = [...keyboardSetFUNC.setKeys];
keyboardSet.splice(0, 1);

export const KeyboardLayoutOptionsDigitFUNC: IKeyboardOptions = {
  keyboardSet,
  keyCountByRow: [1, 1],
  k1: 0,
  k2: 0,
  k3: 0.93,
  differentKeys: {
    BACKSPACE: {
      content: <span>&#8592;</span>,
    },
    ENTER: {
      content: <span>&#10003;</span>,
    },
  },
  useStyles: makeStyles((theme: Theme) =>
    createStyles({
      layout: {
        '& .key': {
          borderWidth: '2px',
          color: 'white',
          background: theme.palette.primary.main,
        },
      },
    }),
  ),
};

export * from '../../../assets/types/keyboard.types';
