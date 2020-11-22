import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { useStyles } from './search.styles';
import { ActiveInputService } from '../keyboard/activeInputService.class';
import { IServices } from '../services/Services';
import { IItem } from '../../assets/types/Item.types';
import { InputList as InputClass, IStateInput } from '../input/inputList.class';
import { IOrderControl } from '../order.control/orderControl.class';
import { ListStyled } from './list/List';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';

const getMethods = ({ state, onSelect, bindReset }: Omit<PropsSearch, 'services'>) => {
  state.bindSelect(onSelect);
  bindReset(() => state.setValue(''));
  const onListSelect = state._onSelect;
  const activeInputService = ActiveInputService.getInstance();
  const attachInput = () => {
    activeInputService.setActiveInput(state);
    return () => activeInputService.delActiveInput(state);
  };
  return { onListSelect, attachInput, state };
};

export type PropsSearch = {
  onSelect: IOrderControl['addItem'];
  bindReset: IOrderControl['bindReset'];
  services: IServices;
} & ComponentState<IStateInput<string, IItem>>;

function SearchComponent(props: Omit<PropsSearch, 'services'>) {
  const [{ attachInput, onListSelect, state }] = useState(() => getMethods(props));
  useEffect(attachInput, [attachInput]);
  const classes = useStyles(props);
  const { value } = state;
  return (
    <div className={classes.wrapper}>
      <div className="input">&nbsp;{value}</div>
      <ListStyled filter={value} onSelect={onListSelect} />
    </div>
  );
}

export const Search = withState<IStateInput<string, IItem>, PropsSearch>(
  InputClass,
  SearchComponent,
);
