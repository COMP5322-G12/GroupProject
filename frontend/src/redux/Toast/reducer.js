import * as actions from './types';

const INITIAL_STATE = {
  toast: false,
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.CREATE:
      return { ...state, toast: true, message: action.data };

    case actions.RESET:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};
