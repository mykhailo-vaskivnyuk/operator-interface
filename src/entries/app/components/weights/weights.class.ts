import { IObject } from '../../assets/types/objects.types';

export interface IWeights extends IObject<IStateWeights> {
  readonly minWeight: number;
  readonly midweight: number;
  readonly maxWeight: number;
  readonly maxTara: number;
  readonly minWeightResolution: number;
  readonly maxWeightResolution: number;

  isStable: () => boolean;
  getSum: () => number;
  setTara: (value: number) => void;
  getTara: () => number;
  setPrice: (value: number | null, title?: string) => void;
  getWeight: () => number;
  off: (callback?: () => void) => void;

  __setWeight?: (value: number) => void;
  __getPrice?: () => number;
  __getTitle?: () => string;
  __setStable?: (isStable?: boolean) => void;
}

export interface IStateWeights {
  isStable: boolean;
  tara: number;
  weight: number;
  sum: number;

  price?: number;
  title?: string;
}

export class WeightsClass implements IWeights {
  protected _isStable = true;

  private _tara = 0;

  protected _price = 0;

  protected _weight = 0;

  protected _title = '';

  private _callbackOnChange: Set<() => void> = new Set();

  /* Характеристики вагів: */
  public readonly minWeight: number = 0.04;

  public readonly midweight: number = 6;

  public readonly maxWeight: number = 15;

  public readonly maxTara: number = 6;

  public readonly minWeightResolution: number = 0.002;

  public readonly maxWeightResolution: number = 0.005;

  constructor() {
    this.getStateObject = this.getStateObject.bind(this);
  }

  getStateObject(): IStateWeights {
    return {
      isStable: this.isStable(),
      tara: this.getTara(),
      weight: this.getWeight(),
      sum: this.getSum(),
    };
  }

  onChange(callback: () => void): void {
    this._callbackOnChange.add(callback);
  }

  isStable(): boolean {
    return this._isStable;
  }

  getSum(): number {
    return (this._weight - this._tara) * this._price;
  }

  setTara(value: number): void {
    this._tara = value;
    this._onChange();
  }

  getTara(): number {
    return this._tara;
  }

  setPrice(value: number | null, title = ''): void {
    this._price = value || 0;
    this._title = title || '';
    this._onChange();
  }

  getWeight(): number {
    return this._weight - this._tara;
  }

  off(callback?: () => void): void {
    if (callback) this._callbackOnChange.delete(callback);
  }

  protected _onChange(): void {
    [...this._callbackOnChange.values()].forEach((callback) => callback());
  }
}

let instance: IWeights;

function getInstance(): IWeights {
  if (!instance) {
    instance = new WeightsClass();
  }
  return instance;
}

export const Weights = { getInstance };
