import { useState } from 'react';
import { IControlButton } from './controlButton.class';
import { ComponentState } from '../../../assets/helpers/connect.state.object';
import { IServices } from '../../services/Services';

export type PropsButton<B extends IControlButton> = {
  isActive?: boolean;
  onAction?: () => void;
  doAction?: (callback: () => void) => void;
  services?: IServices;
} & ComponentState<B>;

function getMethods({ state, onAction, doAction }: PropsButton<IControlButton>) {
  state.onAction(onAction);
  if (doAction) doAction(state.doAction);
  const onClick = state.doAction;
  const { setActive } = state;
  return { onClick, setActive };
}

interface IUseControlButton {
  onClick: () => void;
  setActive: (isActive?: boolean) => void;
}

export function useControlButton(props: PropsButton<IControlButton>): IUseControlButton {
  const [methods] = useState(() => getMethods(props));
  return methods;
}
