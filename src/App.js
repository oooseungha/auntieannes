import './App.css';


// ------------------------ Router
import { Routes, Route, Navigate } from 'react-router-dom';

// ------------------------ Pages
import Main from './pages/Main';
import Sub from './pages/Sub';
import SubClassic from './pages/SubPages/SubClassic';
import SubStick from './pages/SubPages/SubStick';
import SubHotdog from './pages/SubPages/SubHotdog';
import SubDip from './pages/SubPages/SubDip';
import SubDrink from './pages/SubPages/SubDrink';
import Payment from './pages/Payment';

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
            <Route path='classic' element={<SubClassic />} />
            <Route path='stick' element={<SubStick />} />
            <Route path='hotdog' element={<SubHotdog />} />
            <Route path='dip' element={<SubDip />} />
            <Route path='drink' element={<SubDrink />} />
          </Route>
          <Route path='payment' element={<Payment />} />
        </Routes>


      </KioskWrap>
    </div>
  );
}

export default App;
