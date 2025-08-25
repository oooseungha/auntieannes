// ------------------------ React
import React from 'react';

// ------------------------ Router
import { useNavigate } from 'react-router-dom';

// ------------------------ Redux & slice
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, addCount, subCount, clearCart } from '../../redux/cartSlice';

// ------------------------ CSS
import SubFooterStyle from './SubFooter.module.css'


// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn } from '../StyledComponents';



export default function SubFooter() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalCount = cart.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0)

  const navigate = useNavigate();



  return (
    <div className={SubFooterStyle.sub_footer_wrap}>
      <div className={SubFooterStyle.cart_box}>
        <ul>
          <li>메뉴</li>
          <li>수량</li>
          <li>금액</li>
          <li></li>
        </ul>
      </div>

      <div className={SubFooterStyle.cart_list}>
        {
          cart.map((item,i) => {
            return(
              <ul key={item.id}>
                <li>{item.title}</li>
                <li>
                  <MinusBtn
                    disabled={item.count <= 1}
                    onClick={() => {
                        if (item.count > 1) {
                          dispatch(subCount(item.id));
                        }
                      }}
                  />
                  <span>{item.count}</span>
                  <PlusBtn
                    onClick={() => dispatch(addCount(item.id))}
                  />
                </li>
                <li>{(item.price * item.count).toLocaleString()}원</li>
                <li>
                  <DelBtn
                    onClick={() => dispatch(deleteItem(item.id))}
                  >삭제</DelBtn>
                </li>
              </ul>
            )
          })
        }
      </div>


      <div className={SubFooterStyle.amount_box}>
        <div className={SubFooterStyle.amount}>
          <ul>
            <li>총 수량</li>
            <li>{totalCount} 개</li>
          </ul>
          <ul>
            <li>총 결제 금액</li>
            <li>{totalPrice.toLocaleString()} 원</li>
          </ul>
        </div>
        <div className={SubFooterStyle.cart_btn_box}>
          <button
            className='cart_del_btn'
            onClick={() => dispatch(clearCart())}
          >
            전체 삭제
          </button>
          <button
            className={SubFooterStyle.cart_pay_btn}
            disabled={cart.length === 0}
            onClick={() => {
              if(cart.length > 0) {
                navigate('/payment');
              }
            }}
          >결제</button>
        </div>
      </div>
    </div>
  )
}
