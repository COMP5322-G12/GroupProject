import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers.js';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({});
  middlewares.push(logger);
}

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(...middlewares),
)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
