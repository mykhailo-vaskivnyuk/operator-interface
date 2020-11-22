import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderControlContext } from '../../../assets/data/contexts';
import { IStateOrder } from '../orderControl.class';
import { ItemType, IItemData, IItemAmount } from '../../../assets/types/Item.types';
import { numberToCurrency, numberToFix3 } from '../../../assets/helpers/helpers';

export const selectItem = (
  event: React.MouseEvent<HTMLDivElement>,
  select: (index: number) => void,
): void => {
  const target = event.target as HTMLElement;
  const itemElem: HTMLElement | null = target.closest('[data-item-index]');
  const itemIndex = itemElem?.dataset.itemIndex;
  if (itemIndex && +itemIndex >= 0) select(+itemIndex);
};

const numberToQuantity = (item: IItemData, t: ReturnType<typeof useTranslation>['t']) =>
  item.data.type === ItemType.WEIGHT
    ? `${numberToFix3(item.quantity)} ${t('kg')}`
    : `${item.quantity} ${t('pc')}`;

const getItems = (
  orderItems: IItemAmount[],
  selectedItem: IItemAmount | null,
  t: ReturnType<typeof useTranslation>['t'],
) =>
  orderItems.map((itemAmount, i) => {
    const { item, sum } = itemAmount;
    const { plu, texts, price } = item.data;
    const className = selectedItem === itemAmount ? 'selected' : '';
    return (
      <li key={item.id} data-item-index={i} className={className}>
        <span>{plu}</span>
        <span>{texts.full_title}</span>
        <span>{numberToCurrency(price)}</span>
        <span>{numberToQuantity(item, t)}</span>
        <span>{numberToCurrency(sum)}</span>
      </li>
    );
  });

interface IUseOrderItemds {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  items: React.ReactElement[];
}

export function useOrderItems(onSelect: (index: number | null) => void): IUseOrderItemds {
  const { orderItems, selectedItem }: IStateOrder = useContext(OrderControlContext);
  const { t } = useTranslation();
  const items = getItems(orderItems, selectedItem, t);
  const onClick = useCallback((event) => selectItem(event, onSelect), [onSelect]);
  return { items, onClick };
}
