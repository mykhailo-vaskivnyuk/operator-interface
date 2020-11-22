import { IItem, IItemData, ITab } from '../types/Item.types';
import { config } from '../data/config';

const { hostItems, hostOrders } = config;

const allItems = `${hostItems}:4444/list`;
const itemsBySearchIndex = `${hostItems}:4444/list?searchIndex=`;
const itemById = `${hostItems}:4444/search?id=`;

const allTabs = `${hostOrders}:4445/tab/list`;
const tabItems = `${hostOrders}:4445/tab/`;
const createTab = `${hostOrders}:4445/create-tab`;
const deleteTab = `${hostOrders}:4445/delete-tab`;

const createRow = `${hostOrders}:4445/create-order-row`;
const updateRow = `${hostOrders}:4445/update-order-row`;
const deleteRow = `${hostOrders}:4445/delete-order-row`;

function request(url: string, options?: RequestInit, toJson = true) {
  return fetch(url, options).then((response) => {
    if (response.ok) {
      if (toJson) return response.json();
      return response.text();
    }
    throw new Error('BAD RESPONSE');
  });
}

function getAllItems(): Promise<IItem[]> {
  return request(allItems);
}

function getItemsBySearchIndex(searchIndex: string): Promise<IItem[]> {
  return request(`${itemsBySearchIndex}${searchIndex}`);
}

function getItemById(id: string): Promise<IItem> {
  return request(`${itemById}${id}`);
}

function getAllTabs(): Promise<ITab[]> {
  return request(allTabs);
}

function getTabItems(
  tabNumber: number,
): Promise<{ tabNumber: number; tabItems: Omit<IItemData, 'tab'>[] }> {
  return request(`${tabItems}${tabNumber}`).then((items: IItemData[]) => ({
    tabNumber,
    tabItems: items,
  }));
}

function postCreateTab(): Promise<{ id: ITab }> {
  return request(createTab, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '',
  });
}

function delTabByNumber(tabNumber: number): Promise<{ result: unknown; tabNumber: number }> {
  const body = {
    id: tabNumber,
  };
  return request(deleteTab, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((result) => ({ result, tabNumber }));
}

function createOrderRow(tabNumber: number, item: IItem): Promise<IItemData> {
  const body = JSON.stringify({
    id: tabNumber,
    data: item,
  });
  return request(createRow, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

function updateOrderRow(data: IItemData): Promise<IItemData> {
  return request(updateRow, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  }).then(() => data);
}

function deleteOrderRow(data: IItemData): Promise<number> {
  const tabNumber = data.tab.id;
  return request(
    deleteRow,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
    false,
  ).then(() => tabNumber);
}

/* -------------- BUFFER TEST -------------------------- */

function readChunks(response: Response) {
  if (!response || !response.body) return;
  const reader = response.body.getReader();

  function readChunk() {
    reader.read().then(({ done, value }) => {
      if (done || !value) return;
      const buffer = Buffer.from(value);
      // eslint-disable-next-line no-console
      console.log(buffer.toJSON());
    });
  }

  readChunk();
}

function requestTest(url: string) {
  return fetch(url).then((response) => {
    if (response.ok) {
      readChunks(response);
    }
    throw new Error('BAD RESPONSE');
  });
}

function readAllItems(searchIndex: string): void {
  requestTest(`${itemsBySearchIndex}${searchIndex}`);
}

/* ----------------------------------------------------- */

export {
  getAllItems,
  readAllItems, // test
  getItemsBySearchIndex,
  getItemById,
  getAllTabs,
  getTabItems,
  postCreateTab,
  delTabByNumber,
  createOrderRow,
  updateOrderRow,
  deleteOrderRow,
};

/* post create-order-row
{
    "id": 1,
    "data": {"id":"734ae666-ad1c-2440-7d16-9d22debf1c99","plu":903,"searchIndex":"Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые","price":29.99,"type":"weighed","defaults":{"tara":0,"pieces_per_package":0},"lifetime":{"shelf_life_1":0},"texts":{"article":"492273","shop":"Сильпо Винница","short_title":"ГрибиКгГливиЖовтi","full_title":"Гриби Гливи жовті"}}

}
*/

/* response on create-order-row and patch update-order-row and delete delete-order-row
{
    "data": {
        "id": "734ae666-ad1c-2440-7d16-9d22debf1c99",
        "plu": 903,
        "searchIndex": "Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые",
        "price": 29.99,
        "type": "weighed",
        "defaults": {
            "tara": 0,
            "pieces_per_package": 0
        },
        "lifetime": {
            "shelf_life_1": 0
        },
        "texts": {
            "article": "492273",
            "shop": "Сильпо Винница",
            "short_title": "ГрибиКгГливиЖовтi",
            "full_title": "Гриби Гливи жовті"
        }
    },
    "tab": {
        "id": 1
    },
    "id": "f04c2ded-e69c-4803-b5e2-c52510daeae2",
    "quantity": 1,
    "created": "2020-09-23T07:18:15.876Z"
}
*/

/*
{
    "message": "null value in column \"data\" violates not-null constraint",
    "length": 250,
    "name": "QueryFailedError",
    "severity": "ERROR",
    "code": "23502",
    "detail": "Failing row contains (a3cbf37a-c389-4b11-99dd-16dd2e4a51e1, null, 1, 2020-09-23 10:15:35.766464+03, 1).",
    "schema": "public",
    "table": "order_rows",
    "column": "data",
    "file": "execMain.c",
    "line": "1960",
    "routine": "ExecConstraints",
    "query": "INSERT INTO \"order_rows\"(\"id\", \"data\", \"quantity\", \"created\", \"tab_id\") VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, $1) RETURNING \"id\", \"quantity\", \"created\"",
    "parameters": [
        1
    ]
}
*/
