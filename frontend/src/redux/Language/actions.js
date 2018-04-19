import { I18n } from 'react-i18nify';
import localStorage from 'helpers/LocalStorage';
import * as actions from './types';


const changeLanguage = language => async (dispatch) => {
  dispatch({ type: actions.CHANGE_LANGUAGE, language });
  document.documentElement.lang = language; // eslint-disable-line
  localStorage.set('language', 'en');
  I18n.setLocale(language);
};

const initLanguage = () => async (dispatch) => {
  const language = localStorage.get('language');
  if (!language) {
    localStorage.set('language', 'en');
  }
  changeLanguage(language)(dispatch);
};

export default {
  changeLanguage,
  initLanguage,
};
