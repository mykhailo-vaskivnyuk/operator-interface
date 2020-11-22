import { IInputNumber } from '../input/inputNumber.class';
import { IInputList } from '../input/inputList.class';

export type TInput = IInputList | IInputNumber;

export interface IKeyboard {
  onClick: (key: string) => void;
  setActiveInput: (input: TInput | null) => void;
}

class KeyboardClass implements IKeyboard {
  private _input?: TInput | null;

  onClick(key: string) {
    if (key.match(/^(\d+|[ |A-Z|А-Я|0-9|І|Ї|Є|Ё]|SPACE|CLEAR|BACKSPACE|ENTER)$/)) {
      this._input?.pressKey(key);
    }
  }

  setActiveInput(input: TInput | null) {
    this._input = input;
  }
}

let instance: KeyboardClass;

function getInstance(): IKeyboard {
  if (!instance) {
    instance = new KeyboardClass();
  }
  return instance;
}

export const Keyboard = { getInstance };
