import * as actions from './types';

const startLoading = () => async dispatch => dispatch({ type: actions.START_LOADING });
const stopLoading = () => async dispatch => dispatch({ type: actions.STOP_LOADING });

export default {
  startLoading,
  stopLoading,
};
