import localStorage from 'helpers/LocalStorage';

import * as actions from './types';
import * as toastActions from '../Toast/types';

const initCart = () => async (dispatch) => {
  const newCart = localStorage.get('shopping-cart');
  if (newCart) {
    dispatch({ type: actions.INIT_CART, newCart: JSON.parse(newCart) });
  } else {
    dispatch({ type: actions.INIT_CART });
  }
};

const addCart = (productID, add = 1) => async (dispatch) => {
  dispatch({ type: actions.ADD_CART, productID, add });
  dispatch({ type: actions.INIT_CART });
  dispatch({ type: toastActions.CREATE, data: 'Added one quality in the shopping cart' });
};

const subCart = (productID, sub = 1) => async (dispatch) => {
  dispatch({ type: actions.SUB_CART, productID, sub });
  dispatch({ type: actions.INIT_CART });
  dispatch({ type: toastActions.CREATE, data: 'Removed one quality in the shopping cart' });
};

const removeCart = productID => async (dispatch) => {
  dispatch({ type: actions.REMOVE_CART, productID });
  dispatch({ type: actions.INIT_CART });
  dispatch({ type: toastActions.CREATE, data: 'Removed item in the shopping cart' });
};

const reset = () =>  async (dispatch) => {
  dispatch({ type: actions.RESET_CART });
};

export default {
  initCart,
  addCart,
  subCart,
  removeCart,
  reset,
};
