import React, { ReactElement } from 'react';
import { IDifferentKeys, IKeyAttr } from '../../../assets/types/keyboard.types';
import { ISizeOfElements, toUnits } from '../../../assets/helpers/keyboard.helpers';

interface Props {
  keyboardSet: string[];
  differentKeys: IDifferentKeys;
  sizeOfElements: ISizeOfElements;
}

export function KeyboardKeys({
  keyboardSet,
  differentKeys,
  sizeOfElements,
}: Props): ReactElement[] {
  const j = 0;
  const keys = keyboardSet.map((key, i) => {
    const diffKey = differentKeys[key];
    let style = {};
    let attr: IKeyAttr = { 'data-key': key };
    let content: string | ReactElement = key;

    if (diffKey) {
      if (diffKey.width) {
        const { keyWidth, keySpace } = sizeOfElements;
        const width = diffKey.width * (keyWidth + keySpace) - keySpace;
        if (width) style = { width: toUnits(width), ...style };
      }
      style = diffKey.attr ? { ...style, ...diffKey.attr.style } : style;
      attr = diffKey.attr || attr;
      content = diffKey.content || key;
    }

    return (
      <div
        className="key"
        key={`${j + i}`}
        style={style}
        data-next-lang={attr['data-next-lang']}
        data-key={attr['data-key']}
        onClick={attr.onClick}
        aria-hidden
      >
        {content}
      </div>
    );
  });

  return keys;
}
