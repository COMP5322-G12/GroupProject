import { CHANGE_LANGUAGE } from './types.js';

const INITIAL_STATE = {
  language: 'en',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
};
