// @ts-nocheck
import { Route, Router, Routes } from 'react-router-dom';


import React from 'react';
import InvestmentCalculator from './main';
import Sip from './sip';

function App() {
  return (
    <div className="App">
       
 <Routes>
        <Route path='/' element={<Sip/>} />
        <Route path='/SWP' element={<p>hii</p>} />
        <Route path='/SIPplusSWP' element={<InvestmentCalculator/>} />
      </Routes>
      
    </div>
  );
}

export default App;