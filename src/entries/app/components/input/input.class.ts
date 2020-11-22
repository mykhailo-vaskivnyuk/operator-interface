import { IItem } from '../../assets/types/Item.types';
import { IMessage } from '../message/message.class';
import { MessageCode } from '../../assets/data/messages.data';
import { IServices } from '../services/Services';

import { IObject } from '../../assets/types/objects.types';

export type IStateInput<
  V extends string | number = string,
  S extends string | number | IItem = string
> = IInput<V, S>;

export interface IInput<
  V extends string | number = string,
  S extends string | number | IItem = string
> extends IObject<IStateInput<V, S>> {
  setFocus: () => void;
  blurFocus: () => void;
  pressKey: (key: string) => void;
  setValue: (value: string) => void;
  getValue: () => V;
  getValueHTML: () => string;
  bindSelect: (callback?: (value: S) => void) => void;
  ifFocus: () => boolean;
  _onSelect: (value: S) => void;
  value: string;
  isFocus: boolean;
}

export class Input<V extends string | number = string, S extends string | number | IItem = string>
  implements IInput<V, S> {
  value = '';

  protected _callbackOnChange?: () => void;

  protected _callbackOnSelect?: (value: S) => void;

  isFocus = false;

  private _message?: IMessage;

  constructor(props: { services: IServices }) {
    this.getStateObject = this.getStateObject.bind(this);
    this._onSelect = this._onSelect.bind(this);
    const { services } = props;
    this._message = services.MessageService;
  }

  getStateObject(): this {
    return this;
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  setFocus(): void {
    this.isFocus = true;
    this._onChange();
  }

  blurFocus(): void {
    this.isFocus = false;
    this._onChange();
  }

  pressKey(key: string): void {
    const currentValue = this.value;
    try {
      switch (key) {
        case 'SPACE':
          this._addSymbol(' ');
          break;
        case 'BACKSPACE':
          this._delSymbol();
          break;
        case 'CLEAR':
          this.setValue('');
          break;
        case 'ENTER':
          this._onSelect();
          break;
        default:
          this._addSymbol(key);
      }
    } catch (e) {
      this.value = currentValue;
      this._throwMessage(MessageCode.INTERNAL_ERROR, 'НЕДОПУСТИМИЙ СИМВОЛ!');
    }
  }

  protected _addSymbol(value: string): void {
    this.value += value.toUpperCase();
    this._onChange();
  }

  protected _delSymbol(): void {
    this.value = this.value.substring(0, this.value.length - 1);
    this._onChange();
  }

  setValue(value = ''): void {
    this.value = value;
    this._onChange();
  }

  getValue(): V {
    return this.value as V;
  }

  getValueHTML(): string {
    return ` ${this.getValue()}`.replace(/ /g, '&nbsp;');
  }

  bindMessage(message?: IMessage): void {
    this._message = message;
  }

  bindSelect(callback?: (value: S) => void): void {
    this._callbackOnSelect = callback;
  }

  ifFocus(): boolean {
    return this.isFocus;
  }

  protected _throwMessage(code: MessageCode, text?: string): void {
    this._message?.sendMessage(code, text);
  }

  protected _onChange(): void {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  _onSelect(value?: S): void {
    if (this._callbackOnSelect) {
      if (value) this._callbackOnSelect(value);
      else this._callbackOnSelect((this.getValue() as unknown) as S);
    }
  }

  off(): void {
    this.bindSelect();
    this._callbackOnChange = undefined;
    this._message = undefined;
  }
}
