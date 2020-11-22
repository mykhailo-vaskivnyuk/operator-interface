import { IItem, IItemData, ItemType, IItemAmount } from '../../assets/types/Item.types';
import { ItemData } from './items/itemData.class';
import { ItemAmount } from './items/itemAmount.class';
import { IWeightsTest } from '../weights/weightsTest.class';
import { Order, IOrder } from '../orders/order.class';
import { MessageCode } from '../../assets/data/messages.data';
import { State, Mode } from '../../assets/types/types';
import { IMessage } from '../message/message.class';
import { IObject } from '../../assets/types/objects.types';
import {
  createOrderRow,
  updateOrderRow,
  deleteOrderRow,
  getTabItems,
} from '../../assets/helpers/requests';
import { config } from '../../assets/data/config';
import { IServices } from '../services/Services';

export interface IOrderControl extends IObject<IStateOrder> {
  setOrder: (order: IOrder) => void;
  addItem: (item: IItem, quantity?: number, sum?: number) => void;
  delItem: (server?: boolean, item?: IItemAmount) => void;
  getItems: () => IItemAmount[];
  getItemsCount: () => number | 0;
  getTotal: () => number;
  selectItem: (index: number | null) => void;
  isSelected: () => boolean;
  getSelectedItem: () => IItemAmount | null;
  selectPieces: (pieces: number) => void;
  getState: () => State;
  bindReset: (callback?: () => void) => void;
  onItemsChange: (callback: () => void) => void;
}

export interface IStateOrder {
  itemType: ItemType | undefined;
  isSelected: boolean;
  total: number;
  orderItems: IItemAmount[];
  selectedItem: IItemAmount | null;
  orderMode: Mode;
}

export class OrderControl implements IOrderControl {
  private _weights?: IWeightsTest;

  private _message?: IMessage;

  private _selectedItem: IItemAmount | null = null;

  private _order: IOrder = new Order(0);

  private _state: State = State.READY;

  private _callbackOnChange?: () => void;

  private _callbackOnReset?: () => void;

  private _callbackOnItemsChange?: () => void;

  private _itemToAdd: IItemData | null = null;

  constructor(props: { services: IServices }) {
    this._onWeightsChange = this._onWeightsChange.bind(this);
    this.getStateObject = this.getStateObject.bind(this);
    this.delItem = this.delItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectPieces = this.selectPieces.bind(this);
    this.bindReset = this.bindReset.bind(this);
    const { services } = props;
    this._bindWeights(services.WeightsService);
    this._message = services.MessageService;
  }

