import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less'
import App from './App';
import { Provider } from 'react-redux'
import store from './store';
import "./assets/icon/iconfont.css"
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={en_US}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
reportWebVitals();
