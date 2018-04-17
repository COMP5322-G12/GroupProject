import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountReducer from './Account/reducer';
import LanguageReducer from './Language/reducer';
import LoadingReducer from './Loading/reducer';
import FontSizeReducer from './FontSize/reducer';
import ShoppingCartReducer from './ShoppingCart/reducer';
import ToastReducer from './Toast/reducer';

export default combineReducers({
  Form: formReducer,
  Language: LanguageReducer,
  FontSize: FontSizeReducer,
  Loading: LoadingReducer,
  Toast: ToastReducer,
  Account: AccountReducer,
  ShoppingCart: ShoppingCartReducer,
});
