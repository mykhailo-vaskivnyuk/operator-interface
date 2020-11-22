import { Order, IOrder, IOrders } from './order.class';
import { Printer } from './printer.class';
import { IObject } from '../../assets/types/objects.types';
import { postCreateTab, delTabByNumber, getAllTabs } from '../../assets/helpers/requests';
import { config } from '../../assets/data/config';
import { ITab } from '../../assets/types/Item.types';

export interface IOrdersControl extends IObject<IStateOrders> {
  canCreateOrder: () => boolean;
  createOrder: () => void;
  selectOrder: (orderNumber: number) => void;
  printOrder: () => void;
  deleteOrder: () => void;
  bindClose: (callback?: () => void) => void;
  getOrders: () => IOrders;
  onOrderItemsChange: () => void;
  printIsActive: boolean;
  closeIsActive: boolean;
}

export interface IStateOrders {
  currentOrder: IOrder;
  printIsActive: boolean;
  closeIsActive: boolean;
  ordersNumbers: number[];
  currentOrderNumber: number | null;
  canCreate: boolean;
  bindClose: (callback?: () => void) => void;
}

export class OrdersControl implements IOrdersControl {
  private _orders: IOrders = new Map();

  private _ordersFreeNums: boolean[];

  private _callbackOnChange?: () => void;

  printIsActive = false;

  closeIsActive = false;

  private _currentOrder!: IOrder;

  private _callbackOnClose?: () => void;

  private _maxOrdersCount: number;

  constructor(props: { maxOrdersCount: number }) {
    this._maxOrdersCount = props.maxOrdersCount;
    this.getStateObject = this.getStateObject.bind(this);
    this.bindClose = this.bindClose.bind(this);
    this.onOrderItemsChange = this.onOrderItemsChange.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.printOrder = this.printOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.selectOrder = this.selectOrder.bind(this);
    this._ordersFreeNums = Array(this._maxOrdersCount).fill(true);
    this._loadOrders();
  }

  private _loadOrders() {
    if (!config.serverOrders) return this.createOrder();

    return getAllTabs()
      .then((tabs: ITab[]) => {
        tabs.forEach((tab: ITab) => this._orders.set(tab.id, new Order(tab.id)));
      })
      .then(() => this._setCurrentOrder())
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }

  getStateObject(): IStateOrders {
    if (!this._currentOrder) return {} as IStateOrders;
    return {
      currentOrder: this._currentOrder,
      printIsActive: this.printIsActive,
      closeIsActive: this.closeIsActive,
      ordersNumbers: [...this.getOrders().keys()],
      currentOrderNumber: this._currentOrder.orderNumber,
      canCreate: this.canCreateOrder(),
      bindClose: this.bindClose,
    };
  }

  onChange(callback: () => void): void {
    this._callbackOnChange = callback;
  }

  canCreateOrder(): boolean {
    return this._orders.size < this._maxOrdersCount;
  }

  createOrder(): void {
    if (!config.serverOrders) {
      if (!this.canCreateOrder()) return;
      const orderNumber = this._ordersFreeNums.findIndex((item) => item) + 1;
      this._ordersFreeNums[orderNumber - 1] = false;

      const order: IOrder = new Order(orderNumber);
      this._orders.set(orderNumber, order);
      this._setCurrentOrder(orderNumber);
      return;
    }

    postCreateTab()
      .then((res: { id: ITab }) => {
        if (!res.id) throw new Error(JSON.stringify(res));
        const orderNumber = res.id.id;
        const order: IOrder = new Order(orderNumber);
        this._orders.set(orderNumber, order);
        this._setCurrentOrder(orderNumber);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }

  selectOrder(orderNumber: number): void {
    this._setCurrentOrder(orderNumber);
  }

  printOrder(): void {
    Printer.print(this._currentOrder);
    this._doClose();
  }

  deleteOrder(): void {
    if (config.serverOrders) {
      const { orderNumber } = this._currentOrder;
      delTabByNumber(orderNumber)
        .then(() => {
          this._orders.delete(orderNumber);
          this._setCurrentOrder();
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
      return;
    }

    const { orderNumber } = this._currentOrder;
    this._orders.delete(orderNumber);
    this._ordersFreeNums[orderNumber - 1] = true;
    this._setCurrentOrder();
  }

  bindClose(callback?: () => void): void {
    this._callbackOnClose = callback;
  }

  getOrders(): IOrders {
    return this._orders;
  }

  onOrderItemsChange(): void {
    const itemsCount = this._currentOrder.items.length;

    if (itemsCount === 1) {
      this.printIsActive = true;
      this.closeIsActive = true;
    }

    if (itemsCount === 0) {
      const ordersCount = this._orders.size;
      const { orderNumber } = this._currentOrder;
      if (ordersCount === 1 && orderNumber === 1) {
        this.closeIsActive = false;
      } else {
        this.closeIsActive = true;
      }
      this.printIsActive = false;
    }

    this._onChange();
  }

  private _doClose() {
    if (this._callbackOnClose) this._callbackOnClose();
  }

  private _onChange() {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  off(): void {
    this.bindClose();
    this._callbackOnChange = undefined;
  }

  private _setCurrentOrder(orderNumber?: number) {
    if (orderNumber) {
      const order = this._orders.get(orderNumber);
      if (order) {
        this._currentOrder = order;
        this._onChange();
      }
      return;
    }

    if (!this._orders.size) {
      this.createOrder();
      return;
    }

    const { value: firstOrderNumber } = this._orders.keys().next();
    this._setCurrentOrder(firstOrderNumber);
  }
}

export const OrdersControlClass = OrdersControl;
