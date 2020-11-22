import { Keyboard, IKeyboard, TInput } from './keyboard.class';

export interface IActiveInputService {
  setActiveInput: (input: TInput | null) => void;
  delActiveInput: (input: TInput) => void;
  ifActiveInput: (input: TInput) => boolean;
}

export class ActiveInputServiceClass {
  private _keyboard: IKeyboard;

  private _activeInput: TInput | null = null;

  private _inputs: Set<TInput> = new Set();

  constructor() {
    this._keyboard = Keyboard.getInstance();
  }

  setActiveInput(input: TInput | null): void {
    if (input) this._inputs.add(input);
    const currentInput = this._activeInput;
    this._activeInput = input;
    currentInput?.blurFocus();
    this._keyboard.setActiveInput(input);
    this._activeInput?.setFocus();
  }

  delActiveInput(input: TInput): void {
    input.blurFocus();
    this._inputs.delete(input);
    const nextInput = this._inputs.values().next().value || null;
    this.setActiveInput(nextInput);
  }

  ifActiveInput(input: TInput): boolean {
    return this._activeInput === input;
  }
}

let instance: ActiveInputServiceClass;

export function getInstance(): ActiveInputServiceClass {
  if (!instance) {
    instance = new ActiveInputServiceClass();
  }
  return instance;
}

export const ActiveInputService = { getInstance };
