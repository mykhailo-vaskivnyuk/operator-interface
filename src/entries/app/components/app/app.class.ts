import { ThemesNames } from '../../assets/themes/themes';
import { IConfig, config, IEnvironment } from '../../assets/data/config';
import { TAppState } from '../../assets/types/types';
import { IObject } from '../../assets/types/objects.types';

export interface IApp extends IObject<IStateApp> {
  setEnvironment: (rect: DOMRect) => void;
  getEnvironment: () => IEnvironment;
  getState: () => TAppState;
  getConfig: () => IConfig;
  __changeTheme?: () => void;
  _state: TAppState;
}

export interface IStateApp {
  state: TAppState;
  themeName: ThemesNames;
  maxOrdersCount: number;
  setEnvironment: (rect: DOMRect) => void;
}

export class App implements IApp {
  public _state: TAppState = TAppState.INIT;

  protected _config: IConfig;

  private _env: IEnvironment = {} as IEnvironment;

  private _callbackOnChange?: () => void;

  constructor() {
    this._config = config;
    this.setEnvironment = this.setEnvironment.bind(this);
    this.getStateObject = this.getStateObject.bind(this);
  }

  getStateObject(): IStateApp {
    return {
      state: this.getState(),
      themeName: this.getConfig().themeName,
      maxOrdersCount: this.getConfig().maxOrdersCount,
      setEnvironment: (rect: DOMRect) => this.setEnvironment(rect),
    };
  }

  setEnvironment(rect: DOMRect): void {
    this._env = {
      displayWidth: rect.height,
      displayHeight: rect.width,
    };
    this._state = TAppState.RUN;
    this._onChange();
  }

  getEnvironment(): IEnvironment {
    return this._env;
  }

  getState(): TAppState {
    return this._state;
  }

  getConfig(): IConfig {
    return this._config;
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  protected _onChange(): void {
    const callback = this._callbackOnChange;
    if (callback) {
      setTimeout(() => callback(), 1000);
    }
  }

  off(): void {
    this._callbackOnChange = undefined;
  }
}

let instance: App;

function getInstance(): IApp {
  if (!instance) {
    instance = new App();
  }
  return instance;
}

export * from '../../assets/types/types';

export default { getInstance };
