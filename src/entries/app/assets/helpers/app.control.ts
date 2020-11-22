import { setTimeout, clearTimeout } from 'timers';
import { WeightsService } from '../../components/weights/weightsTest.class';
import { AppObject } from '../../components/app/appTest.class';
import { Keyboard } from '../../components/keyboard/keyboard.class';
import { MessageService } from '../../components/message/message.class';
import { MessageCode } from '../data/messages.data';
// import {
//     getAllItems, getItemById, getItemsBySearchIndex,
//     getAllTabs, postCreateTab, getTabItems, delTabByNumber,
//     createOrderRow, updateOrderRow, deleteOrderRow,
// } from './search.request';
// import { ItemType } from '../data.structure/Item';

// getAllItems().then(console.log).catch(console.log);
// getItemBySearchIndex('Печ').then(console.log).catch(console.log);
// getItemById('78').then(console.log).catch(console.log);

/*
const item = {
    "id": "734ae666-ad1c-2440-7d16-9d22debf1c99",
    "plu": 903,
    "searchIndex": "Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые",
    "price": 29.99,
    "type": ItemType.WEIGHT,
    "defaults": {
        "tara": 0,
        "pieces_per_package": 0
    },
    "lifetime": {
        "shelf_life_1": 0
    },
    "texts": {
        "article": 492273,
        "shop": "Сильпо Винница",
        "short_title": "ГрибиКгГливиЖовтi",
        "full_title": "Гриби Гливи жовті"
    }
};
*/

// getAllTabs()
//     .then(console.log)
//     .then(() => postCreateTab())
//     .then((r) => { console.log('NEW TAB', r); return r; })
//     .then(({ id }: { id: { id: string} }) => getTabByNumber(+id.id))
//     .then(({ tabNumber, tab }) => { console.log('NEW TAB CONTENT', tabNumber, tab); return tabNumber; })

//     .then(tabNumber => createOrderRow(tabNumber, item))
//     .then(data => { console.log('NEW ORDER ROW', data); return data; })
//     .then(data => updateOrderRow(data))
//     .then(data => { console.log('UPDATED ORDER ROW', data); return data; })
//     .then(data => deleteOrderRow(data))
//     .then(tabNumber => { console.log('DELETE ORDER ROW', tabNumber); return tabNumber; })

// .then(tabNumber => delTabByNumber(+tabNumber))
// .then(({ result, tabNumber }) => { console.log('DELETE TAB', tabNumber, result); return true; })
// .then(() => getAllTabs())
// .then(console.log)
// .catch(console.log);

export function runAppControl(): void {
  const app = AppObject.getInstance();
  const keyboard = Keyboard.getInstance();
  const weights = WeightsService.getInstance();
  const message = MessageService.getInstance();

  let weight = '';
  let timer: NodeJS.Timeout;

  window.addEventListener('keydown', (event) => {
    // console.log('PRESS:', event.code, event.key);

    if (!event.shiftKey) {
      keyboard.onClick(event.key.toUpperCase());
      return;
    }

    if (event.shiftKey && event.code.match(/Digit/)) {
      weight += event.code.split('Digit')[1];
      weights.__setWeight(+weight / 1000);
      clearTimeout(timer);
      timer = setTimeout(() => {
        weights.__setWeight(+weight / 1000);
        weight = '';
      }, 500);
      return;
    }

    if (event.shiftKey && event.code === 'KeyT' && app.__changeTheme) app.__changeTheme();
    if (event.shiftKey && event.code === 'KeyZ') {
      weights.__setStable();
      return;
    }
    if (event.shiftKey && event.code === 'KeyM') {
      message.sendMessage(MessageCode.TEST_RIK_CONTROL);
      // setTimeout(() => message.sendMessage(MessageCode.CLEAR_MESSAGE), 4000);
    }
  });
}

export const appControl = { runAppControl };
