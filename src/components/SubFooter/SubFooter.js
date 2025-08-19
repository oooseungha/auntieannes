// ------------------------ React
import React, { useEffect } from 'react';


// ------------------------ Redux & slice
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, addCount, subCount, clearCart } from '../../redux/cartSlice';


// ------------------------ CSS
import SubFooterStyle from './SubFooter.module.css'


// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn } from '../StyledComponents';



export default function SubFooter() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const totalCount = state.cart.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.count, 0)

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch]);



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
          state.cart.map((item, i) => {
            return(
              <ul>
                <li>{state.cart[i].title}</li>
                <li>
                  <MinusBtn
                    disabled={state.cart[i].count <= 1}
                    onClick={() => {
                        if (state.cart[i].count > 1) {
                          dispatch(subCount(state.cart[i].id));
                        }
                      }}
                  />
                  <span>{state.cart[i].count}</span>
                  <PlusBtn
                    onClick={() => dispatch(addCount(state.cart[i].id))}
                  />
                </li>
                <li>{(state.cart[i].price * state.cart[i].count).toLocaleString()}원</li>
                <li>
                  <DelBtn
                    onClick={() => dispatch(deleteItem(state.cart[i].id))}
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
          <button className='cart_pay_btn'>결제</button>
        </div>
      </div>
    </div>
  )
}
