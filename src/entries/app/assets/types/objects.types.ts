export interface IObject<StateObject> {
  onChange: (callback: () => void) => void;
  getStateObject: () => StateObject;
  off?: (callback?: () => void) => void;
}

export type ComponentState<O> = { state: O };
