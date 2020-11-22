export interface IKeyboardSet {
  setName: string;
  setKeys: string[];
}

export const keyboardSetUA: IKeyboardSet = {
  setName: 'UA',
  setKeys: [
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ї',
    'ф',
    'і',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'ж',
    'є',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
    'ґ',
    'space',
  ].map((l) => l.toUpperCase()),
};

export const keyboardSetEN: IKeyboardSet = {
  setName: 'EN',
  setKeys: [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    'space',
  ].map((l) => l.toUpperCase()),
};

export const keyboardSetNUMS: IKeyboardSet = {
  setName: 'NUMS',
  setKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
};

export const keyboardSetFUNC: IKeyboardSet = {
  setName: 'FUNC',
  setKeys: ['CLEAR', 'BACKSPACE', 'ENTER'],
};

export const keyboardSetTaraFIX: IKeyboardSet = {
  setName: 'TARA',
  setKeys: ['4', '6', '8', '10', '12', '14', '16', '18', '20'],
};
