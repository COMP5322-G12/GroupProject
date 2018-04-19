import localStorage from 'helpers/LocalStorage';
import * as actions from './types';

const changeFontSize = fontSize => async (dispatch) => {
  document.documentElement.style.fontSize = `${fontSize}%`; //eslint-disable-line
  dispatch({ type: actions.CHANGE, fontSize: parseInt(fontSize, 10) });
};

const initFontSize = () => async (dispatch) => {
  const fontSize = localStorage.get('fontSize');
  if (!fontSize) {
    localStorage.set('fontSize', 100);
  }
  changeFontSize(fontSize)(dispatch);
};

export default {
  initFontSize,
  changeFontSize,
};
