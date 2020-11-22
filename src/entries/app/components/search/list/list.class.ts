import { IItem } from '../../../assets/types/Item.types';
import _itemsData from '../../../assets/data/items.json';
import { IObject } from '../../../assets/types/objects.types';
import { getItemsBySearchIndex } from '../../../assets/helpers/requests';
import { config } from '../../../assets/data/config';

export type IStateList = IList;

export interface IList extends IObject<IStateList> {
  setFilter: (filter: string) => void;
  getItems: () => IItem[] | null;
  items: IItem[] | null;
  filter: string;
}

export class List implements IList {
  items: IItem[] | null = null;

  filter = '';

  private _itemsData: IItem[];

  private _callbackOnChange?: () => void;

  constructor() {
    this._itemsData = (_itemsData as unknown) as IItem[];
    this.getItems = this.getItems.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(filter: string): void {
    this.filter = filter;
    if (!filter) {
      this.items = null;
      this._onChange();
    } else {
      this._search(filter).then((result) => {
        if (this.filter === filter && result) this.items = result;
        this._onChange();
      });
    }
  }

  getItems(): IItem[] | null {
    return this.items;
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  getStateObject(): IStateList {
    return this;
  }

  private _onChange() {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  private _staticSearch(filter: string): IItem[] {
    return this._itemsData.filter(
      (item) =>
        item.searchIndex.toUpperCase().includes(filter) || String(item.plu).includes(filter),
    );
  }

  private _search(filter: string) {
    if (config.serverItems) {
      return getItemsBySearchIndex(filter).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        return this._staticSearch(filter);
      });
    }
    return Promise.resolve(this._staticSearch(filter));
  }

  off(): void {
    this._callbackOnChange = undefined;
  }
}

export const ListClass = List;
