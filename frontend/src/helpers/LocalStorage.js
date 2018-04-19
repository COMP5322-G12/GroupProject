const getStorage = () => window.localStorage; // eslint-disable-line

export default {
  get: id => getStorage().getItem(id),
  set: (id, value) => getStorage().setItem(id, value),
  remove: id => getStorage().removeItem(id),
};
