import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { themes } from '../../assets/themes/themes';
import { styles } from './app.styles';
import { SetEnvironment } from './SetEnvironment';
import { AppObject, IApp, TAppState } from './appTest.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';
import { Main } from '../main/Main';
import { appControl } from '../../assets/helpers/app.control';
import '../../assets/helpers/i18n.init';

/* ---------------- Control ------------------------------= */

appControl.runAppControl();

/* ----------------------------------------------------------|
| SHIFT + T > переключення теми                              |
| SHIFT + Z > імітація стабільності вагів                    |
| SHIFT + M > імітація повідомлення                          |
| SHIFT 0-1 > задата фактичну вагу                           |
|------------------------------------------------------------|
| a-z, enter, backspace, space, 0-9: ввід в активний інпут   |
-------------------------------------------------------------*/

export type PropsApp = ComponentState<IApp>;

function AppComponent({ state }: PropsApp) {
  const { state: appState, setEnvironment, themeName, maxOrdersCount } = state.getStateObject();

  return appState === TAppState.INIT ? (
    <SetEnvironment setEnvironment={setEnvironment} />
  ) : (
    <ThemeProvider theme={themes[themeName]}>
      <Main maxOrdersCount={maxOrdersCount} />
    </ThemeProvider>
  );
}

const AppWithState = withState<IApp, PropsApp>(AppObject, AppComponent);

export const App = withStyles(styles)(AppWithState);
