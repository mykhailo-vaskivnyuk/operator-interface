import { App, IApp } from './app.class';

class AppTest extends App implements IApp {
  __changeTheme() {
    let { themeName } = this._config;
    switch (themeName) {
      case 'default':
        themeName = 'silpo';
        break;
      case 'silpo':
        themeName = 'fora';
        break;
      default:
        themeName = 'default';
    }
    this._config.themeName = themeName;
    this._onChange();
  }
}

let instance: AppTest;

function getInstance(): AppTest {
  if (!instance) {
    instance = new AppTest();
  }
  return instance;
}

export * from './app.class';

export const AppObject = { getInstance };
