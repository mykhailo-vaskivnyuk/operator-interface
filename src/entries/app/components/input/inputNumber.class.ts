import { Input, IInput } from './input.class';
import { MessageCode } from '../../assets/data/messages.data';
import { IServices } from '../services/Services';

export interface IInputNumber extends IInput<number, number> {
  getValue: () => number;
}

export class InputNumber extends Input<number, number> implements IInputNumber {
  private _numberFormatter: { format: (value: number) => string };

  private _fractionDigits = 0;

  constructor(props: { services: IServices; fractionDigits: number }) {
    super(props);
    this._fractionDigits = props.fractionDigits;
    this._numberFormatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: this._fractionDigits,
    });
  }

  getValue(): number {
    return Number(this.value) / 10 ** this._fractionDigits;
  }

  getValueHTML(): string {
    return this._numberFormatter.format(this.getValue());
  }

  protected _onChange(): void {
    if (!this.value || String(this.getValue() * 10 ** this._fractionDigits) === this.value) {
      super._onChange();
      return;
    }
    this._throwMessage(MessageCode.INTERNAL_ERROR, 'НЕДОПУСТИМЕ ЗНАЧЕННЯ!');
  }
}

export * from './input.class';
