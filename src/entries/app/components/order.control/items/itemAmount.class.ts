import { IItemAmount, IItemData } from '../../../assets/types/Item.types';

export class ItemAmount implements IItemAmount {
  constructor(
    public item: IItemData,
    public sum: number = 0, // amount: number = 0,
  ) {}
}
