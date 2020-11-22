import { ThemesNames } from '../themes/themes';

enum Hosts {
  LOCAL = 'http://localhost',
  PROXY = 'http://localhost',
  SERVER = 'http://10.13.16.80',
}

export interface IConfig {
  maxOrdersCount: number;
  themeName: ThemesNames;
  serverItems: boolean;
  serverOrders: boolean;
  hostItems: Hosts;
  hostOrders: Hosts;
}

export const config: IConfig = {
  maxOrdersCount: 6,
  themeName: 'silpo',
  serverItems: true,
  serverOrders: true,
  hostItems: Hosts.SERVER,
  hostOrders: Hosts.LOCAL,
};

export interface IEnvironment {
  displayWidth: number;
  displayHeight: number;
}
