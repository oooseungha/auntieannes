// ------------------------ React
import React, { useState, useEffect } from 'react';

// ------------------------ Router
import { useNavigate } from 'react-router-dom';


// ------------------------ Redux
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';


// ------------------------ Styled-Components
import styled from 'styled-components';

const PaymentModalWrap = styled.div `
  width: 1070px; height: 1770px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 150px; left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .payment_modal {
    width: 822px; height: 700px;
    background-color: white;
    border-radius: 30px;
    .payment_alert {
      width: 600px;
      margin: 0 auto 140px auto;
      padding-top: 75px;
      text-align: center;
      .alert_title {
        font-size: 48px;
        margin-bottom: 130px;
      }
      div p {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      div p:nth-child(2) {
        font-size: 32px;
        color: #666;
        margin: 0;
      }
    }
  }
`
const PaymentBtn = styled.button`
    display: block;
    width: 615px; height: 105px;
    margin: 0 auto;
    font-size: 40px;
    letter-spacing: -1px;
    font-family: "Noto Sans KR", sans-serif;
    background-color: ${(props) => (props.$complete ? "#10059F" : "#eee")};
    color: ${(props) => (props.$complete ? "white" : "#1a1a1a")};
    border: 1px solid #ccc;
    border-radius: 50px;
  }
`

export default function PaymentModal({ payment, onClose }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!paymentComplete) return;

    const toMainTimer = setTimeout(() => {
      navigate('/');
      dispatch(clearCart());
    }, 5000);
    
    return () => clearTimeout(toMainTimer);
  }, [paymentComplete, navigate, dispatch])

  return (
    <PaymentModalWrap>
      <div className='payment_modal'>
        {
          paymentComplete ? (
            <div
              style={{
                fontSize: '48px',
                textAlign: 'center',
                margin: '238px 0'
              }}
            >결제가 완료되었습니다.</div>
          ) : (
          payment === "card" ? (
            <div className='payment_alert'>
              <p className='alert_title'>카드 결제</p>
              <div>
                <p>카드를 투입구에 넣어 주세요.</p>
                <p>결제가 완료될 때까지 카드를 빼지 마세요!</p>
              </div>
            </div>
          ) : (
            <div className='payment_alert'>
              <p className='alert_title'>현금 결제</p>
              <div>
                <p>현금을 투입구에 넣어 주세요.</p>
                <p>결제가 완료될 때까지 기다려 주세요!</p>
              </div>
            </div>
          )
        )}
        <PaymentBtn
          onClick={() => {
            if(paymentComplete) {
              navigate("/");
            } else {
              onClose();
            }
          }}
          style={{
            backgroundColor: paymentComplete ? "#10059F" : "#eee",
            color: paymentComplete ? "white" : "#1a1a1a"
          }}
        >
          {paymentComplete ? "처음으로" : "결제 취소"}
        </PaymentBtn>
      </div>
    </PaymentModalWrap>
  )
}
