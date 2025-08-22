import React from 'react'

// ------------------------ Router
import { Link, useNavigate } from 'react-router-dom';

// ------------------------ Redux
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';

// ------------------------ CSS
import HeaderStyle from './Header.module.css'



export default function Header() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toMain = () => {
    dispatch(clearCart());
    navigate('/');
  }

  return (
    <header className={HeaderStyle.header}>
      <Link to='/'>
        <button 
          className={HeaderStyle.home_btn}
          onClick={toMain}
        >
          처음으로
        </button>
      </Link>
      
      <Link to='/'>
        <div className={HeaderStyle.logo}>
          <img src={process.env.PUBLIC_URL + '/images/header_logo.png'} />
        </div>
      </Link>
    </header>
  )
}
