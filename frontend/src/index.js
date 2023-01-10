import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider, theme} from 'antd';
import zh_CN from 'antd/locale/fr_FR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   <ConfigProvider locale={zh_CN} >
    <App />
   </ConfigProvider>
  // </React.StrictMode>
);


