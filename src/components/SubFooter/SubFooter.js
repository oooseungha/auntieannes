// ------------------------ React
import React from 'react'


// ------------------------ Redux
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem, addCount, subCount } from '../../redux/cartSlice';


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



  return (
    <div className={SubFooterStyle.sub_footer_wrap}>
      <div className={SubFooterStyle.cart_box}>
        <ul>
          <li>메뉴</li>
          <li>수량</li>
          <li>금액</li>
        </ul>
      </div>

      <div className={SubFooterStyle.cart_list}>
        {/* ★★★★ 수량 */}
        
        <PlusBtn />
        <MinusBtn />
        <DelBtn>삭제</DelBtn>
      </div>

      <div className={SubFooterStyle.amount_box}>
        <div className={SubFooterStyle.amount}>
          <ul>
            <li>총 수량</li>
            <li>개</li>
          </ul>
          <ul>
            <li>총 결제 금액</li>
            <li>원</li>
          </ul>
        </div>
        <div className={SubFooterStyle.cart_btn_box}>
          <button className='cart_del_btn'>전체 삭제</button>
          <button className='cart_pay_btn'>결제</button>
        </div>
      </div>
    </div>
  )
}
