// @ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Sidebar from './sidebar';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Sidebar/>
   <App/>
      
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
