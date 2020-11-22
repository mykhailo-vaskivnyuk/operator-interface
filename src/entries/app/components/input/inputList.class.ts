import { Input, IInput } from './input.class';
import { IItem } from '../../assets/types/Item.types';

export interface IInputList extends IInput<string, IItem> {
  _onSelect: (item: IItem) => void;
}

export class InputList extends Input<string, IItem> implements IInputList {
  _onSelect(item: IItem): void {
    if (!item) return;
    if (this._callbackOnSelect) this._callbackOnSelect(item);
  }
}

export * from './input.class';
