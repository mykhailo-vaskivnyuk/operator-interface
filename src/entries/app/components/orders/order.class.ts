import { IItemAmount } from '../../assets/types/Item.types';

export interface IOrder {
  orderNumber: number;
  tara: number;
  items: IItemAmount[];
  total: number;
}

export type IOrders = Map<number, IOrder>;

export class Order implements IOrder {
  public orderNumber: number;

  public tara = 0;

  public items: IItemAmount[] = [];

  public total = 0;

  constructor(number: number) {
    this.orderNumber = number;
  }
}
