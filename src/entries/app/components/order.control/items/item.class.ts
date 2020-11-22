import { ItemType, IItem } from '../../../assets/types/Item.types';

export class Item implements IItem {
  constructor(
    public id = '', // "5dd75571-995a-099a-e1f8-bd7827b50976",
    public plu = 0, // 5842
    public searchIndex = '', // "Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
    public price = 0, // 15.2,
    public type = ItemType.WEIGHT, // "weighed",
    public defaults = {
      tara: 0, // 0,
      pieces_per_package: 0, // 0
    },
    public lifetime = {
      shelf_life_1: 0, // 0
    },
    public texts = {
      article: 0, // "34583",
      shop: 'Сильпо Винница', // "Сильпо Винница",
      short_title: '', // "Печiнка свиняча (Сир",
      full_title: '', // "Печінка свиняча (Сиров)"
    },
  ) {}
}

/*
export class ItemData implements IItemData {
    public tab: { id: number };
    public id: string;

    constructor(
        public data: IItem,
        tabNumber: number,
        public quantity: number = 0,
        public created: string = Date(),
    ) {
        this.tab = {
            id: tabNumber,
        };
        this.id = data.id;
    }
}
*/

/*
export class ItemAmount implements IItemAmount{
    // weights?: number;
    // quantity?: number;

    constructor(
        public item: IItemData,
        public sum: number = 0,
        // amount: number = 0,
        ) {
        // if (item.type === ItemType.WEIGHT)
        //     this.weights = amount;
        // else this.quantity = amount;
    }
}
*/

/*
[{
    "id":"5dd75571-995a-099a-e1f8-bd7827b50976",
    "plu":5842,
    "searchIndex":"Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
    "price":15.2,
    "type":"weighed",
    "defaults":{
        "tara":0,
        "pieces_per_package":0
    },
    "lifetime":{
        "shelf_life_1":0
    },
    "texts":{
        "article":"34583",
        "shop":"Сильпо Винница",
        "short_title":"Печiнка свиняча (Сир",
        "full_title":"Печінка свиняча (Сиров)"
    }
}]
*/
