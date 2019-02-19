import * as React from 'react';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import App from './App';
import { createBrowserHistory } from 'history';

const store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware))

class ReduxRoot extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default ReduxRoot;

