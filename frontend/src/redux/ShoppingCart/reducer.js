import localStorage from 'helpers/LocalStorage';

import * as actions from './types';

const INITIAL_STATE = {
  cart: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.INIT_CART: {
      const newCart = action.newCart ? action.newCart : state.cart;
      localStorage.set('shopping-cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case actions.ADD_CART: {
      const { productID, add } = action;
      let added = false;
      const newCart = state.cart.map((item) => {
        if (item.productID === productID) {
          added = true;
          item.total = item.total + add; //eslint-disable-line
        }
        return item;
      });
      if (!added) {
        newCart.push({ productID, total: add });
      }
      return { ...state, cart: newCart };
    }
    case actions.SUB_CART: {
      const { productID, sub } = action;
      const newCart = state.cart.map((item) => {
        if (item.productID === productID) {
          item.total = item.total - sub; //eslint-disable-line
        }
        return item;
      });
      return { ...state, cart: newCart };
    }
    case actions.REMOVE_CART: {
      const { productID } = action;
      const newCart = state.cart.filter(item => item.productID !== productID);
      return { ...state, cart: newCart };
    }
    case actions.RESET_CART: {
      localStorage.set('shopping-cart', JSON.stringify([]));
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
