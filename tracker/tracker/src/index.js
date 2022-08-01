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
import "./test"

const handleLoadScript = () => {
  import('./test')
    .then(({ functionFromModule }) => {
      // Use functionFromModule 
    })
    .catch(err => {
      // Handle failure
    });
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={en_US}>
    <Provider store={store}>
      <App handleLoadScript={handleLoadScript} />
    </Provider>
  </ConfigProvider>
);
reportWebVitals();
