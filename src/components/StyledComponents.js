import React from 'react'
import styled from 'styled-components';

// ------------------------ src_images
import plusBtn from '../images/plus_btn.png';
import minusBtn from '../images/minus_btn.png';
import minusBtnDisabled from '../images/minus_btn_disabled.png';


// ★★ 개발용 임시 사이즈 조정 (PC에 맞게)
export const KioskWrapper = styled.div`
  width: 100%; height: 150vh;
  display: flex;
  justify-content: center;
`;
export const KioskWrap = styled.div`
  width: 1070px; height: 1920px;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0;
  transform: scale(0.8);
  transform-origin: top center;
`

export const SubWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 20px;
  gap: 40px 10px;
  .sub_box {
    width: 100%; height: 340px;
    border-radius: 10px;
    background-color: #eee;
    
    p {
      text-align: center;
    }
    .sub_title {
      font-size: 20px;
    }
    .sub_price {
      font-size: 24px;
      font-weight: bold;
    }
  }
`

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 40px;
    font-weight: bold;
  }
`

export const PlusBtn = styled.button`
  width: 60px; height: 60px;
  background-image: url(${plusBtn});
  border: none;
`

export const MinusBtn = styled.button`
  width: 60px; height: 60px;
  background-image: ${({disabled}) => disabled ? `url(${minusBtnDisabled})` : `url(${minusBtn})`};
  border: none;
`

export const DelBtn = styled.button`
  width: 150px; height: 80px;
  background-color: #999;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 24px;
  letter-spacing: -1px;
  font-family: "Noto Sans KR", sans-serif;
`