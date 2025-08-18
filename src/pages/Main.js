import React from 'react'

// ------------------------ Router
import { Link, NavLink } from 'react-router-dom';


// ------------------------ 외부 라이브러리
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faBagShopping } from '@fortawesome/free-solid-svg-icons';

// ------------------------ Styled-Components
import styled from 'styled-components';

const MainWrap = styled.div`
  width: 1070px; height: 1920px;
  background-color: #005AD5;
  display: flex;
  align-items: center;
  justify-content: center;

  .main_box {
    width: 822px; height: 1420px;
    background-color: white;
    border-radius: 30px;

    .main_logo {
      width: 303px; height: 377px;
      margin: 318px auto 150px auto;
    }

    .main_btn_box {
      display: flex;
      justify-content: center;

      .store_button,
      .takeout_button {
        width: 302px;
        div {
          font-size: 90px;
          color: #005AD5;
          text-align: center;
          margin-bottom: 20px;
        }
        button {
          display: block;
          width: 302px; height: 107px;
          font-size: 30px;
          font-weight: 500;
          letter-spacing: -1px;
          color: #333;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 30px;
          box-shadow: 0 5px 5px #ccc;
        }
      }

      .store_button {
        margin-right: 10px;
      }
    }

  }
`

export default function Main() {
  return (
      <MainWrap>
        <div className='main_box'>
          <div className='main_logo'>
            <img src={process.env.PUBLIC_URL + '/images/main_logo.png'} alt='브랜드 로고' />
          </div>

          <div className='main_btn_box'>
            <Link to='sub'>
              <div className='store_button'>
                <div><FontAwesomeIcon icon={faStore} /></div>
                <button>매장에서 먹기</button>
              </div>
            </Link>
            
            <Link to='sub'>
              <div className='takeout_button'>
                <div><FontAwesomeIcon icon={faBagShopping} /></div>
                <button>포장해서 먹기</button>
              </div>
            </Link>
          </div>

        </div>
      </MainWrap>
  )
}
