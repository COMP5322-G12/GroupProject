import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18n } from 'react-i18nify';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'typeface-roboto';

import store from 'redux/store';
import translation from 'i18n';

import AppContainer from './AppContainer';

import './index.css';

const MUItheme = createMuiTheme({
  palette: {
    primary: {
      light: '#373737',
      main: '#111111',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#eeeeee',
      dark: '#bcbcbc',
      contrastText: '#000000',
    },
  },
});

// config i18n
I18n.setTranslations(translation);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={MUItheme}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.querySelector('#root'),// eslint-disable-line
);
// registerServiceWorker();
