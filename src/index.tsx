// @ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Sidebar from './sidebar';
import { HashRouter } from 'react-router-dom';
import App from './App';


ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <HashRouter>
      <Sidebar/>
   <App/>
      
      </HashRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
