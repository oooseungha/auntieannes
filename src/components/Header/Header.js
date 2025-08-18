import React from 'react'

// ------------------------ Router
import { Link } from 'react-router-dom';

// ------------------------ CSS
import HeaderStyle from './Header.module.css'



export default function Header() {
  return (
    <header className={HeaderStyle.header}>
      <Link to='/'>
        <button className={HeaderStyle.home_btn}>처음으로</button>
      </Link>
      
      <Link to='/'>
        <div className={HeaderStyle.logo}>
          <img src={process.env.PUBLIC_URL + '/images/header_logo.png'} />
        </div>
      </Link>
    </header>
  )
}
