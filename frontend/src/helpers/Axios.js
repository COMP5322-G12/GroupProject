import axios from 'axios';
import localStorage from 'helpers/LocalStorage';

import AccountActions from 'redux/Account/actions';
import LoadingActions from 'redux/Loading/actions';

import AppConfig from 'constants/AppConfig';

const defaultRequestConfig = {
};

export default {
  getRootUrl: url => (`${AppConfig.apiHost}${url}`),
  getOKResponse: response => ((response && response.status === 200) ? response.data : null),
  handleError: (e) => {
    console.error(e);
    if (e.response && e.response.status === 403) {
      AccountActions.clearUser();
    }
  },
  mergeLoginConfig: config => ({
    ...config,
    headers: {
      AuthKey: `${localStorage.get('token')}`,
    },
  }),
  get: async (url, config = {}) => {
    await LoadingActions.startLoading();
    const response = await axios.get(url, { ...defaultRequestConfig, ...config });
    await LoadingActions.stopLoading();
    return response;
  },
  post: async (url, data, config = {}) => {
    await LoadingActions.startLoading();
    const response = await axios.post(url, data, { ...defaultRequestConfig, ...config });
    await LoadingActions.stopLoading();
    return response;
  },
  delete: async (url, config = {}) => {
    await LoadingActions.startLoading();
    const response = await axios.delete(url, { ...defaultRequestConfig, ...config });
    await LoadingActions.stopLoading();
    return response;
  },
};
