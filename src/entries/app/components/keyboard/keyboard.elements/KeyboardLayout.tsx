import React, { FunctionComponent } from 'react';
import {
  getSizeOfElements,
  getSizeOfElementsInUnits,
} from '../../../assets/helpers/keyboard.helpers';
import { IKeyboardOptions } from '../../../assets/types/keyboard.types';
import { useBaseStyles } from './keyboardStyles.styles';
import { KeyboardKeys } from './KeyboardKeys';

export interface IKeyboardLayoutProps {
  options: IKeyboardOptions;
}

export type TLayout = FunctionComponent<IKeyboardLayoutProps>;

export const KeyboardLayout: TLayout = ({ options }: IKeyboardLayoutProps) => {
  const sizeOfElements = getSizeOfElements(options);
  const sizeOfElementsInUnits = getSizeOfElementsInUnits(sizeOfElements);
  const { keyCountByRow, keyboardSet, differentKeys, useStyles } = options;
  const keys = KeyboardKeys({ keyboardSet, differentKeys, sizeOfElements });

  const j = 0;
  const rows = keyCountByRow.map((count, i) => (
    <div className={`row-${i + 1}`} key={`${j + i}`}>
      {keys.splice(0, count)}
    </div>
  ));

  const classesAdditional = useStyles();
  const classes = useBaseStyles(
    Object.assign(sizeOfElementsInUnits, { classes: classesAdditional }),
  );

  return <div className={classes.layout}>{rows}</div>;
};
