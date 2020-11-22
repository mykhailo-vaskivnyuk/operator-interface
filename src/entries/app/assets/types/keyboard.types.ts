import { ReactElement } from 'react';

export interface IDifferentKeys {
  [key: string]: {
    width?: number;
    content?: string | ReactElement;
    attr?: IKeyAttr;
  };
}

export interface IKeyAttr {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  'data-next-lang'?: string;
  'data-key'?: string;
  style?: Record<string, string>;
}

export interface IKeyboardOptions {
  keyboardSet: string[];
  keyCountByRow: number[]; // keyCountByRow = [9, 10, 8].length = keyboardSet.length
  differentKeys: IDifferentKeys;
  k1: number; // розрахункова відстань між кнопками (відносно ширини кнопки)
  k2: number; // фактична відстань між кнопками (відносно k1)
  k3: number; // висота кнопки (відносно висоти ряду)
  useStyles: () => Record<string, string>;
}
