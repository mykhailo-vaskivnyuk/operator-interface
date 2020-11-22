import { IItem, IItemData } from '../../../assets/types/Item.types';

export class ItemData implements IItemData {
  public tab: { id: number };

  // public id: string;

  constructor(
    public data: IItem,
    public id: string,
    tabNumber: number,
    public quantity: number = 0,
    public created: string = Date(),
  ) {
    this.tab = {
      id: tabNumber,
    };
    // this.id = data.id;
  }
}
