import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { useStyles } from './display.styles';
import { ActiveInputService } from '../keyboard/activeInputService.class';
import { IServices } from '../services/Services';
import { InputNumber as InputClass, IStateInput } from '../input/inputNumber.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';

const getMethods = ({ state, onSelect }: Omit<PropsDisplay, 'services' | 'fractionDigits'>) => {
  state.bindSelect(onSelect);
  const activeInputService = ActiveInputService.getInstance();
  const attachInput = () => {
    activeInputService.setActiveInput(state);
    return () => activeInputService.delActiveInput(state);
  };
  return { attachInput, state };
};

export type PropsDisplay = {
  onSelect: (value: number) => void;
  services: IServices;
  fractionDigits: number;
} & ComponentState<IStateInput<number, number>>;

function DisplayComponent(props: Omit<PropsDisplay, 'services' | 'fractionDigits'>) {
  const [{ attachInput, state }] = useState(() => getMethods(props));
  useEffect(attachInput, [attachInput]);
  const classes = useStyles(props);
  const valueHTML = state.getValueHTML();
  return (
    <div className={classes.wrapper}>
      <div className="input">{valueHTML}</div>
    </div>
  );
}

export const Display = withState<IStateInput<number, number>, PropsDisplay>(
  InputClass,
  DisplayComponent,
);
