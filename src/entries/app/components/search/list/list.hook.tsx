import React, { useState, useEffect, ReactElement, MouseEvent, MouseEventHandler } from 'react';
import { WithStyles } from '@material-ui/core/styles';
import { ListRowProps, ListRowRenderer } from 'react-virtualized';
import { IList } from './list.class';
import { IItem } from '../../../assets/types/Item.types';
import { ComponentState } from '../../../assets/helpers/connect.state.object';
import { numberToCurrency } from '../../../assets/helpers/helpers';

export type PropsList = {
  filter: string;
  onSelect: (item: IItem) => void;
} & WithStyles &
  ComponentState<IList>;

const createCallbacks = (props: PropsList) => {
  const { state, onSelect } = props;
  const onItemSelect = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset.itemIndex;
    const { items } = state;
    if (items && itemIndex) onSelect(items[+itemIndex]);
  };

  const itemRenderer = ({ key, index, style }: ListRowProps): ReactElement => {
    const { items } = state;
    if (!items) return <div />;
    const { plu, texts, price } = items[index];
    return (
      <div className="li" key={key} data-item-index={index} style={style}>
        <span>{plu}</span>
        <span>{texts.full_title}</span>
        <span>{numberToCurrency(price)}</span>
      </div>
    );
  };

  return { onItemSelect, itemRenderer };
};

interface IUseList {
  items: IItem[] | null;
  onItemSelect: MouseEventHandler<HTMLDivElement>;
  itemRenderer: ListRowRenderer;
}

export const useList = (props: PropsList): IUseList => {
  const { filter, state } = props;
  const { items, setFilter } = state;
  const [{ onItemSelect, itemRenderer }] = useState(() => createCallbacks(props));
  useEffect(() => setFilter(filter), [setFilter, filter]);
  return { items, onItemSelect, itemRenderer };
};
