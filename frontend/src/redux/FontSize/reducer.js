import * as actions from './types';

const INITIAL_STATE = {
  fontSize: 100,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.CHANGE:
      return { ...state, fontSize: action.fontSize };
    default:
      return state;
  }
};
