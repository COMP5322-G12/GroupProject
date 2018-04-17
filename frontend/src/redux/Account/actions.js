import axios from 'helpers/Axios';
import localStorage from 'helpers/LocalStorage';
import Base64 from 'helpers/Base64';

import * as actions from './types';

const clearUser = () => async (dispatch) => {
  dispatch({ type: actions.UNAUTH_USER });
  const token = localStorage.get('token');
  if (token) {
    localStorage.remove('token');
    window.location.reload(); //eslint-disable-line
  }
};

const getMe = () => async (dispatch) => {
  try {
    const response = await axios.get(axios.getRootUrl('Member'), axios.mergeLoginConfig({}));
    if (response) {
      const { data } = response;
      const me = {
        ...data,
        image: null,
        ImageName: '',
      };
      dispatch({ type: actions.AUTH_USER, data: me });
    } else {
      clearUser()(dispatch);
    }
  } catch (e) {
    console.error(e);
    // clearUser()(dispatch);
  }
};

const initAuth = () => async (dispatch) => {
  const token = localStorage.get('token');
  if (token) {
    getMe()(dispatch);
  } else {
    clearUser()(dispatch);
  }
};

const login = loginForm => dispatch => new Promise(async (resolve, reject) => {
  try {
    const response = await axios.post(axios.getRootUrl('Login'), {
      ...loginForm,
      username: loginForm.email,
    });
    const { data } = response;
    console.log(data);
    if (data.AuthKey !== '') {
      localStorage.set('token', data.AuthKey);
      getMe()(dispatch);
    } else {
      console.log(123);
      clearUser()(dispatch);
      reject(new Error('User not found!'));
    }
  } catch (e) {
    reject(new Error('User not found!'));
  }
});

const changeProfilePic = changeProfileForm => async dispatch => new Promise(async () => {
  await axios.post(axios.getRootUrl('Member/UpdateImage'), changeProfileForm, axios.mergeLoginConfig({}));
  getMe()(dispatch);
});

const register = registerForm => async dispatch => new Promise(async (resolve, reject) => {
  const {
    image, ImagePath, ImageName, ...rest
  } = registerForm;
  const response = await axios.post(axios.getRootUrl('Member/Register'), rest);
  const { data } = response;
  if (data.AuthKey !== '') {
    localStorage.set('token', data.AuthKey);
    if (image) {
      const base64 = await Base64.encode(image);
      await changeProfilePic({
        ImageName,
        ImagePath: base64,
        IPAddress: '127.0.0.1',
      })(dispatch);
    }
    getMe()(dispatch);
    resolve(true);
  } else {
    clearUser()(dispatch);
    reject(new Error('Form Error!'));
  }
});

const changeProfile = changeProfileForm => async dispatch =>
  new Promise(async (resolve) => {
    const response = await axios.post(axios.getRootUrl('Member/Update'), changeProfileForm, axios.mergeLoginConfig({}));
    const { data } = response;
    dispatch({ type: actions.AUTH_USER, data });
    resolve(true);
  });

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actions.UNAUTH_USER });
    localStorage.remove('token');
    window.location.href = "/"; //eslint-disable-line
  } catch (e) {
    console.error(e);
  }
};


export default {
  initAuth,
  clearUser,
  getMe,
  login,
  register,
  logout,
  changeProfile,
  changeProfilePic,
};
