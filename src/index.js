import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './Componenets/DataProvider/DataProvider';
import {initialState, reducer} from "./Utility/Reducer"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
    <App />
    </DataProvider>
    
  </React.StrictMode>
);


