import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import StoreOfLogin from './store/store_login';

const storeOfLogin = new StoreOfLogin();

ReactDOM.render(
    <Provider storeOfLogin={storeOfLogin}>
        <App />
    </Provider>, 
    document.getElementById('base')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
