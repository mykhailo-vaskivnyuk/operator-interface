import { State } from '../../assets/types/types';
import { IWeights } from '../weights/weights.class';
import { ControlButton, IControlButton } from '../controls/button/controlButton.class';
import { IServices } from '../services/Services';

export interface ITaraButton extends IControlButton {
  setAdditionalTara: (value: number) => void;
}

export class TaraButton extends ControlButton implements ITaraButton {
  private _tara = 0;

  private _weights?: IWeights;

  constructor(props?: { services: IServices }) {
    super();
    this._onWeightsChange = this._onWeightsChange.bind(this);
    this.setAdditionalTara = this.setAdditionalTara.bind(this);
    if (props && props.services) {
      const { services } = props;
      this._bindWeights(services.WeightsService);
    }
  }

  private _bindWeights(weights?: IWeights): void {
    if (this._weights === weights) return;
    if (this._weights?.off) {
      this._weights.off(this._onWeightsChange);
    }
    this._weights = weights;
    this._weights?.onChange(this._onWeightsChange);
  }

  off(): void {
    super.off();
    this._bindWeights();
  }

  private _setState() {
    if (this._state === State.PENDING) return;
    if (this._weights?.isStable()) this._state = State.ENABLED;
    else this._state = State.DISABLED;
  }

  private _onWeightsChange(): void {
    this._setState();
    this._onChange();
  }

  private _setTara(value: number) {
    const currentTara = this._weights?.getTara() || 0;
    this._weights?.setTara(currentTara + value);
  }

  setAdditionalTara(value: number): void {
    this._tara = value;
    this.doAction();
  }

  doAction(): void {
    if (this._state === State.PENDING) {
      this._state = State.ENABLED;
      this._onChange();
      this._setTara(this._tara);
      return;
    }

    if (!this._weights?.isStable) {
      return;
    }

    if (this._weights.getWeight() !== 0) {
      this._setTara(this._weights.getWeight());
      return;
    }

    if (!this.isActive()) return;
    this._state = State.PENDING;
    this._onChange();
  }

  setActive(): void {
    this._onWeightsChange();
  }
}
