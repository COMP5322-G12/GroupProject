import * as actions from './types';

const reset = () => async (dispatch) => {
  dispatch({ type: actions.RESET });
};

export default{
  reset,
};
