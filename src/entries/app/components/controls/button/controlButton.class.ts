import { State, Mode } from '../../../assets/types/types';
import { IObject } from '../../../assets/types/objects.types';

export interface IControlButton extends IObject<IStateControlButton> {
  onAction: (callback?: () => void) => void;
  setActive: (isActive?: boolean) => void;
  isActive: () => boolean;
  doAction: (confirm?: boolean) => void;
  getState: () => State;
  off?: () => void;
}

export interface IStateControlButton {
  mode: Mode;
  currentIsActive: boolean;
}

export class ControlButton implements IControlButton {
  protected _state: State = State.ENABLED;

  private _callbackOnAction?: () => void;

  private _callbackOnChange?: () => void;

  constructor() {
    this.getStateObject = this.getStateObject.bind(this);
    this.doAction = this.doAction.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  getStateObject(): IStateControlButton {
    return {
      mode: this.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON,
      currentIsActive: this.isActive(),
    };
  }

  onAction(callback?: () => void): void {
    this._callbackOnAction = callback;
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  setActive(isActive?: boolean): void {
    if (this._state === State.PENDING) return;
    if (isActive) this._state = State.ENABLED;
    else this._state = State.DISABLED;
    this._onChange();
  }

  isActive(): boolean {
    return this._state === State.ENABLED;
  }

  doAction(confirm?: boolean): void {
    if (this._state === State.PENDING) {
      this._state = State.ENABLED;
      this._onChange();
      if (confirm) this._onAction();
      return;
    }

    if (!this.isActive()) return;
    this._state = State.PENDING;
    this._onChange();
  }

  getState(): State {
    return this._state;
  }

  private _onAction() {
    if (this._callbackOnAction) this._callbackOnAction();
  }

  protected _onChange(): void {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  off(): void {
    this.onAction();
    this._callbackOnChange = undefined;
  }
}
