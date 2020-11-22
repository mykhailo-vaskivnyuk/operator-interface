import React, { useState, ReactElement, MouseEventHandler, MouseEvent, Dispatch } from 'react';
import { Keyboard } from './keyboard.class';
import { KeyboardLayout } from './keyboard.elements/KeyboardLayout';
import * as options from './keyboard.elements/KeyboardOptions';

const keyboard = Keyboard.getInstance();

const onClick = (event: MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLElement;
  const keyElem: HTMLElement | null = target.closest('[data-key]');
  const key = keyElem?.dataset.key;
  if (key) keyboard.onClick(key);
};

const KeyboardLayoutUA = <KeyboardLayout options={options.KeyboardLayoutOptionsUA} />;
const KeyboardLayoutEN = <KeyboardLayout options={options.KeyboardLayoutOptionsEN} />;
const KeyboardLayoutNUMS = <KeyboardLayout options={options.KeyboardLayoutOptionsNUMS} />;

const getDiffKeys = (changeLang: MouseEventHandler<HTMLDivElement>) => {
  return {
    LANG: {
      content: 'EN',
      attr: {
        onClick: changeLang,
        'data-next-lang': 'EN',
      },
    },
  };
};

const getKeyboardLayoutFUNC = (setLang: Dispatch<() => string>): ReactElement => {
  const changeLang = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const currentLang = target.dataset.nextLang;
    if (!currentLang) return;
    setLang(() => currentLang);
    const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
    target.innerHTML = nextLang;
    target.setAttribute('data-next-lang', nextLang);
  };

  const diffKeys = getDiffKeys(changeLang);

  Object.assign(options.KeyboardLayoutOptionsFUNC.differentKeys, diffKeys);
  const KeyboardLayoutFUNC = <KeyboardLayout options={options.KeyboardLayoutOptionsFUNC} />;

  return KeyboardLayoutFUNC;
};

interface IUseKeyboardMain {
  lang: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  KeyboardLayoutEN: ReactElement;
  KeyboardLayoutUA: ReactElement;
  KeyboardLayoutNUMS: ReactElement;
  KeyboardLayoutFUNC: ReactElement;
}

export const useKeyboardMain = (): IUseKeyboardMain => {
  const [lang, setLang] = useState('UA');
  const [KeyboardLayoutFUNC] = useState(() => getKeyboardLayoutFUNC(setLang));
  return {
    lang,
    onClick,
    KeyboardLayoutUA,
    KeyboardLayoutEN,
    KeyboardLayoutNUMS,
    KeyboardLayoutFUNC,
  };
};
