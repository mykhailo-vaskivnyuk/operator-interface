import { IKeyboardOptions } from '../types/keyboard.types';

export interface ISizeOfElements {
  keyWidth: number;
  keyHeight: number;
  keySpace: number;
}

export interface ISizeOfElementsInUnits {
  keyWidth: string;
  keyHeight: string;
  keySpace: string;
}

export function toUnits(value: number, unit: 'px' | '%' = '%'): string {
  return `${value}${unit}`;
}

export function getSizeOfElements(options: IKeyboardOptions): ISizeOfElements {
  const { keyboardSet, differentKeys, keyCountByRow, k1, k2, k3 } = options;
  const rowCount = keyCountByRow.length;
  const keyHeight = (100 / rowCount) * k3;

  /* x => keyWidth, k1 => keySpace/keyWidth, n => keyCountInMaxRowWithAdditionalWidths
  |  x * n + (x * k1) * (n - 1) = 100
  |  x * n + x * k1 * n - x * k1 = 100
  |  x * (n + k1 * n - k1) = 100
  |  x * (n * (1 + k1) - k1) = 100
  |  x = 100 / (n * (1 + k1) - k1) */

  const copyKeyboardSet = [...keyboardSet];
  const keyCountByRowAdditional: number[] = keyCountByRow.map((count) =>
    copyKeyboardSet
      .splice(0, count)
      .map((key): number => {
        if (differentKeys[key]) {
          const diffKey = differentKeys[key];
          if (diffKey.width) return diffKey.width;
        }
        return 1;
      })
      .reduce((r, width) => r + width, 0),
  );

  const maxCountByRaw = Math.max(...keyCountByRowAdditional);
  const width = 100 / (maxCountByRaw * (1 + k1) - k1);
  const keyWidth = Math.round(width);
  const keySpace = Math.round(width * k1 * k2);

  return {
    keyWidth,
    keyHeight,
    keySpace,
  };
}

export function getSizeOfElementsInUnits(sizeOfElements: ISizeOfElements): ISizeOfElementsInUnits {
  const sizeInUnits = {
    keyWidth: toUnits(sizeOfElements.keyWidth),
    keyHeight: toUnits(sizeOfElements.keyHeight),
    keySpace: toUnits(sizeOfElements.keySpace),
  };

  return sizeInUnits;
}
