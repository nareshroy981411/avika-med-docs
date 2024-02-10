import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "antd/dist/reset.css";
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <ConfigProvider theme={{
         token:{
          colorPrimary: "#063B59"
         } 
        }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);