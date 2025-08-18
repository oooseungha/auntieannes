import React from 'react'

// ------------------------ Router
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

// ------------------------ Pages
import Header from '../components/Header/Header'

// ------------------------ Styled-Components
import styled from 'styled-components';

const KioskGnb = styled.ul`
  height: 100px;
  display: flex;
  background-color: #005AD5;
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
      line-height: 100px;
    }
  }
`
const GnbMenu = styled(NavLink)`
  &.active span {
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
        <li><GnbMenu to='/sub/classic' active={path.includes('/sub/classic')}><span>클래식 프레즐</span></GnbMenu></li>
        <li><GnbMenu to='/sub/stick' active={path.includes('/sub/stick')}><span>스틱 프레즐</span></GnbMenu></li>
        <li><GnbMenu to='/sub/hotdog' active={path.includes('/sub/hotdog')}><span>핫도그</span></GnbMenu></li>
        <li><GnbMenu to='/sub/dip' active={path.includes('/sub/dip')}><span>딥</span></GnbMenu></li>
        <li><GnbMenu to='/sub/drink' active={path.includes('/sub/drink')}><span>음료</span></GnbMenu></li>
      </KioskGnb>

      <Outlet />
    </div>
  )
}
