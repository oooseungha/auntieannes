import './App.css';
import { useState } from 'react';


// ------------------------ Router
import { Routes, Route, Navigate } from 'react-router-dom';


// ------------------------ Pages
import Main from './pages/Main';
import Sub from './pages/Sub';
import SubModal from './pages/SubPages/SubModal';
import SubClassic from './pages/SubPages/SubClassic';
import SubStick from './pages/SubPages/SubStick';
import SubHotdog from './pages/SubPages/SubHotdog';
import SubDip from './pages/SubPages/SubDip';
import SubDrink from './pages/SubPages/SubDrink';
import Payment from './pages/Payment';

// ------------------------ Data
import { products } from './pages/data/subData'

// ------------------------ Styled-Components
import styled from 'styled-components';
import { KioskWrap } from './components/StyledComponents';


function App() {

  return (
    <div className="App">
      <KioskWrap>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/sub/*' element={<Sub />}>
            <Route index element={<Navigate to='classic' replace />} />
            <Route path='classic' element={<SubClassic products={products} />} />
            <Route path='stick' element={<SubStick products={products} />} />
            <Route path='hotdog' element={<SubHotdog products={products} />} />
            <Route path='dip' element={<SubDip products={products} />} />
            <Route path='drink' element={<SubDrink products={products} />} />
          </Route>
          <Route path='payment' element={<Payment />} />
        </Routes>
      </KioskWrap>
    </div>
  );
}

export default App;
