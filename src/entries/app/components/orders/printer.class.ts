import { IOrder } from './order.class';

export const Printer = {
  print: (order: IOrder): void => {
    // eslint-disable-next-line no-console
    console.log(order);
  },
};
