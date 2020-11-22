import { WeightsClass, IWeights } from './weights.class';

export interface IWeightsTest extends IWeights {
  __setWeight: (value: number) => void;
  __getPrice: () => number;
  __getTitle: () => string;
  __setStable: (isStable?: boolean) => void;
}

class WeightsTest extends WeightsClass implements IWeightsTest {
  getStateObject() {
    return {
      ...super.getStateObject(),
      price: this.__getPrice(),
      title: this.__getTitle(),
    };
  }

  __setWeight(value: number) {
    this._weight = value;
    this._onChange();
  }

  __setStable(isStable?: boolean) {
    this._isStable = isStable === undefined ? !this._isStable : isStable;
    this._onChange();
  }

  __getPrice() {
    return this._price;
  }

  __getTitle() {
    return this._title;
  }
}

let instance: IWeightsTest;

function getInstance(): IWeightsTest {
  if (!instance) {
    instance = new WeightsTest();
  }
  return instance;
}

export const WeightsService = { getInstance };
