import * as actions from './types';

const defaultUser = {
  FirstName: 'Guest',
};

const INITIAL_STATE = {
  authenticated: false,
  me: defaultUser,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.AUTH_USER:
      return { ...state, authenticated: true, me: action.data };
    case actions.UNAUTH_USER:
      return { ...state, authenticated: false, me: defaultUser };
    case actions.FETCH_ME:
      return { ...state, authenticated: true, me: action.data };
    default:
      return state;
  }
};
