// ------------------------ React
import React from 'react';

// ------------------------ Router
import { useParams } from 'react-router-dom';


// ------------------------ Redux & slice
import { useDispatch, useSelector } from 'react-redux'


// ------------------------ CSS
import SubModalStyle from './SubModal.module.css'

// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn } from '../../components/StyledComponents';

const SubModalWrap = styled.div`
  width: 1070px; height: 1770px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 150px; left: 0;
  z-index: 100;
  .sub_modal {
    width: 822px; height: 1420px;
    background-color: #eee;
    border-radius: 30px;
    margin: 150px auto 0 auto;
    padding-top: 30px;
    .modal_img {
      width: 400px;
      margin: 30px auto;
    }
    .modal_eng_title {
      font-size: 24px;
      font-family: "Fredoka", sans-serif;
      font-weight: 500;
      color: #FF9E18;
      text-align: center;
    }
    .modal_title {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      margin: 10px 0;
    }
    .modal_info {
      font-size: 20px;
      color: #666;
      text-align: center;
    }
  }
`

const ModalBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 610px;
  margin: 30px auto;
  span {
    font-size: 40px;
    font-weight: bold;
  }
`

const ModalOptionWrap = styled.div`
  width: 610px;
  margin: 0 auto;
  .modal_option_title {
    width: 610px;
    margin: 0 auto;
    font-size: 32px;
    color: #666;
    font-weight: 500;
    border-bottom: 1px solid #999;
    text-align: center;
    padding-bottom: 10px;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .modal_option_img {
      width: 90px;
      float: left;
    }
    .modal_option_name {
      width: 200px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`

const OptionBtnWrap = styled.div`
  width: 410px;
  margin: 50px auto 0 auto;
  display: flex;
  justify-content: center;

  button {
    width: 200px; height: 80px;
    border-radius: 50px;
    border: 1px solid #999;
    background-color: #eee;
    font-size: 32px;
    font-weight: bold;
    color: #666;
    letter-spacing: -1px;
  }
  .prev_btn {
    margin-right: 10px;
  }
  .select_btn {
    background-color: #10059F;
    color: white;
  }

`

const ModalOptionBtn = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  button {
    width: 40px; height: 40px;
    background-size: contain;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`
const ModalOptionPrice = styled.li`
  width: 90px;
  font-size: 20px;
  text-align: center;
`

export default function SubModal({product, onClose}) {
  return (
    <SubModalWrap>
      <div className='sub_modal'>
        <div>
          <div className='modal_img'>
            <img src={product.image} alt={product.title} />
          </div>
          <div><p className='modal_eng_title'>{product.eng_title}</p></div>
          <div><p className='modal_title'>{product.title}</p></div>
          <div><p className='modal_info'>{product.info}</p></div>
        </div>

        <ModalBtnBox>
          <MinusBtn />
          <span>1</span>
          <PlusBtn />
          <span>0000원</span>
        </ModalBtnBox>

        <ModalOptionWrap>
          <p className='modal_option_title'>딥소스 추가</p>
          <ul>
            <li className='modal_option_img'>
              <img src={process.env.PUBLIC_URL + '/images/modal_dip_01.png'} />
            </li>
            <li className='modal_option_name'>체다치즈 딥</li>
            <ModalOptionBtn>
              <MinusBtn />
              <span>1</span>
              <PlusBtn />
            </ModalOptionBtn>
            <ModalOptionPrice>0000원</ModalOptionPrice>
          </ul>
          <ul>
            <li className='modal_option_img'>
              <img src={process.env.PUBLIC_URL + '/images/modal_dip_02.png'} />
            </li>
            <li className='modal_option_name'>크림치즈 딥</li>
            <ModalOptionBtn>
              <MinusBtn />
              <span>1</span>
              <PlusBtn />
            </ModalOptionBtn>
            <ModalOptionPrice>0000원</ModalOptionPrice>
          </ul>
          <ul>
            <li className='modal_option_img'>
              <img src={process.env.PUBLIC_URL + '/images/modal_dip_03.png'} />
            </li>
            <li className='modal_option_name'>핫살사 치즈 딥</li>
            <ModalOptionBtn>
              <MinusBtn />
              <span>1</span>
              <PlusBtn />
            </ModalOptionBtn>
            <ModalOptionPrice>0000원</ModalOptionPrice>
          </ul>
        </ModalOptionWrap>

        <OptionBtnWrap>
          <button
            className='prev_btn'
            onClick={onClose}
          >이전으로</button>
          <button className='select_btn'>선택 완료</button>
        </OptionBtnWrap>

      </div>

    </SubModalWrap>
  )
}
