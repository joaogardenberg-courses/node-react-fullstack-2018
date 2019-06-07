import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk   from 'redux-thunk';
import                   'materialize-css/dist/css/materialize.min.css';

import {
  createStore,
  applyMiddleware
} from 'redux';

import App                from './components/App';
import reducers           from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
