import * as React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ReduxRoot from './ReduxRoot';

const rootEl = document.getElementById('root');

const ATSApp = require('./ReduxRoot').default;
ReactDOM.render(
    <ATSApp />,
    rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