  getStateObject(): IStateOrder {
    return {
      itemType: this._itemToAdd?.data.type,
      isSelected: this.isSelected(),
      total: this.getTotal(),
      orderItems: this.getItems(),
      selectedItem: this.getSelectedItem(),
      orderMode: this.getState() === State.PENDING ? Mode.MODAL : Mode.NORMAL,
    };
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  setOrder(order: IOrder): void {
    this._order = order;
    this._state = State.READY;
    if (config.serverOrders && !this._order.items.length) {
      const { orderNumber } = this._order;
      getTabItems(orderNumber)
        .then(({ tabNumber, tabItems }) => {
          this._order.items = tabItems.map((item: Omit<IItemData, 'tab'>) => {
            const itemData: IItemData = { ...item, tab: { id: tabNumber } };
            const sum = Math.round(item.data.price * item.quantity);
            this._setTotal(sum);
            return new ItemAmount(itemData, sum);
          });
          this.selectItem(null);
          this._onItemsChange();
          this._initOrder();
        })
        .catch(this._ErrorHandler);
      return;
    }

    this.selectItem(null);
    this._onItemsChange();
    this._initOrder();
  }

  private _bindWeights(weights?: IWeightsTest): void {
    if (this._weights === weights) return;
    if (this._weights?.off) {
      this._weights.off(this._onWeightsChange);
    }
    this._weights = weights;
    this._weights?.onChange(this._onWeightsChange);
  }

  private _initOrder() {
    if (this._order) this._weights?.setTara(this._order.tara);
  }

  addItem(item: IItem, quantity?: number, sum?: number): void {
    this._state = State.PENDING;
    if (quantity) {
      if (!this._itemToAdd) return;
      this._itemToAdd.quantity = quantity;
      const newItem: IItemAmount = new ItemAmount(this._itemToAdd, sum);
      if (config.serverOrders) {
        this._addItemAsync(newItem)
          .then((it) => {
            if (it) this._addItemStatic(it);
            else this._addItemStatic();
          })
          .catch(this._ErrorHandler);
      } else {
        this._addItemStatic(newItem);
      }
      return;
    }

    const id = `${item.id}-${this.getItemsCount()}`;
    this._itemToAdd = new ItemData(item, id, this._order.orderNumber);

    if (item.type === ItemType.WEIGHT) {
      this._weights?.setPrice(item.price, item.texts.full_title);
    } else {
      this._onChange();
    }
  }

  private _addItemStatic(item?: IItemAmount) {
    if (item?.item.tab.id !== this._order.orderNumber) return;
    if (item) {
      this._order.items.push(item);
      this._setTotal(item.sum);
      this._onReset();
    }
    if (!item || item.item.data.type === ItemType.PIECE) this._state = State.READY;
    this._itemToAdd = null;
    this._onChange();
    if (this.getItemsCount() <= 1) this._onItemsChange();
  }

  private _addItemAsync(newItem: IItemAmount): Promise<IItemAmount | void> {
    const item = newItem;
    const { quantity } = newItem.item; // заглушка
    return createOrderRow(this._order.orderNumber, item.item.data)
      .then((itemData: IItemData) => {
        item.item.data = itemData.data;
        return itemData;
      })
      .then((itemData) => updateOrderRow(itemData))
      .then((itemData) => {
        item.item = itemData;
        item.item.quantity = quantity; // заглушка
        return item;
      })
      .catch(() => {
        deleteOrderRow(newItem.item);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  private _ErrorHandler(e: Error): void {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  selectPieces(pieces: number): void {
    if (!this._itemToAdd) return;
    if (!pieces) {
      this._itemToAdd = null;
      this._state = State.READY;
      this._onChange();
      return;
    }
    const item = this._itemToAdd.data;
    const sum = Math.round(pieces * item.price * 100) / 100;
    this.addItem(item, pieces, sum);
  }

  delItem(server?: boolean, itemToDelete?: IItemAmount): void {
    if (this._selectedItem === null) return;
    if (this._state === State.PENDING) return;
    const item = itemToDelete || this._selectedItem;
    if (server !== false && config.serverOrders) {
      deleteOrderRow(item.item)
        .then(() => {
          this.delItem(false, item);
        })
        .catch(this._ErrorHandler);
      return;
    }

    if (item.item.tab.id !== this._order.orderNumber) return;
    const itemIndex = this._order.items.findIndex((i) => item.item.id === i.item.id);
    this._setTotal(-this._order.items[itemIndex].sum);
    this._order.items.splice(itemIndex, 1);
    this._state = State.READY;
    this.selectItem(null);
  }

  getItems(): IItemAmount[] {
    return this._order.items;
  }

  getItemsCount(): number {
    return this._order.items.length;
  }

  getTotal(): number {
    return this._order ? this._order.total : 0;
  }

  selectItem(index: number | null): void {
    if (this._state === State.PENDING) return;
    let item: IItemAmount | null = null;
    if (!(index === null)) item = this._order.items[index];
    if (this._selectedItem === item) this._selectedItem = null;
    else this._selectedItem = item;
    this._onChange();
  }

  isSelected(): boolean {
    return this._selectedItem !== null;
  }

  getSelectedItem(): IItemAmount | null {
    return this._selectedItem;
  }

  getState(): State {
    return this._state;
  }

  bindReset(callback?: () => void): void {
    this._callbackOnReset = callback;
  }

  onItemsChange(callback: () => void): void {
    this._callbackOnItemsChange = callback;
  }

  private _onWeightsChange() {
    if (!this._weights) return;

    if (this._state === State.PENDING && !this._itemToAdd) {
      if (this._weights && this._weights.getWeight() <= 0.01) {
        this._state = State.READY;
        this._weights.setPrice(null);
        this._onChange();
      }
      return;
    }

    if (this._itemToAdd) {
      if (!this._weights?.isStable()) {
        this._itemToAdd = null;
        this._state = State.READY;
        this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
        return;
      }

      if (this._weights.getWeight() <= 0.04) {
        this._itemToAdd = null;
        this._state = State.READY;
        this._throwMessage(MessageCode.WEIGHTS_IS_EMPTY);
        setTimeout(() => this._onWeightsChange(), 2000); // ?
        return;
      }

      this.addItem(this._itemToAdd.data, this._weights?.getWeight(), this._weights?.getSum());
    }

    this._order.tara = this._weights.getTara();

    if (!this._weights?.isStable()) {
      this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
      return;
    }

    if (this._weights.getWeight() <= 0.04) {
      this._throwMessage(MessageCode.WEIGHTS_IS_SMALL);
      return;
    }

    this._throwMessage(MessageCode.CLEAR_MESSAGE);
  }

  private _onItemsChange() {
    if (this._callbackOnItemsChange) this._callbackOnItemsChange();
  }

  private _onReset() {
    if (this._callbackOnReset) this._callbackOnReset();
  }

  private _throwMessage(code: MessageCode) {
    this._message?.sendMessage(code);
  }

  private _setTotal(value: number): void {
    this._order.total += value;
  }

  private _onChange() {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  off(): void {
    this._callbackOnChange = undefined;
    this._callbackOnReset = undefined;
    this._callbackOnItemsChange = undefined;
    this._bindWeights();
    this._message = undefined;
    this.bindReset();
  }
}

export const OrderControlClass = OrderControl;
