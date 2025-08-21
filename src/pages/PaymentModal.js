import React from 'react'

// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn, BtnBox } from '../../components/StyledComponents';

export default function PaymentModal() {

  const PaymentModalWrap = styled.div `
    width: 1070px; height: 1770px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 150px; left: 0;
    z-index: 100;
  `
  

  return (
    <PaymentModalWrap>
      
    </PaymentModalWrap>
  )
}
