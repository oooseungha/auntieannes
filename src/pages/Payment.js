import React from 'react'


// ------------------------ Redux & slice
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementByAmount as incrementOne, 
  decrementByAmount as decrementOne, 
  setCount as setOne
 } from '../redux/optionCountOneSlice';
import { addItem, deleteItem, addCount, subCount, clearCart } from '../redux/cartSlice';


// ------------------------ Router
import { NavLink } from 'react-router-dom';


// ------------------------ Pages & Components
import Header from '../components/Header/Header'

// ------------------------ 외부 라이브러리
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillWave,faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn, BtnBox } from '../components/StyledComponents';

const PaymentWrap = styled.div`
  width: 1070px; height: 1920px;
  .payment_title {
    color: #10059F;
    font-size: 48px;
    text-align: center;
    font-weight: bold;
    padding: 70px 0;
  }
`
const PaymentCart = styled.div`
  width: 1030px; height: 880px;
  margin: 0 10px 20px 10px;
  background-color: #eee;
  border-radius: 30px;

  .cart_sort {
    display: flex;
    height: 95px;
    align-items: center;
    border-bottom: 1px solid #666;
    justify-content: space-between;
    li {
      font-size: 32px;
      text-align: center;
      font-weight: 500;
    }
    li:nth-child(1), li:nth-child(2) {width: 30%}
    li:nth-child(3), li:nth-child(4) {width: 20%}
  }

`

const CartList = styled.ul`
  display: flex;
  margin: 20px;
  height: 150px;
  .menu_name {
    width: 30%;
    padding-bottom: -10px;
    div {
      width: 94px; height: 94px;
      margin: 0 auto 10px auto;
    }
    p {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .payment_amount_box {
    width: 30%;
    display: flex;
    align-items: center;
  }
  .payment_price {
    width: 20%;
    text-align: center;
    font-size: 32px;
    line-height: 150px;
  }
  .payment_del_btn {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const CreditWrap = styled.div`
  width: 1070px; height: 680px;
  background-color: #005AD5;
  .payment_info {
    width: 490px;
    margin: 0 auto;
    padding: 100px 0;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        color: white;
        font-weight: bold;
        line-height: 70px;
      }
      .payment_total_account {
        font-size: 32px;
      }
      .payment_total_price {
        font-size: 48px;
      }
    }
  }
`

const CreditBtnWrap = styled.div`
  width: 1040px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  button {
    width: calc(1020px / 3); height: 270px;
    border-radius: 50px;
    background-color: #10059F;
    color: white;
    font-size: 36px;
    letter-spacing: -1px;
    font-family: "Noto Sans KR", sans-serif;
    border: none;
    font-weight: bold;
    .button_icon {
      font-size: 80px;
      margin-bottom: 20px;
    }
  }
  button:nth-child(1) {
    background-color: #eee;
    color: #666;
  }
`




export default function Payment() {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.count * item.price, 0);

  return (
    <PaymentWrap>
      <Header />
      <p className='payment_title'>주문 정보를 확인해 주세요.</p>
      <PaymentCart>
        <ul className='cart_sort'>
          <li>메뉴</li>
          <li>수량</li>
          <li>금액</li>
          <li></li>
        </ul>

        {
          cart.map((item) => {
            const proTotalPrice = item.count * item.price;
            return (
              <CartList key={item.id}>
                <li className='menu_name'>
                  <div><img src={item.image} /></div>
                  <p>{item.title}</p>
                </li>
                <li className='payment_amount_box'>
                  <BtnBox style={{width: '300px', justifyContent: 'space-between'}}>
                    <MinusBtn
                      disabled={item.count <= 1}
                      onClick = {() => dispatch(subCount(item.id))}
                    />
                    <span>{item.count}</span>
                    <PlusBtn
                      onClick = {() => dispatch(addCount(item.id))}
                    />
                  </BtnBox>
                </li>
                <li className='payment_price'>
                  <span>{proTotalPrice.toLocaleString()}원</span>
                </li>
                <li className='payment_del_btn'>
                  <DelBtn
                    onClick={() => dispatch(deleteItem(item.id))}
                  >삭제</DelBtn>
                </li>
              </CartList>
            )
          })
        }
      </PaymentCart>

      <CreditWrap>
        <div className='payment_info'>
          <ul>
            <li className='payment_total_account'>총 수량</li>
            <li className='payment_total_price'>{totalCount} 개</li>
          </ul>
          <ul>
            <li className='payment_total_account'>총 결제 금액</li>
            <li className='payment_total_price'>{totalPrice.toLocaleString()} 원</li>
          </ul>
        </div>

        <CreditBtnWrap>
          <NavLink to='/sub/classic'>
            <button>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='button_icon'
              />
              <br />
              <p>이전 화면</p>
            </button>
          </NavLink>
          <button>
            <FontAwesomeIcon
              icon={faCreditCard}
              className='button_icon'
            />
            <br />
            <p>카드 결제</p>
          </button>
          <button>
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className='button_icon'
            />
            <br />
            <p>현금 결제</p>
          </button>
        </CreditBtnWrap>
        
      </CreditWrap>


    </PaymentWrap>
  )
}
