import React from 'react'

// ------------------------ Router
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

// ------------------------ Pages & Components
import Header from '../components/Header/Header'
import SubFooter from '../components/SubFooter/SubFooter';

// ------------------------ Styled-Components
import styled from 'styled-components';

const KioskGnb = styled.ul`
  height: 100px;
  display: flex;
  background-color: #005AD5;
  margin-bottom: 60px;
  li {
    width: 20%;
    font-weight: 500;
    font-size: 28px;
  &.active {
    background-color: white;
  }
    span {
      display: block;
      letter-spacing: -1px;
      color: white;
      text-align: center;
      line-height: 90px;
      margin-top: 10px;
    }
  }
`
const GnbMenu = styled(NavLink)`
  &.active span {
    height: 90px;
    margin-top: 10px;
    background-color: white;
    color: #10059F;
    border-radius: 30px 30px 0 0;
  }
`


export default function Sub() {

  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <Header />
      <KioskGnb>
        <li><GnbMenu to='/sub/classic'><span>클래식 프레즐</span></GnbMenu></li>
        <li><GnbMenu to='/sub/stick'><span>스틱 프레즐</span></GnbMenu></li>
        <li><GnbMenu to='/sub/hotdog'><span>핫도그</span></GnbMenu></li>
        <li><GnbMenu to='/sub/dip'><span>딥</span></GnbMenu></li>
        <li><GnbMenu to='/sub/drink'><span>음료</span></GnbMenu></li>
      </KioskGnb>

      <Outlet />

      <SubFooter />
    </div>
  )
}
