import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import InputSlider from '../InputSlider';
import InvestmentCalculator from './main';


ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <InvestmentCalculator />
    </StyledEngineProvider>
  </React.StrictMode>
);
