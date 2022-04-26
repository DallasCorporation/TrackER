import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Home';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
