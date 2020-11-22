export enum ItemType {
  WEIGHT = 'weighed',
  PIECE = 'counted',
}

export interface IItem {
  id: string; // "5dd75571-995a-099a-e1f8-bd7827b50976",
  plu: number; // 5842
  searchIndex: string; // "Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
  price: number; // 15.2,
  type: ItemType; // "weighed",
  defaults: {
    tara: number; // 0,
    pieces_per_package: number; // 0
  };
  lifetime: {
    shelf_life_1: number; // 0
  };
  texts: {
    article: number; // "34583",
    shop: string; // "Сильпо Винница",
    short_title: string; // "Печiнка свиняча (Сир",
    full_title: string; // "Печінка свиняча (Сиров)"
  };
}

export interface ITab {
  id: number;
}

export interface IItemData {
  data: IItem;
  tab: ITab;
  id: string;
  quantity: number;
  created: string; // date
}

export interface IItemAmount {
  item: IItemData;
  sum: number;
}

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
